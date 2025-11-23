import { Button } from '@/components/ui/button';
import { OutlinedInput } from '@/components/ui/outlined-input';

interface ProfileFormData {
  name: string;
  nickname: string;
  phone: string;
  birthday: string;
  job: string;
}

interface ProfileFormProps {
  formData: ProfileFormData;
  onChange: (field: string, value: string) => void;
  onSave: () => void;
}

export default function ProfileForm({ formData, onChange, onSave }: ProfileFormProps) {
  return (
    <div className="gap-g6 p-g4 rounded-br3 relative box-border flex w-full shrink-0 flex-col content-stretch items-start overflow-clip bg-white">
      <p className="text-h6 relative shrink-0 font-semibold text-nowrap whitespace-pre text-black not-italic">
        내 정보
      </p>
      <div className="relative flex w-full shrink-0 flex-col gap-[24px]">
        <OutlinedInput
          label="이름"
          value={formData.name}
          onChange={(value) => onChange('name', value)}
        />
        <OutlinedInput
          label="닉네임"
          value={formData.nickname}
          onChange={(value) => onChange('nickname', value)}
        />
        <OutlinedInput
          label="전화번호"
          value={formData.phone}
          onChange={(value) => onChange('phone', value)}
        />
        <OutlinedInput
          label="생년월일"
          value={formData.birthday}
          onChange={(value) => onChange('birthday', value)}
        />
        <OutlinedInput
          label="직업"
          value={formData.job}
          onChange={(value) => onChange('job', value)}
        />
      </div>
      <div className="gap-g2 relative flex w-full shrink-0 content-stretch items-center justify-center">
        <Button
          variant="flat"
          onClick={onSave}
          className="text-l1 min-h-px min-w-px shrink-0 grow basis-0 text-white transition-all active:scale-95"
        >
          수정하기
        </Button>
      </div>
    </div>
  );
}
