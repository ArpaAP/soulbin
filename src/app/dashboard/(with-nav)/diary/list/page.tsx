import { DiaryCard } from '@/components/diary-card';

import { getDiaries } from '@/actions/diary';

export default async function DiaryListPage() {
  const diaries = await getDiaries();

  return (
    <div className="py-g0 flex w-full flex-col items-center">
      {/* Diary List */}
      <div className="flex max-h-[614px] w-full flex-col gap-[10px] overflow-y-auto">
        {diaries.length === 0 ? (
          <div className="flex items-center justify-center py-10">
            <p className="text-grey-300">작성된 일기가 없습니다.</p>
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
