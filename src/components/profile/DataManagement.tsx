import { useRef } from 'react';

import TossFaceIcon from '@/components/TossFaceIcon';

interface DataManagementProps {
  onExport: () => void;
  onImport: (file: File) => void;
  onDelete: () => void;
}

export default function DataManagement({ onExport, onImport, onDelete }: DataManagementProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImport(file);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="gap-g4 p-g4 rounded-br3 relative box-border flex w-full shrink-0 flex-col content-stretch items-start overflow-clip bg-white">
      <p className="text-h6 relative shrink-0 font-semibold text-nowrap whitespace-pre text-black not-italic">
        데이터 관리
      </p>
      <div className="gap-g2 relative flex w-full shrink-0 flex-col content-stretch items-start">
        <div className="relative flex w-full shrink-0 flex-col content-stretch items-start gap-[8px]">
          <button
            onClick={onExport}
            className="gap-g4 p-g4 rounded-br3 border-gray-border bg-white-100 relative box-border flex w-full shrink-0 content-stretch items-center border transition-all hover:bg-[#f8f9fb] active:scale-[0.98]"
          >
            <TossFaceIcon emoji="📤" size={32} />
            <div className="gap-g1 relative flex shrink-0 flex-col content-stretch items-start justify-center text-nowrap not-italic">
              <div className="text-black-100 text-l1 relative flex shrink-0 flex-col justify-center font-medium">
                <p className="text-nowrap whitespace-pre">데이터 내보내기</p>
              </div>
              <div className="text-grey-300 text-c1 relative flex shrink-0 flex-col justify-center font-normal">
                <p className="text-nowrap whitespace-pre">백업 파일 저장</p>
              </div>
            </div>
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="gap-g4 p-g4 rounded-br3 border-gray-border bg-white-100 relative box-border flex w-full shrink-0 content-stretch items-center border transition-all hover:bg-[#f8f9fb] active:scale-[0.98]"
          >
            <TossFaceIcon emoji="📥" size={32} />
            <div className="gap-g1 relative flex shrink-0 flex-col content-stretch items-start justify-center text-nowrap not-italic">
              <div className="text-black-100 text-l1 relative flex shrink-0 flex-col justify-center font-medium">
                <p className="text-nowrap whitespace-pre">데이터 가져오기</p>
              </div>
              <div className="text-grey-300 text-c1 relative flex shrink-0 flex-col justify-center font-normal">
                <p className="text-nowrap whitespace-pre">백업 파일 복원</p>
              </div>
            </div>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <button
          onClick={onDelete}
          className="gap-g4 p-g4 rounded-br3 border-gray-border bg-white-100 relative box-border flex w-full shrink-0 content-stretch items-center border transition-all hover:bg-[#fff5f5] active:scale-[0.98]"
        >
          <TossFaceIcon emoji="🗑️" size={32} />
          <div className="gap-g1 relative flex shrink-0 flex-col content-stretch items-start justify-center text-nowrap not-italic">
            <div className="text-black-100 text-l1 relative flex shrink-0 flex-col justify-center font-medium">
              <p className="text-nowrap whitespace-pre">모든 데이터 삭제</p>
            </div>
            <div className="text-grey-300 text-c1 relative flex shrink-0 flex-col justify-center font-normal">
              <p className="text-nowrap whitespace-pre">되돌릴 수 없습니다</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
