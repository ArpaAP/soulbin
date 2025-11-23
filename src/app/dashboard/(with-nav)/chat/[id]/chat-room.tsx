'use client';

import { useEffect, useRef, useState } from 'react';

import { ChatInput } from './chat-input';
import { MessageBubble } from './message-bubble';
import { saveMessage, generateAIResponse } from '@/actions/chat';
import { MessageRole } from '@/generated/prisma/enums';

interface Message {
  id: string;
  content: string;
  role: MessageRole;
  createdAt: Date;
}

interface ChatRoomProps {
  chatId: string;
  initialMessages: Message[];
}

export function ChatRoom({ chatId, initialMessages }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isPending, setIsPending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (isPending) return;

    // Optimistic update
    const optimisticMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'USER',
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, optimisticMessage]);
    setIsPending(true);

    try {
      // Save user message
      await saveMessage(chatId, content, 'USER');

      // Call AI API and get response
      const aiMessage = await generateAIResponse(chatId);

      if (aiMessage) {
        setMessages((prev) => [
          ...prev,
          {
            id: aiMessage.id,
            content: aiMessage.content,
            role: 'ASSISTANT',
            createdAt: aiMessage.createdAt,
          },
        ]);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      // Revert optimistic update on error
      setMessages((prev) => prev.filter((m) => m.id !== optimisticMessage.id));
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Messages Area */}
      <div className="px-g3 py-g5 flex-1 overflow-y-auto pb-12">
        <div className="gap-g6 flex flex-col">
          {/* Date Chip (Example) */}
          <div className="flex w-full justify-center">
            <div className="bg-white-400 px-g3 py-g2 rounded-full">
              <p className="text-b3 text-black">
                {new Date().toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* Welcome Message */}
          <MessageBubble
            content="안녕하세요! 저는 당신의 감정을 이해하고 도와드리는 AI 상담사입니다. 무엇이 힘드신가요? 편하게 이야기해주세요."
            role="ASSISTANT"
            createdAt={new Date()}
          />

          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              content={message.content}
              role={message.role}
              createdAt={message.createdAt}
            />
          ))}

          {isPending && (
            <div className="gap-g1 flex w-full justify-start">
              {/* Loading Bubble Placeholder */}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <ChatInput onSendMessage={handleSendMessage} disabled={isPending} />
    </div>
  );
}
