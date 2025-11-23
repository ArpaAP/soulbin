import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET: 프로필 조회
export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: '인증되지 않은 사용자입니다.' }, { status: 401 });
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
      return NextResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('프로필 조회 오류:', error);
    return NextResponse.json({ error: '프로필 조회에 실패했습니다.' }, { status: 500 });
  }
}

// PUT: 프로필 업데이트
export async function PUT(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: '인증되지 않은 사용자입니다.' }, { status: 401 });
    }

    const body = await req.json();
    const { name, nickname, phoneNumber, birthDate, job, aiStyle } = body;

    // aiStyle enum 변환
    let aiStyleEnum: 'AUTO' | 'COLD' | 'WARM' = 'AUTO';
    if (aiStyle === 'auto') aiStyleEnum = 'AUTO';
    else if (aiStyle === 'cold') aiStyleEnum = 'COLD';
    else if (aiStyle === 'warm') aiStyleEnum = 'WARM';

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        nickname,
        phoneNumber,
        birthDate: birthDate ? new Date(birthDate) : null,
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

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('프로필 업데이트 오류:', error);
    return NextResponse.json({ error: '프로필 업데이트에 실패했습니다.' }, { status: 500 });
  }
}

// DELETE: 프로필 데이터 삭제
export async function DELETE(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: '인증되지 않은 사용자입니다.' }, { status: 401 });
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
        aiStyle: 'AUTO',
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return NextResponse.json({
      message: '모든 데이터가 삭제되었습니다.',
      user: updatedUser,
    });
  } catch (error) {
    console.error('프로필 데이터 삭제 오류:', error);
    return NextResponse.json({ error: '프로필 데이터 삭제에 실패했습니다.' }, { status: 500 });
  }
}
