'use client';

import { useEffect, useState } from 'react';

import TossFaceIcon from '@/components/TossFaceIcon';

interface GreetingCardProps {
  userName: string;
}

export default function GreetingCard({ userName }: GreetingCardProps) {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDate(new Date());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!date) {
    return (
      <div className="bg-dashboard-nav-bg gap-g3 p-g4 rounded-br3 relative box-border flex min-h-[88px] w-full shrink-0 animate-pulse content-stretch items-center overflow-clip">
        <div className="size-[32px] rounded-full bg-gray-200" />
        <div className="gap-g0 p-g0 relative box-border flex w-full shrink-0 flex-col content-stretch items-start leading-0 not-italic">
          <div className="mb-1 h-[26px] w-1/2 rounded bg-gray-200" />
          <div className="h-[22px] w-1/3 rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  const dateString = date.toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  const getGreetingInfo = () => {
    const hour = date.getHours();
    if (hour < 6) return { emoji: '🌙', text: '늦은 밤이에요' };
    if (hour < 12) return { emoji: '🌅', text: '좋은 아침이에요' };
    if (hour < 18) return { emoji: '☀️', text: '좋은 오후에요' };
    if (hour < 22) return { emoji: '🌆', text: '좋은 저녁이에요' };
    return { emoji: '🌙', text: '늦은 밤이에요' };
  };

  const { emoji, text } = getGreetingInfo();

  return (
    <div className="bg-dashboard-nav-bg gap-g3 p-g4 rounded-br3 relative box-border flex w-full shrink-0 content-stretch items-center overflow-clip">
      <TossFaceIcon emoji={emoji} />
      <div className="gap-g0 p-g0 relative box-border flex shrink-0 flex-col content-stretch items-start leading-0 not-italic">
        <div className="text-black-100 relative flex w-full shrink-0 flex-col justify-center text-[18px] font-semibold tracking-[-0.45px]">
          <p className="leading-[26px]">
            {text}, {userName}님
          </p>
        </div>
        <div className="text-grey-300 relative flex w-full shrink-0 flex-col justify-center text-[14px] font-normal tracking-[-0.35px]">
          <p className="leading-[22px]">{dateString}</p>
        </div>
      </div>
    </div>
  );
}
