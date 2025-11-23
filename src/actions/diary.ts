'use server';

import { processEmotionAction } from '@/actions/openai';
import { AIStyle } from '@/generated/prisma/enums';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { after } from 'next/server';

export async function saveDiary(content: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error('Unauthorized');
  }

  // 1. 일기 저장
  const diary = await prisma.diary.create({
    data: {
      content,
      userId: session.user.id,
      analysisStatus: 'PENDING',
    },
  });

  after(async () => {
    try {
      // 2. 사용자 AI 스타일 조회
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { aiStyle: true },
      });

      const aiStyle = user?.aiStyle || AIStyle.AUTO;

      // 3. 감정 분석 및 조언 생성
      const analysisResult = await processEmotionAction(content, aiStyle);

      // 4. 분석 결과 저장
      await prisma.diaryAnalysis.create({
        data: {
          diaryId: diary.id,
          emotion: analysisResult.emotion,
          intensity: analysisResult.intensity,
          tags: analysisResult.tags,
          summary: analysisResult.summary,
          advice: analysisResult.advice,
        },
      });

      // 5. 일기 상태 업데이트
      await prisma.diary.update({
        where: { id: diary.id },
        data: { analysisStatus: 'COMPLETED' },
      });
    } catch (error) {
      console.error('Diary analysis failed:', error);
      // 분석 실패해도 일기는 저장되었으므로 에러를 throw하지 않음
      // 추후 재시도 로직이나 실패 상태 표시 등을 고려할 수 있음
      await prisma.diary.update({
        where: { id: diary.id },
        data: { analysisStatus: 'FAILED' },
      });
    }
  });

  revalidatePath('/dashboard/diary');
  revalidatePath('/dashboard/diary/list');
}

export async function getDiaries() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return [];
  }

  const diaries = await prisma.diary.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true,
    },
  });

  return diaries;
}

export async function deleteDiary(diaryId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error('Unauthorized');
  }

  await prisma.diary.delete({
    where: {
      id: diaryId,
      userId: session.user.id,
    },
  });

  revalidatePath('/dashboard/diary');
  revalidatePath('/dashboard/diary/list');
}
