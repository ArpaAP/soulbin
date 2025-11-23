'use client';

import { IconHome, IconChat, IconHeart, IconProfile, IconWrite } from '@/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isSelected?: boolean;
}

function NavButton({ href, icon, label, isSelected = false }: NavButtonProps) {
  return (
    <Link
      href={href}
      className="gap-g0 pb-g1 relative box-border flex w-[56px] shrink-0 flex-col content-stretch items-center justify-center px-0 pt-0"
    >
      <div className="relative flex size-[32px] shrink-0 items-center justify-center overflow-clip">
        <div
          className={isSelected ? 'text-dashboard-nav-selected' : 'text-dashboard-nav-unselected'}
        >
          {icon}
        </div>
      </div>
      <p
        className={`relative shrink-0 text-[11px] leading-[10px] font-medium tracking-[-0.25px] text-nowrap whitespace-pre not-italic ${
          isSelected ? 'text-dashboard-nav-selected' : 'text-dashboard-nav-unselected'
        }`}
      >
        {label}
      </p>
    </Link>
  );
}

export function DashboardNavigation() {
  const pathname = usePathname();

  return (
    <div className="bg-dashboard-nav-bg border-dashboard-nav-border rounded-tl-br5 rounded-tr-br5 fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] translate-x-[-50%] border-[1px_1px_0px] border-solid">
      <div className="relative box-border flex w-full content-stretch items-start gap-[10px] overflow-clip rounded-[inherit] pb-2">
        <nav className="px-g4 py-g0 relative box-border flex h-[56px] min-h-px min-w-px shrink-0 grow basis-0 content-stretch items-center justify-between overflow-clip">
          <NavButton
            href="/dashboard"
            icon={<IconHome size={24} />}
            label="홈"
            isSelected={pathname == '/dashboard'}
          />
          <NavButton
            href="/dashboard/diary/write"
            icon={<IconWrite size={24} />}
            label="일기"
            isSelected={pathname.startsWith('/dashboard/diary')}
          />
          <NavButton
            href="/dashboard/chat"
            icon={<IconChat size={24} />}
            label="상담"
            isSelected={pathname.startsWith('/dashboard/chat')}
          />
          <NavButton
            href="/dashboard/analysis"
            icon={<IconHeart size={24} />}
            label="분석"
            isSelected={pathname.startsWith('/dashboard/analysis')}
          />
          <NavButton
            href="/dashboard/profile"
            icon={<IconProfile size={24} />}
            label="내 프로필"
            isSelected={pathname.startsWith('/dashboard/profile')}
          />
        </nav>
      </div>
    </div>
  );
}
