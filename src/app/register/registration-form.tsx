'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import TossFaceIcon from '@/components/TossFaceIcon';
import { Button } from '@/components/ui/button';
import { LinedInput } from '@/components/ui/lined-input';
import { LinedSelect, LinedSelectItem } from '@/components/ui/lined-select';

import { AIStyleSelection } from './ai-style-selection';
import { useRouter } from 'next/navigation';

type AIStyleType = 'AUTO' | 'COLD' | 'WARM' | null;

interface FormData {
  name: string;
  nickname: string;
  phoneNumber: string;
  birthDate: string;
  job: string;
}

const jobOptions = [
  { value: 'unemployed', label: '무직' },
  { value: 'student', label: '학생' },
  { value: 'homemaker', label: '가정주부' },
  { value: 'other', label: '기타' },
];

export function RegistrationForm() {
  const router = useRouter();
  const [section, setSection] = useState<'basic' | 'aiStyle'>('basic');
  const [step, setStep] = useState(0); // 0: intro, 1-5: field steps
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      nickname: '',
      phoneNumber: '',
      birthDate: '',
      job: '',
    },
    mode: 'onChange',
  });

  // Register fields with validation rules
  register('name', {
    required: '이름을 입력해주세요',
  });

  register('nickname', {
    required: '닉네임을 입력해주세요',
    minLength: {
      value: 2,
      message: '닉네임은 2자 이상이어야 합니다',
    },
  });

  register('phoneNumber', {
    required: '전화번호를 입력해주세요',
    pattern: {
      value: /^\d{3}-\d{4}-\d{4}$/,
      message: '올바른 형식으로 입력해주세요 (예: 010-1234-5678)',
    },
  });

  register('birthDate', {
    required: '생년월일을 입력해주세요',
    validate: (value) => {
      // YYYY. MM. DD 형식 검증
      const regex = /^\d{4}\.\s?\d{2}\.\s?\d{2}$/;
      if (!regex.test(value)) {
        return '올바른 형식으로 입력해주세요 (예: 2000. 01. 01)';
      }
      return true;
    },
  });

  register('job', {
    required: '직업을 선택해주세요',
  });

  // Watch all form values
  const formValues = watch();

  // 현재 단계에서 보여지는 필드들
  const visibleFields = step > 0 ? step : 0;

  const handleNext = async () => {
    // 첫 화면에서 다음으로
    if (step === 0) {
      setStep(1);
      return;
    }

    // 현재 입력된 필드 검증
    const isValid = await validateCurrentField();
    if (!isValid) {
      return;
    }

    // 마지막 필드까지 입력했으면 AI 스타일 선택 섹션으로
    if (step >= 5) {
      setSection('aiStyle');
    } else {
      setStep(step + 1);
    }
  };

  const handleAIStyleComplete = (aiStyle: AIStyleType) => {
    // AI 스타일까지 선택했으므로 제출
    handleFinalSubmit(aiStyle);
  };

  const validateCurrentField = async (): Promise<boolean> => {
    let isValid = true;

    switch (step) {
      case 1:
        isValid = await trigger('name');
        break;
      case 2:
        isValid = await trigger('nickname');
        break;
      case 3:
        isValid = await trigger('phoneNumber');
        break;
      case 4:
        isValid = await trigger('birthDate');
        break;
      case 5:
        isValid = await trigger('job');
        break;
    }

    return isValid;
  };

  const handleFinalSubmit = async (aiStyle: AIStyleType) => {
    if (!aiStyle) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: formValues.nickname,
          phoneNumber: formValues.phoneNumber,
          birthDate: formValues.birthDate,
          job: formValues.job,
          aiStyle,
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      // 성공 시 대시보드로 이동
      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      console.error('Registration error:', error);
      alert('등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNext();
    }
  };

  // AI 스타일 선택 섹션 표시
  if (section === 'aiStyle') {
    return <AIStyleSelection onComplete={handleAIStyleComplete} />;
  }

  // 기본 정보 입력 섹션
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <div className="px-g8 py-g6 gap-g3 mb-g4 flex flex-col">
        <div className="pb-g3">
          <TossFaceIcon emoji="📝" size={72} />
        </div>
        <div className="flex flex-col gap-0">
          <h1 className="text-h3">사용자님의</h1>
          <h1 className="text-h3">추가 정보가 필요해요</h1>
        </div>
        <p className="text-b1 text-[#797979]">원활한 사용을 위해 다음 정보들을 입력해주세요</p>
      </div>

      {/* Content */}
      <div className="px-g8 flex flex-1 flex-col">
        {step === 0 ? (
          /* Intro Screen */
          <div className="gap-g6 flex flex-col">
            <ul className="text-b2 list-disc space-y-0 pl-5">
              <li>이름</li>
              <li>닉네임</li>
              <li>전화번호</li>
              <li>생년월일</li>
              <li>직업 정보</li>
            </ul>
          </div>
        ) : (
          /* Form Fields */
          <div className="gap-g7 flex flex-col" onKeyDown={handleKeyDown}>
            {visibleFields >= 1 && (
              <LinedInput
                label="이름"
                value={formValues.name}
                onChange={(value) => {
                  setValue('name', value);
                  trigger('name');
                }}
                error={errors.name?.message}
                autoFocus={step === 1}
              />
            )}

            {visibleFields >= 2 && (
              <LinedInput
                label="닉네임"
                value={formValues.nickname}
                onChange={(value) => {
                  setValue('nickname', value);
                  trigger('nickname');
                }}
                error={errors.nickname?.message}
                autoFocus={step === 2}
              />
            )}

            {visibleFields >= 3 && (
              <LinedInput
                label="전화번호"
                value={formValues.phoneNumber}
                onChange={(value) => {
                  setValue('phoneNumber', value);
                  trigger('phoneNumber');
                }}
                error={errors.phoneNumber?.message}
                placeholder="010-1234-5678"
                autoFocus={step === 3}
              />
            )}

            {visibleFields >= 4 && (
              <LinedInput
                label="생년월일"
                value={formValues.birthDate}
                onChange={(value) => {
                  setValue('birthDate', value);
                  trigger('birthDate');
                }}
                error={errors.birthDate?.message}
                placeholder="YYYY. MM. DD"
                autoFocus={step === 4}
              />
            )}

            {visibleFields >= 5 && (
              <LinedSelect
                label="직업"
                value={formValues.job}
                onValueChange={(value) => {
                  setValue('job', value);
                  trigger('job');
                }}
                error={errors.job?.message}
              >
                {jobOptions.map((option) => (
                  <LinedSelectItem key={option.value} value={option.value}>
                    {option.label}
                  </LinedSelectItem>
                ))}
              </LinedSelect>
            )}
          </div>
        )}
      </div>

      {/* Bottom Button */}
      <div className="p-g5 mt-auto">
        <Button onClick={handleNext} disabled={isSubmitting} className="w-full" size="default">
          {step >= 5 ? '완료' : '다음'}
        </Button>
      </div>
    </div>
  );
}
