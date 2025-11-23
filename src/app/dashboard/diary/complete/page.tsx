import TossFaceIcon from '@/components/TossFaceIcon';
import { Button } from '@/components/ui/button';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function DiaryCompletePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/');
  }

  return (
    <div className="bg-bg fixed top-0 left-1/2 z-50 h-full w-full max-w-[430px] -translate-x-1/2 overflow-hidden">
      <div className="gap-g6 p-g8 absolute top-1/2 left-1/2 box-border flex w-full max-w-[402px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
        <TossFaceIcon emoji="🎯" size={115} />
        <div className="gap-g3 relative flex w-full max-w-[338px] shrink-0 flex-col items-center justify-center text-center text-nowrap">
          <div className="relative flex shrink-0 flex-col justify-center">
            <p className="text-h3 font-semibold tracking-[-0.65px] whitespace-pre text-black">
              일기 저장 완료!
            </p>
          </div>
          <div className="relative flex shrink-0 flex-col justify-center">
            <p className="text-b1 text-gray-text tracking-[-0.4px] whitespace-pre">
              {session.user.name}님의 소중한 일기를 저장했어요
            </p>
          </div>
        </div>
      </div>

      <div className="gap-g2 p-g5 absolute bottom-[34px] left-1/2 box-border flex w-full max-w-[402px] -translate-x-1/2 items-center justify-center">
        <div className="gap-g2 flex w-full">
          <Link className="w-full" href="/dashboard">
            <Button variant="outline" className="w-full">
              돌아가기
            </Button>
          </Link>
          <Link className="w-full" href="/dashboard/diary/write">
            <Button className="w-full">다른 일기 쓰기</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
