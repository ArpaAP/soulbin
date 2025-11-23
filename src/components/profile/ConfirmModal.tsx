interface ConfirmModalProps {
  title: string;
  description: string;
  confirmText: string;
  cancelText?: string;
  confirmColor?: 'blue' | 'red';
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  title,
  description,
  confirmText,
  cancelText = '취소',
  confirmColor = 'blue',
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const confirmBgColor = confirmColor === 'blue' ? 'bg-[#1e90ff]' : 'bg-[#ff4130]';

  return (
    <div className="bg-[rgba(0,0,0,0.5)] fixed inset-0 z-50 flex content-stretch flex-col gap-[10px] items-center justify-center">
      <div className="bg-white box-border content-stretch flex flex-col gap-[10px] items-center p-g3 relative rounded-br3 shrink-0 w-[350px]">
        <div className="box-border content-stretch flex flex-col gap-g2 items-center leading-[0] px-0 py-g7 relative shrink-0 text-nowrap">
          <div className="flex flex-col font-semibold justify-center relative shrink-0 text-black text-h6 text-nowrap not-italic">
            <p className="whitespace-pre">{title}</p>
          </div>
          <div className="flex flex-col font-normal justify-center relative shrink-0 text-grey-300 text-c1 text-nowrap not-italic">
            <p className="whitespace-pre">{description}</p>
          </div>
        </div>
        <div className="content-stretch flex gap-g2 items-center justify-center relative shrink-0 w-full">
          <button
            onClick={onCancel}
            className="basis-0 box-border content-stretch flex gap-[10px] grow h-[48px] items-center justify-center min-h-px min-w-px overflow-clip px-g5 py-g0 relative rounded-br2 shrink-0 bg-[#edeef4] transition-all hover:bg-[#e0e1e6] active:scale-95"
          >
            <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-black text-l1 text-center text-nowrap not-italic">
              <p className="whitespace-pre">{cancelText}</p>
            </div>
          </button>
          <button
            onClick={onConfirm}
            className={`basis-0 box-border content-stretch flex gap-[10px] grow h-[48px] items-center justify-center min-h-px min-w-px overflow-clip px-g5 py-g0 relative rounded-br2 shrink-0 ${confirmBgColor} transition-all hover:opacity-90 active:scale-95`}
          >
            <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-white text-l1 text-center text-nowrap not-italic">
              <p className="whitespace-pre">{confirmText}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
