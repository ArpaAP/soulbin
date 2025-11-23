'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function DiaryTabMenu() {
  const pathname = usePathname();
  const isWrite = pathname === '/dashboard/diary/write';
  const isList = pathname === '/dashboard/diary/list';

  return (
    <div className="rounded-br3 gap-g2 p-g1 box-border flex w-full shrink-0 items-start overflow-clip bg-white">
      <Link
        href="/dashboard/diary/write"
        className={cn(
          'gap-g3 rounded-br2 relative flex h-11 shrink-0 grow basis-0 content-stretch items-center justify-center',
          isWrite ? 'bg-primary-green' : 'bg-transparent'
        )}
      >
        <p
          className={cn(
            'text-l1 relative shrink-0 font-medium tracking-[-0.32px] text-nowrap whitespace-pre',
            isWrite ? 'text-white' : 'text-black opacity-30'
          )}
        >
          일기 쓰기
        </p>
      </Link>
      <Link
        href="/dashboard/diary/list"
        className={cn(
          'gap-g3 rounded-br3 relative flex h-11 shrink-0 grow basis-0 content-stretch items-center justify-center',
          isList ? 'bg-primary-green' : 'bg-transparent'
        )}
      >
        <p
          className={cn(
            'text-l1 relative shrink-0 font-medium tracking-[-0.32px] text-nowrap whitespace-pre',
            isList ? 'text-white' : 'text-black opacity-30'
          )}
        >
          일기 목록
        </p>
      </Link>
    </div>
  );
}

export default function DiaryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-g3 py-g2 relative flex w-full flex-col items-start">
      {/* Header */}
      <div className="px-g2 relative flex h-14 w-full shrink-0 items-center justify-start">
        <p className="text-h5 font-semibold tracking-[-0.5px] text-black">일기</p>
      </div>

      <div className="pb-g2 w-full">
        <DiaryTabMenu />
      </div>

      {children}
    </div>
  );
}
