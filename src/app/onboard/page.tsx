'use client';

import { useState } from 'react';

import { IconBox } from '@/components/ui/icon-box';

import mock1 from '@/assets/mock1.png';
import mock2 from '@/assets/mock2.png';
import mock3 from '@/assets/mock3.png';
import mock4 from '@/assets/mock4.png';

import { authClient } from '@/lib/auth-client';
import Image from 'next/image';

const SPLASH_DATA = [
  {
    title: '나만이 느낀 감정 저장',
    description: '마음속 무거움을 가볍게 만들어봐요',
    image: mock1,
  },
  {
    title: 'AI가 읽어주는 내 감정 상태',
    description: '당신의 감정을 빠르게 분석해드려요',
    image: mock2,
  },
  {
    title: '따뜻한 조언 한마디',
    description: '지금 사용자님이 필요한 한마디를 전달해요',
    image: mock3,
  },
  {
    title: '꾸준히 쌓이는 나의 감정 기록',
    description: '매일매일 느끼는 하루의 감정을 이곳에 저장해봐요',
    image: mock4,
  },
];

export default function OnBoardPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentData = SPLASH_DATA[currentIndex];
  const isLastSlide = currentIndex === SPLASH_DATA.length - 1;

  const handleNext = () => {
    if (!isLastSlide) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center overflow-hidden bg-white py-12">
      {/* Main Content */}
      <div className="gap-g6 px-g8 flex flex-1 flex-col items-center justify-center pb-[200px]">
        {/* Text Section */}
        <div className="gap-g3 flex h-[100px] shrink-0 flex-col items-center text-center">
          <h1 className="text-h3 leading-9 font-semibold tracking-[-0.0406rem] whitespace-pre-wrap text-black">
            {currentData.title}
          </h1>
          <p className="text-b1 leading-[1.5rem] font-normal tracking-[-0.025rem] whitespace-pre-wrap text-black">
            {currentData.description}
          </p>
        </div>

        {/* Phone Mockup Image */}
        <div className="relative flex w-full flex-1 items-center justify-center pt-8">
          <div className="flex aspect-450/920 max-h-full w-full max-w-[285px] overflow-hidden rounded-[40px]">
            <Image
              src={currentData.image}
              alt={currentData.title}
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-[280px] w-full bg-linear-to-b from-transparent via-white/60 to-white" />

      {/* Bottom Button Section - Fixed at bottom */}
      <div className="absolute right-0 bottom-0 left-0 z-10 flex w-full flex-col items-center">
        <div className="px-g8 pb-g8 flex w-full max-w-[402px] flex-col items-center gap-2.5">
          {/* Page Indicator Dots */}
          <div className="flex items-center gap-[8px]">
            {SPLASH_DATA.map((_, index) => (
              <div
                key={index}
                className={`size-1.5 shrink-0 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? 'bg-black' : 'bg-[#bebebe]'
                }`}
              />
            ))}
          </div>

          {/* Button */}
          {isLastSlide ? (
            <button
              className="group gap-g1 bg-primary-green px-g5 text-l1 relative flex h-[44px] w-full items-center justify-center overflow-hidden rounded-full leading-[1.25rem] font-medium tracking-[-0.02rem] text-white transition-all"
              onClick={() => {
                authClient.signIn.social({
                  provider: 'google',
                });
              }}
            >
              <IconBox className="size-[22px] shrink-0" />
              <span>Google로 시작하기</span>

              {/* Hover Effect */}
              <div className="pointer-events-none absolute inset-0 bg-white opacity-0 transition-opacity group-hover:opacity-10" />

              {/* Active/Click Effect */}
              <div className="pointer-events-none absolute inset-0 bg-black opacity-0 transition-opacity group-active:opacity-10" />
            </button>
          ) : (
            <button
              className="group px-g5 text-l1 relative flex h-[44px] w-full items-center justify-center overflow-hidden rounded-full bg-black leading-[1.25rem] font-medium tracking-[-0.02rem] text-white transition-all"
              onClick={handleNext}
            >
              <span>다음</span>

              {/* Hover Effect */}
              <div className="pointer-events-none absolute inset-0 bg-white opacity-0 transition-opacity group-hover:opacity-10" />

              {/* Active/Click Effect */}
              <div className="pointer-events-none absolute inset-0 bg-black opacity-0 transition-opacity group-active:opacity-10" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
