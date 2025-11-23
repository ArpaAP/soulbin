import TossFaceIcon from '@/components/TossFaceIcon';
import { DiaryCard } from '@/components/diary-card';

import { getDiaries } from '@/actions/diary';

export default async function DiaryListPage() {
  const diaries = await getDiaries();

  return (
    <div className="py-g0 flex w-full flex-col items-center">
      {/* Diary List */}
      <div className="flex max-h-[614px] w-full flex-col gap-[10px] overflow-y-auto">
        {diaries.length === 0 ? (
          <div className="gap-g4 flex flex-col items-center justify-center pt-24">
            <TossFaceIcon emoji="📝" size={72} />

            <p className="text-h6">아직 일기가 없어요</p>
            <p className="text-grey-300 text-b2">첫 번째 감정 일기를 작성해보세요</p>
          </div>
        ) : (
          diaries.map((diary) => (
            <DiaryCard
              key={diary.id}
              id={diary.id}
              content={diary.content}
              analysisStatus={diary.analysisStatus}
              analysis={diary.analysis}
              createdAt={diary.createdAt}
            />
          ))
        )}
      </div>
    </div>
  );
}
