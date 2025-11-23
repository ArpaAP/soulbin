'use server';

import { AIStyle } from '@/generated/prisma/enums';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

export async function getProfile() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error('인증되지 않은 사용자입니다.');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      nickname: true,
      phoneNumber: true,
      birthDate: true,
      job: true,
      aiStyle: true,
    },
  });

  if (!user) {
    throw new Error('사용자를 찾을 수 없습니다.');
  }

  return user;
}

export type UpdateProfileData = {
  name?: string;
  nickname?: string | null;
  phoneNumber?: string | null;
  birthDate?: string | Date | null;
  job?: string | null;
  aiStyle?: string;
};

export async function updateProfile(data: UpdateProfileData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error('인증되지 않은 사용자입니다.');
  }

  const { name, nickname, phoneNumber, birthDate, job, aiStyle } = data;

  // aiStyle enum 변환
  let aiStyleEnum: AIStyle = AIStyle.AUTO;
  if (aiStyle === 'auto' || aiStyle === 'AUTO') aiStyleEnum = AIStyle.AUTO;
  else if (aiStyle === 'cold' || aiStyle === 'COLD') aiStyleEnum = AIStyle.COLD;
  else if (aiStyle === 'warm' || aiStyle === 'WARM') aiStyleEnum = AIStyle.WARM;

  // 생년월일 유효성 검사
  let validBirthDate: Date | null = null;
  if (birthDate) {
    const date = new Date(birthDate);
    if (!isNaN(date.getTime())) {
      validBirthDate = date;
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name,
      nickname,
      phoneNumber,
      birthDate: validBirthDate,
      job,
      aiStyle: aiStyleEnum,
    },
    select: {
      id: true,
      name: true,
      email: true,
      nickname: true,
      phoneNumber: true,
      birthDate: true,
      job: true,
      aiStyle: true,
    },
  });

  revalidatePath('/dashboard/profile');
  return updatedUser;
}

export async function deleteProfileData() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error('인증되지 않은 사용자입니다.');
  }

  // 사용자의 모든 일기 삭제 (cascade delete가 설정되어 있지만 명시적으로 삭제)
  await prisma.diary.deleteMany({
    where: { userId: session.user.id },
  });

  // 프로필 정보 초기화
  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      nickname: null,
      phoneNumber: null,
      birthDate: null,
      job: null,
      aiStyle: AIStyle.AUTO,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  revalidatePath('/dashboard/profile');
  return {
    message: '모든 데이터가 삭제되었습니다.',
    user: updatedUser,
  };
}

export async function getProfileStats() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error('인증되지 않은 사용자입니다.');
  }

  // 사용자의 모든 일기 가져오기
  const diaries = await prisma.diary.findMany({
    where: { userId: session.user.id },
    select: {
      analysis: {
        select: {
          emotion: true,
        },
      },
    },
  });

  // 통계 계산
  const totalRecords = diaries.length;

  // mood 값이 있는 일기만 필터링
  const moodsWithValues = diaries
    .filter((diary) => diary.analysis?.emotion)
    .map((diary) => diary.analysis!.emotion);

  // 가장 많이 나타난 감정 찾기
  const moodCounts: Record<string, number> = {};
  moodsWithValues.forEach((mood) => {
    moodCounts[mood] = (moodCounts[mood] || 0) + 1;
  });

  const mostCommonEmotion =
    Object.keys(moodCounts).length > 0
      ? Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0][0]
      : '-';

  // 느낀 감정 종류 (고유 mood 개수)
  const emotionTypes = Object.keys(moodCounts).length;

  // 평균 감정 강도 (임시로 6.7로 설정, 추후 분석 시스템과 연동 필요)
  const averageIntensity = totalRecords > 0 ? 6.7 : 0;

  return {
    totalRecords,
    mostCommonEmotion,
    emotionTypes,
    averageIntensity,
  };
}

export async function getAllUserData() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error('인증되지 않은 사용자입니다.');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      nickname: true,
      phoneNumber: true,
      birthDate: true,
      job: true,
      aiStyle: true,
      diaries: {
        include: {
          analysis: true,
        },
      },
      chats: {
        include: {
          messages: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error('사용자를 찾을 수 없습니다.');
  }

  return user;
}

