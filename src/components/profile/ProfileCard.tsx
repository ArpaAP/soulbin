import TossFaceIcon from '@/components/TossFaceIcon';

interface ProfileCardProps {
  name: string;
  job?: string;
  email: string;
  onLogout: () => void;
}

export default function ProfileCard({
  name,
  job,
  email,
  onLogout,
}: ProfileCardProps) {
  return (
    <div className="gap-g4 p-g4 rounded-br3 relative box-border flex w-full shrink-0 content-stretch items-center bg-white">
      <TossFaceIcon emoji="🌙" size={64} />
      <div className="relative flex min-h-px min-w-px shrink-0 grow basis-0 content-stretch items-center justify-between">
        <div className="relative flex shrink-0 flex-col content-stretch items-start justify-center gap-[0px] text-center text-nowrap whitespace-pre not-italic">
          <div className="gap-g2 relative flex shrink-0 content-stretch items-center">
            <div className="relative flex shrink-0 flex-col justify-center text-h6 font-semibold text-black">
              <p className="text-nowrap whitespace-pre">{name || '이름 없음'}</p>
            </div>
            {job && (
              <div className="text-grey-300 relative flex shrink-0 flex-col justify-center text-c1 font-normal">
                <p className="text-nowrap whitespace-pre">{job}</p>
              </div>
            )}
          </div>
          <div className="text-grey-300 relative flex shrink-0 flex-col justify-center text-c1 font-normal">
            <p className="text-nowrap whitespace-pre">{email || '이메일 없음'}</p>
          </div>
        </div>
        <div className="relative flex h-[30px] shrink-0 content-stretch items-start">
          <button
            onClick={onLogout}
            className="rounded-br2 px-g3 py-g0 relative box-border flex h-full shrink-0 content-stretch items-center justify-center gap-[10px] overflow-clip bg-[#daeaff] transition-all hover:opacity-90 active:scale-95"
          >
            <div className="relative flex shrink-0 flex-col justify-center text-l2 font-medium text-[#1e90ff] text-center text-nowrap not-italic">
              <p className="whitespace-pre">로그아웃</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
