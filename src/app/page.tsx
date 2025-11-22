import { IconBox } from '@/components/ui/icon-box';

import mockImg from '@/assets/mock.png';

import Image from 'next/image';

export default function OnBoard() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center overflow-hidden bg-white py-12">
      {/* Main Content */}
      <div className="gap-g6 px-g8 flex flex-1 flex-col items-center justify-center pb-[200px]">
        {/* Text Section */}
        <div className="gap-g3 flex flex-col items-center text-center">
          <h1 className="text-h3 leading-9 font-semibold tracking-[-0.0406rem] text-black">
            꾸준히 쌓이는 나의 감정 기록
          </h1>
          <p className="text-b1 leading-[1.5rem] font-normal tracking-[-0.025rem] text-black">
            매일매일 느끼는 하루의 감정을 이곳에 저장해봐요
          </p>
        </div>

        {/* Phone Mockup Image */}
        <div className="relative flex w-full max-w-[285px] flex-1 items-center justify-center">
          <div className="aspect-450/920 max-h-full w-full overflow-hidden rounded-[40px]">
            {/* TODO: Replace with actual image */}
            <Image src={mockImg} alt="감정 기록 앱 미리보기" className="size-full object-cover" />
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
            <div className="size-1.5 shrink-0 rounded-full bg-[#bebebe]" />
            <div className="size-1.5 shrink-0 rounded-full bg-[#bebebe]" />
            <div className="size-1.5 shrink-0 rounded-full bg-[#bebebe]" />
            <div className="size-1.5 shrink-0 rounded-full bg-black" />
          </div>

          {/* Google Sign In Button */}
          <button className="group gap-g1 bg-primary-green px-g5 text-l1 relative flex h-[54px] w-full items-center justify-center overflow-hidden rounded-full leading-[1.25rem] font-medium tracking-[-0.02rem] text-white transition-all">
            <IconBox className="size-[22px] shrink-0" />
            <span>Google로 시작하기</span>

            {/* Hover Effect */}
            <div className="pointer-events-none absolute inset-0 bg-white opacity-0 transition-opacity group-hover:opacity-10" />

            {/* Active/Click Effect */}
            <div className="pointer-events-none absolute inset-0 bg-black opacity-0 transition-opacity group-active:opacity-10" />
          </button>
        </div>
      </div>
    </div>
  );
}
