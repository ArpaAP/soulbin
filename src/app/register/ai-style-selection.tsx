'use client';

import { useState } from 'react';

import TossFaceIcon from '@/components/TossFaceIcon';
import { Button } from '@/components/ui/button';

type AIStyleType = 'AUTO' | 'COLD' | 'WARM' | null;

interface AIStyleSelectionProps {
  onComplete: (aiStyle: AIStyleType) => void;
  isSubmitting?: boolean;
}

const aiStyleOptions = [
  {
    value: 'AUTO' as const,
    label: '자동',
    icon: '⚡',
    description: '상황에 따라서 직설적으로 대답하거나, 공감하는 메시지를 말해드려요.',
  },
  {
    value: 'COLD' as const,
    label: '차가운 스타일',
    icon: '🎯',
    description: '어떤 상황에서도 직설적으로 대답해요. 가끔 따끔한 조언도 해줄 수 있어요.',
  },
  {
    value: 'WARM' as const,
    label: '따뜻한 스타일',
    icon: '🎀',
    description: '어떤 상황에서도 공감하고 위로해드려요. 항상 부드러운 조언을 해드려요.',
  },
];

export function AIStyleSelection({ onComplete, isSubmitting = false }: AIStyleSelectionProps) {
  const [selectedStyle, setSelectedStyle] = useState<AIStyleType | null>(null);

  const selectedOption = aiStyleOptions.find((opt) => opt.value === selectedStyle);

  const handleNext = () => {
    if (selectedStyle) {
      onComplete(selectedStyle);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <div className="px-g8 py-g8 gap-g3 flex flex-col">
        <div className="py-g4">
          <TossFaceIcon emoji="🎯" size={72} />
        </div>
        <div className="flex flex-col gap-0">
          <h1 className="text-h3">AI가 어떻게</h1>
          <h1 className="text-h3">도와드리면 좋을까요?</h1>
        </div>
        <p className="text-b1 text-grey-300">설정에서 언제든지 변경하실 수 있어요</p>
      </div>

      {/* Style Options */}
      <div className="px-g8 gap-g2 flex flex-col">
        <div className="gap-g2 flex flex-wrap">
          {/* Auto - Full Width */}
          <button
            onClick={() => setSelectedStyle('AUTO')}
            className={`rounded-br3 gap-g2 flex h-[100px] w-full flex-col items-center justify-center bg-[#f8f9fb] text-black transition-all hover:bg-[#eceef2] ${
              selectedStyle === 'AUTO'
                ? 'border-primary-green border'
                : selectedStyle
                  ? 'opacity-40'
                  : ''
            }`}
          >
            <TossFaceIcon emoji="⚡️" size={36} />
            <span className="text-l1 font-medium">자동</span>
          </button>

          {/* Cold & Warm - Side by Side */}
          <button
            onClick={() => setSelectedStyle('COLD')}
            className={`rounded-br3 gap-g2 flex h-[100px] flex-1 flex-col items-center justify-center bg-[#f8f9fb] text-black transition-all hover:bg-[#eceef2] ${
              selectedStyle === 'COLD'
                ? 'border-primary-green border'
                : selectedStyle
                  ? 'opacity-40'
                  : ''
            }`}
          >
            <TossFaceIcon emoji="🏹" size={36} />
            <span className="text-l1 font-medium">차가운 스타일</span>
          </button>

          <button
            onClick={() => setSelectedStyle('WARM')}
            className={`rounded-br3 gap-g2 flex h-[100px] flex-1 flex-col items-center justify-center bg-[#f8f9fb] text-black transition-all hover:bg-[#eceef2] ${
              selectedStyle === 'WARM'
                ? 'border-primary-green border'
                : selectedStyle
                  ? 'opacity-40'
                  : ''
            }`}
          >
            <TossFaceIcon emoji="🩹" size={36} />
            <span className="text-l1 font-medium">따뜻한 스타일</span>
          </button>
        </div>

        {/* Description */}
        <div className="py-g4 min-h-[76px]">
          {selectedOption ? (
            <p className="text-b2 text-grey-500 text-center break-keep">
              {selectedOption.description}
            </p>
          ) : (
            <p className="text-b2 text-grey-300 text-center">원하시는 스타일을 선택해주세요</p>
          )}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="p-g5 mt-auto">
        <Button
          onClick={handleNext}
          disabled={!selectedStyle || isSubmitting}
          className="w-full"
          size="default"
        >
          {isSubmitting ? '처리 중...' : '완료'}
        </Button>
      </div>
    </div>
  );
}
