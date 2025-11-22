import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { nickname, phoneNumber, birthDate, job, aiStyle } = body;

    // 필수 필드 검증
    if (!nickname || !phoneNumber || !birthDate || !job || !aiStyle) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // aiStyle 검증
    if (!['AUTO', 'COLD', 'WARM'].includes(aiStyle)) {
      return NextResponse.json(
        { error: 'Invalid AI style' },
        { status: 400 }
      );
    }

    // 생년월일 파싱 (예: "2005. 06. 01" -> Date)
    const parsedBirthDate = parseBirthDate(birthDate);
    if (!parsedBirthDate) {
      return NextResponse.json(
        { error: 'Invalid birth date format' },
        { status: 400 }
      );
    }

    // 사용자 정보 업데이트
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        nickname,
        phoneNumber,
        birthDate: parsedBirthDate,
        job,
        aiStyle,
        isRegistered: true,
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        nickname: updatedUser.nickname,
        phoneNumber: updatedUser.phoneNumber,
        birthDate: updatedUser.birthDate,
        job: updatedUser.job,
        aiStyle: updatedUser.aiStyle,
        isRegistered: updatedUser.isRegistered,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function parseBirthDate(dateString: string): Date | null {
  try {
    // "2005. 06. 01" 형식 파싱
    const cleaned = dateString.replace(/\s/g, '');
    const parts = cleaned.split('.');

    if (parts.length !== 3) {
      // "YYYY-MM-DD" 형식도 시도
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return date;
      }
      return null;
    }

    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      return null;
    }

    const date = new Date(year, month - 1, day);

    // 유효한 날짜인지 확인
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return null;
    }

    return date;
  } catch {
    return null;
  }
}
