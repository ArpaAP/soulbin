import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET: 사용 통계 조회
export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await req.headers,
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: '인증되지 않은 사용자입니다.' },
        { status: 401 }
      );
    }

    // 사용자의 모든 일기 가져오기
    const diaries = await prisma.diary.findMany({
      where: { userId: session.user.id },
      select: {
        mood: true,
      },
    });

    // 통계 계산
    const totalRecords = diaries.length;

    // mood 값이 있는 일기만 필터링
    const moodsWithValues = diaries
      .filter((diary) => diary.mood)
      .map((diary) => diary.mood as string);

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

    return NextResponse.json({
      totalRecords,
      mostCommonEmotion,
      averageIntensity,
      emotionTypes,
    });
  } catch (error) {
    console.error('사용 통계 조회 오류:', error);
    return NextResponse.json(
      { error: '사용 통계 조회에 실패했습니다.' },
      { status: 500 }
    );
  }
}
