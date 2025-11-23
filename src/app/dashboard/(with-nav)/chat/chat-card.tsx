'use client';

import { format } from 'date-fns';

import TossFaceIcon from '@/components/TossFaceIcon';

import { ko } from 'date-fns/locale';
import Link from 'next/link';

type ChatCardProps = {
  id: string;
  title: string | null;
  lastMessage: string | null;
  updatedAt: Date;
};

export function ChatCard({ id, title, lastMessage, updatedAt }: ChatCardProps) {
  const formattedDate = format(updatedAt, 'M월 d일 a h:mm', { locale: ko });

  return (
    <Link href={`/dashboard/chat/${id}`} className="block w-full">
      <div className="rounded-br3 p-g4 gap-g3 flex w-full items-center bg-white">
        {/* Avatar */}
        <div className="bg-bg flex size-12 shrink-0 items-center justify-center rounded-full">
          <TossFaceIcon emoji="💬" size={24} />
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center justify-between">
            <h3 className="text-b1 text-black-100 truncate font-medium">
              {title || '새로운 상담'}
            </h3>
            <span className="text-c2 text-grey-300 shrink-0">{formattedDate}</span>
          </div>
          <p className="text-b2 text-grey-300 truncate">{lastMessage || '대화를 시작해보세요'}</p>
        </div>
      </div>
    </Link>
  );
}
