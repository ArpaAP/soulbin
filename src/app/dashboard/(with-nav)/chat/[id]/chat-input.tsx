'use client';

import { useState, useRef } from 'react';

import { IconSend } from '@/icons';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    adjustHeight();
  };

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  return (
    <div className="px-g3 py-g4 fixed bottom-[64px] left-1/2 w-full max-w-[430px] -translate-x-1/2">
      <div className="rounded-br3 relative w-full bg-white shadow-[0px_4px_10px_0px_rgba(0,39,76,0.15)]">
        <div className="rounded-br3 border-white-500 px-g4 py-g2 relative flex w-full items-center gap-2.5 border-[1.5px] bg-white">
          <textarea
            id="chat-input"
            ref={textareaRef}
            value={message}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="여기에 상담하고 싶은 내용을 적어주세요"
            className="text-b2 text-black-100 placeholder:text-grey-300 max-h-[120px] w-full resize-none bg-transparent outline-none"
            disabled={disabled}
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!message.trim() || disabled}
            className={cn(
              'flex size-8 shrink-0 items-center justify-center rounded-full transition-colors',
              message.trim() ? 'bg-primary-green text-white' : 'bg-white-300 text-white'
            )}
          >
            <IconSend size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
