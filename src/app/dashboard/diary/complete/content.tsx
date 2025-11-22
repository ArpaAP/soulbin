'use client';

import TossFaceIcon from '@/components/TossFaceIcon';

import { useRouter } from 'next/navigation';

interface DiaryCompletePageProps {
  userName: string;
}

export default function DiaryCompleteContent({ userName }: DiaryCompletePageProps) {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-1/2 z-50 h-full w-full max-w-[430px] -translate-x-1/2 overflow-hidden bg-white">
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
              {userName}님의 소중한 일기를 저장했어요
            </p>
          </div>
        </div>
      </div>

      <div className="gap-g2 p-g5 absolute bottom-[34px] left-1/2 box-border flex w-full max-w-[402px] -translate-x-1/2 items-center justify-center">
        <div className="relative flex h-[54px] min-h-px min-w-px shrink-0 grow basis-0 content-stretch items-start">
          <button
            onClick={() => router.push('/dashboard/diary/list')}
            className="rounded-br2 px-g5 py-g0 relative box-border flex h-full shrink-0 grow items-center justify-center gap-2.5 overflow-clip bg-gray-100"
          >
            <div className="relative flex shrink-0 flex-col justify-center">
              <p className="text-l1 text-center font-medium tracking-[-0.32px] text-nowrap whitespace-pre text-black">
                돌아가기
              </p>
            </div>
          </button>
        </div>
        <div
          className="rounded-br2 bg-primary-green px-g5 py-g0 relative box-border flex h-[54px] shrink-0 grow basis-0 cursor-pointer items-center justify-center gap-2.5 overflow-clip"
          onClick={() => router.push('/dashboard/diary/write')}
        >
          <div className="relative flex shrink-0 flex-col justify-center">
            <p className="text-l1 text-center font-medium tracking-[-0.32px] text-nowrap whitespace-pre text-white">
              다른 일기 쓰기
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
