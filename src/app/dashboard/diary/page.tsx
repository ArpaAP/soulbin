import { DiaryTabMenu } from '@/components/diary-tab-menu';
import { DiaryWriteForm } from '@/components/diary-write-form';

export default function DiaryPage() {
  return (
    <div className="gap-g2 px-g3 pt-g2 relative flex w-full flex-col items-start">
      {/* Header */}
      <div className="px-g2 relative flex h-14 w-full shrink-0 items-center">
        <p className="text-h5 font-semibold tracking-[-0.5px] text-black">일기</p>
      </div>

      <DiaryTabMenu />
      <DiaryWriteForm />
    </div>
  );
}
