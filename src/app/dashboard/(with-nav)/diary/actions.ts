'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

export async function saveDiary(content: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error('Unauthorized');
  }

  await prisma.diary.create({
    data: {
      content,
      userId: session.user.id,
    },
  });

  revalidatePath('/dashboard/diary');
  revalidatePath('/dashboard/diary/list');
}
