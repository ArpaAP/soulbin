'use client';

import { useTransition } from 'react';

import { Button } from '@/components/ui/button';

import { createChat } from '@/actions/chat';
import { useRouter } from 'next/navigation';

export function CreateChatButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleCreateChat = () => {
    startTransition(async () => {
      try {
        const chat = await createChat();
        router.push(`/dashboard/chat/${chat.id}`);
      } catch (error) {
        console.error('Failed to create chat:', error);
        // TODO: Show error toast
      }
    });
  };

  return (
    <Button
      variant="flat"
      className="w-full shadow-[0px_4px_10px_0px_rgba(0,39,76,0.15)]"
      onClick={handleCreateChat}
      disabled={isPending}
    >
      {isPending ? '상담 생성 중...' : '새로운 상담'}
    </Button>
  );
}
