import TossFaceIcon from '@/components/TossFaceIcon';

interface UsageStatsData {
  totalRecords: number;
  mostCommonEmotion: string;
  averageIntensity: number;
  emotionTypes: number;
}

interface UsageStatsProps {
  stats: UsageStatsData;
}

export default function UsageStats({ stats }: UsageStatsProps) {
  return (
    <div className="gap-g4 p-g4 rounded-br3 relative box-border flex w-full shrink-0 flex-col content-stretch items-start overflow-clip bg-white">
      <p className="relative shrink-0 text-h6 font-semibold text-black text-nowrap whitespace-pre not-italic">
        사용 통계
      </p>
      <div className="gap-g2 relative flex w-full shrink-0 flex-col content-stretch items-start">
        <div className="gap-g2 relative flex w-full shrink-0 content-stretch items-start">
          <div className="gap-g4 p-g4 rounded-br3 relative box-border flex min-h-px min-w-px shrink-0 grow basis-0 content-stretch items-center border border-gray-border bg-white-100">
            <TossFaceIcon emoji="📔" size={32} />
            <div className="gap-g1 relative flex shrink-0 flex-col content-stretch items-start justify-center text-nowrap not-italic">
              <div className="text-grey-300 relative flex shrink-0 flex-col justify-center text-c1 font-normal">
                <p className="text-nowrap whitespace-pre">총 감정 기록 수</p>
              </div>
              <div className="text-black-100 relative flex shrink-0 flex-col justify-center text-h5 font-semibold">
                <p className="text-nowrap whitespace-pre">{stats.totalRecords}개</p>
              </div>
            </div>
          </div>
          <div className="gap-g4 p-g4 rounded-br3 relative box-border flex min-h-px min-w-px shrink-0 grow basis-0 content-stretch items-center border border-gray-border bg-white-100">
            <TossFaceIcon emoji="😄" size={32} />
            <div className="gap-g1 relative flex shrink-0 flex-col content-stretch items-start justify-center text-nowrap not-italic">
              <div className="text-grey-300 relative flex shrink-0 flex-col justify-center text-c1 font-normal">
                <p className="text-nowrap whitespace-pre">가장 많은 감정</p>
              </div>
              <div className="text-black-100 relative flex shrink-0 flex-col justify-center text-h5 font-semibold">
                <p className="text-nowrap whitespace-pre">{stats.mostCommonEmotion}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="gap-g2 relative flex w-full shrink-0 content-stretch items-start">
          <div className="gap-g4 p-g4 rounded-br3 relative box-border flex min-h-px min-w-px shrink-0 grow basis-0 content-stretch items-center border border-gray-border bg-white-100">
            <TossFaceIcon emoji="💪" size={32} />
            <div className="gap-g1 relative flex shrink-0 flex-col content-stretch items-start justify-center text-nowrap not-italic">
              <div className="text-grey-300 relative flex shrink-0 flex-col justify-center text-c1 font-normal">
                <p className="text-nowrap whitespace-pre">평균 감정 강도</p>
              </div>
              <div className="text-black-100 relative flex shrink-0 flex-col justify-center text-h5 font-semibold">
                <p className="text-nowrap whitespace-pre">{stats.averageIntensity} / 10</p>
              </div>
            </div>
          </div>
          <div className="gap-g4 p-g4 rounded-br3 relative box-border flex min-h-px min-w-px shrink-0 grow basis-0 content-stretch items-center border border-gray-border bg-white-100">
            <TossFaceIcon emoji="😊" size={32} />
            <div className="gap-g1 relative flex shrink-0 flex-col content-stretch items-start justify-center text-nowrap not-italic">
              <div className="text-grey-300 relative flex shrink-0 flex-col justify-center text-c1 font-normal">
                <p className="text-nowrap whitespace-pre">느낀 감정 종류</p>
              </div>
              <div className="text-black-100 relative flex shrink-0 flex-col justify-center text-h5 font-semibold">
                <p className="text-nowrap whitespace-pre">{stats.emotionTypes}개</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
