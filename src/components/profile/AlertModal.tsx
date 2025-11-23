interface AlertModalProps {
  title: string;
  description: string;
  onClose: () => void;
}

export default function AlertModal({ title, description, onClose }: AlertModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col content-stretch items-center justify-center gap-[10px] bg-[rgba(0,0,0,0.5)]">
      <div className="p-g3 rounded-br3 relative box-border flex w-[350px] shrink-0 flex-col content-stretch items-center gap-[10px] bg-white">
        <div className="gap-g2 py-g7 relative box-border flex shrink-0 flex-col content-stretch items-center px-0 leading-[0] text-nowrap">
          <div className="text-h6 relative flex shrink-0 flex-col justify-center font-semibold text-nowrap text-black not-italic">
            <p className="whitespace-pre">{title}</p>
          </div>
          <div className="text-grey-300 text-c1 relative flex shrink-0 flex-col justify-center font-normal text-nowrap not-italic">
            <p className="whitespace-pre">{description}</p>
          </div>
        </div>
        <div className="gap-g2 relative flex w-full shrink-0 content-stretch items-center justify-center">
          <button
            onClick={onClose}
            className="px-g5 py-g0 rounded-br2 relative box-border flex h-[48px] min-h-px min-w-px shrink-0 grow basis-0 content-stretch items-center justify-center gap-[10px] overflow-clip bg-[#1e90ff] transition-all hover:opacity-90 active:scale-95"
          >
            <div className="text-l1 relative flex shrink-0 flex-col justify-center text-center leading-[0] font-medium text-nowrap text-white not-italic">
              <p className="whitespace-pre">닫기</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
