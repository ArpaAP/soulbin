import TossFaceIcon from '@/components/TossFaceIcon';

type AIStyle = 'auto' | 'cold' | 'warm';

interface AIStyleSelectorProps {
  value: AIStyle;
  onChange: (style: AIStyle) => void;
}

export default function AIStyleSelector({ value, onChange }: AIStyleSelectorProps) {
  return (
    <div className="gap-g3 p-g4 rounded-br3 relative box-border flex w-full shrink-0 flex-col content-stretch items-start overflow-clip bg-white">
      <p className="text-h6 relative shrink-0 font-semibold text-nowrap whitespace-pre text-black not-italic">
        AI 답변 스타일
      </p>
      <div className="text-grey-300 text-b2 relative flex w-full shrink-0 flex-col justify-center font-normal">
        <p className="mb-0">상황에 따라서 직설적으로 대답하거나,</p>
        <p>공감하는 메시지를 말해드려요.</p>
      </div>
      <div className="relative flex w-full shrink-0 content-stretch items-start gap-[12px]">
        <button
          onClick={() => onChange('auto')}
          className={`gap-g2 p-g0 rounded-br3 relative box-border flex h-[100px] min-h-px min-w-px shrink-0 grow basis-0 flex-col content-stretch items-center justify-center overflow-clip transition-all active:scale-95 ${
            value === 'auto'
              ? 'border-primary-green bg-white-100 border-[1.5px]'
              : 'border-0 bg-[#f8f9fb]'
          }`}
        >
          <TossFaceIcon emoji="⚡" size={36} />
          <div className="text-l2 relative flex shrink-0 flex-col justify-center font-medium text-nowrap text-black not-italic">
            <p className="whitespace-pre">자동</p>
          </div>
        </button>
        <button
          onClick={() => onChange('cold')}
          className={`gap-g2 p-g0 rounded-br3 relative box-border flex h-[100px] min-h-px min-w-px shrink-0 grow basis-0 flex-col content-stretch items-center justify-center overflow-clip transition-all active:scale-95 ${
            value === 'cold'
              ? 'border-primary-green bg-white-100 border-[1.5px]'
              : 'border-0 bg-[#f8f9fb]'
          }`}
        >
          <TossFaceIcon emoji="🎯" size={36} />
          <div className="text-l2 relative flex shrink-0 flex-col justify-center font-medium text-nowrap text-black not-italic">
            <p className="whitespace-pre">차가운 스타일</p>
          </div>
        </button>
        <button
          onClick={() => onChange('warm')}
          className={`gap-g2 p-g0 rounded-br3 relative box-border flex h-[100px] min-h-px min-w-px shrink-0 grow basis-0 flex-col content-stretch items-center justify-center overflow-clip transition-all active:scale-95 ${
            value === 'warm'
              ? 'border-primary-green bg-white-100 border-[1.5px]'
              : 'border-0 bg-[#f8f9fb]'
          }`}
        >
          <TossFaceIcon emoji="🩹" size={36} />
          <div className="text-l2 relative flex shrink-0 flex-col justify-center font-medium text-nowrap text-black not-italic">
            <p className="whitespace-pre">따뜻한 스타일</p>
          </div>
        </button>
      </div>
    </div>
  );
}
