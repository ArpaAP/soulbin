'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function DiaryTabMenu() {
  const pathname = usePathname();
  const isWrite = pathname === '/dashboard/diary';
  const isList = pathname === '/dashboard/diary/list';

  return (
    <div className="rounded-br3 gap-g2 p-g1 box-border flex w-full shrink-0 items-start overflow-clip bg-white">
      <Link
        href="/dashboard/diary"
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
