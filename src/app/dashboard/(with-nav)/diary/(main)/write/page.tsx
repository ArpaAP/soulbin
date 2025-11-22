import { DiaryWriteForm } from '@/components/diary-write-form';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DiaryWritePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/');
  }

  return <DiaryWriteForm userName={session.user.name} />;
}
