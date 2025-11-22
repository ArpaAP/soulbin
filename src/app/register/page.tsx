import { RegistrationForm } from './registration-form';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  // 이미 등록된 사용자는 대시보드로
  if (user?.isRegistered) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <RegistrationForm />
    </div>
  );
}