export async function restoreUserData(data: any) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error('인증되지 않은 사용자입니다.');
  }

  // 1. 프로필 복원
  if (data.profile) {
    const { name, nickname, phoneNumber, birthDate, job, aiStyle } = data.profile;

    let aiStyleEnum: AIStyle = AIStyle.AUTO;
    if (aiStyle === 'auto' || aiStyle === 'AUTO') aiStyleEnum = AIStyle.AUTO;
    else if (aiStyle === 'cold' || aiStyle === 'COLD') aiStyleEnum = AIStyle.COLD;
    else if (aiStyle === 'warm' || aiStyle === 'WARM') aiStyleEnum = AIStyle.WARM;

    let validBirthDate: Date | null = null;
    if (birthDate) {
      const date = new Date(birthDate);
      if (!isNaN(date.getTime())) {
        validBirthDate = date;
      }
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        nickname,
        phoneNumber,
        birthDate: validBirthDate,
        job,
        aiStyle: aiStyleEnum,
      },
    });
  }

  // 2. 다이어리 복원
  if (data.diaries && Array.isArray(data.diaries)) {
    for (const diary of data.diaries) {
      // 기존에 동일한 ID가 있으면 건너뛰거나 업데이트?
      // 여기서는 간단하게 생성하되, ID 충돌 방지를 위해 ID는 새로 생성하거나
      // 기존 ID를 유지하려면 createMany를 쓰거나 upsert를 써야 함.
      // 하지만 백업 데이터의 ID가 현재 DB와 충돌할 수 있으므로 (다른 유저의 데이터일 수도 있고)
      // 안전하게 내용을 기반으로 새로 생성하는 것이 좋음.
      // 단, created_at 등은 유지하고 싶을 것임.

      // 여기서는 "복원"의 의미가 "기존 데이터를 덮어쓰기" 보다는 "추가하기"에 가까울 수 있음.
      // 하지만 "백업 복원"이라면 기존 데이터를 지우고 다시 넣는게 맞을 수도 있음.
      // 사용자 경험상 "가져오기"는 병합(Merge)이 안전함.

      // 중복 방지: 내용과 작성일시가 같은 다이어리가 있는지 확인
      const existingDiary = await prisma.diary.findFirst({
        where: {
          userId: session.user.id,
          content: diary.content,
          createdAt: new Date(diary.createdAt),
        },
      });

      if (!existingDiary) {
        const newDiary = await prisma.diary.create({
          data: {
            userId: session.user.id,
            content: diary.content,
            createdAt: new Date(diary.createdAt),
            updatedAt: new Date(diary.updatedAt),
            analysisStatus: diary.analysisStatus,
          },
        });

        if (diary.analysis) {
          await prisma.diaryAnalysis.create({
            data: {
              diaryId: newDiary.id,
              emotion: diary.analysis.emotion,
              intensity: diary.analysis.intensity,
              tags: diary.analysis.tags,
              summary: diary.analysis.summary,
              advice: diary.analysis.advice,
              createdAt: new Date(diary.analysis.createdAt),
              updatedAt: new Date(diary.analysis.updatedAt),
            },
          });
        }
      }
    }
  }

  // 3. 채팅 복원
  if (data.chats && Array.isArray(data.chats)) {
    for (const chat of data.chats) {
      // 중복 방지: 생성일시가 같은 채팅이 있는지 확인 (제목은 없을 수도 있으므로)
      const existingChat = await prisma.chat.findFirst({
        where: {
          userId: session.user.id,
          createdAt: new Date(chat.createdAt),
        },
      });

      if (!existingChat) {
        const newChat = await prisma.chat.create({
          data: {
            userId: session.user.id,
            title: chat.title,
            createdAt: new Date(chat.createdAt),
            updatedAt: new Date(chat.updatedAt),
          },
        });

        if (chat.messages && Array.isArray(chat.messages)) {
          await prisma.message.createMany({
            data: chat.messages.map((msg: any) => ({
              chatId: newChat.id,
              role: msg.role,
              content: msg.content,
              createdAt: new Date(msg.createdAt),
            })),
          });
        }
      }
    }
  }

  revalidatePath('/dashboard/profile');
  return { success: true };
}
