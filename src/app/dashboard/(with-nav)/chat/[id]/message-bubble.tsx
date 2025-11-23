'use client';

import { format } from 'date-fns';

import logo from '@/assets/logo.png';

import { cn } from '@/lib/utils';
import { ko } from 'date-fns/locale';
import Image from 'next/image';

interface MessageBubbleProps {
  content: string;
  role: 'USER' | 'ASSISTANT' | 'SYSTEM';
  createdAt: Date;
}

export function MessageBubble({ content, role, createdAt }: MessageBubbleProps) {
  const isUser = role === 'USER';
  const formattedTime = format(createdAt, 'HH:mm', { locale: ko });

  if (role === 'SYSTEM') {
    return (
      <div className="py-g2 flex w-full justify-center">
        <div className="bg-white-400 px-g3 py-g2 rounded-full">
          <p className="text-b3 text-black">{content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('gap-g1 flex w-full', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
          <Image src={logo} alt="AI Avatar" width={28} height={28} />
        </div>
      )}

      <div
        className={cn(
          'gap-g1 flex max-w-[250px] items-end',
          isUser ? 'flex-row-reverse' : 'flex-row'
        )}
      >
        <div
          className={cn(
            'px-g3 py-g2 rounded-br3 relative',
            isUser ? 'bg-blue-500 text-white' : 'text-black-100 bg-white'
          )}
        >
          <p className="text-b2 wrap-break-word whitespace-pre-wrap">{content}</p>
        </div>
        <span className="text-c2 mb-0.5 shrink-0 text-gray-400">{formattedTime}</span>
      </div>
    </div>
  );
}
