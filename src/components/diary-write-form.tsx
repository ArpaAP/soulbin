'use client';

import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Textarea } from '@/components/ui/textarea';

import { Button } from './ui/button';
import { saveDiary } from '@/actions/diary';
import { IconWrite } from '@/icons';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

type DiaryFormData = {
  content: string;
};

interface DiaryWriteFormProps {
  userName: string;
}

export function DiaryWriteForm({ userName }: DiaryWriteFormProps) {
  const router = useRouter();
  const minLength = 10;

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid, isSubmitting },
  } = useForm<DiaryFormData>({
    mode: 'onChange',
    defaultValues: {
      content: '',
    },
  });

  const content = watch('content');
  const currentLength = content ? content.length : 0;

  const onSubmit = async (data: DiaryFormData) => {
    try {
      await saveDiary(data.content);
      router.push('/dashboard/diary/complete');
    } catch (error) {
      console.error('Failed to save diary:', error);
      alert('일기 저장에 실패했습니다.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-br3 gap-g3 p-g4 box-border flex h-[595px] w-full shrink-0 flex-col items-start overflow-clip bg-white"
    >
      <div className="gap-g1 relative flex shrink-0 flex-col items-start text-nowrap whitespace-pre">
        <p className="text-h5 font-semibold tracking-[-0.5px] text-black">
          오늘의 감정을 기록해보세요
        </p>
        <p className="text-b2 text-gray-text tracking-[-0.35px]">
          AI가 {userName}님의 감정을 분석하고 맞춤형 조언을 제공해드려요.
        </p>
      </div>

      <div className="relative flex min-h-px w-full shrink-0 grow basis-0 content-stretch items-start">
        <Controller
          name="content"
          control={control}
          rules={{
            required: true,
            minLength: minLength,
          }}
          render={({ field: { value, onChange } }) => (
            <Textarea
              label=""
              value={value}
              onChange={onChange}
              placeholder={`지금 느끼는 감정이나 상황을 자유롭게 적어보세요...

예시:
- 오늘 회의에서 발표를 망쳐서 마음이 불편해요.
- 친구와 싸워서 기분이 안 좋고 불안해요.
- 일이 잘 풀려서 기분이 좋아요.`}
              className="h-full"
              textareaClassName="h-full resize-none text-b2"
            />
          )}
        />
      </div>

      <div className="relative flex w-full shrink-0 flex-col items-start gap-3">
        <div className="flex w-full justify-center">
          <p className="text-l2 tracking-[-0.28px] text-gray-500">
            {currentLength}글자 (최소 {minLength}자)
          </p>
        </div>
        <div className="relative flex h-[50px] w-full shrink-0 content-stretch items-start">
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={cn(
              'w-full',
              (!isValid || isSubmitting) && 'cursor-not-allowed bg-gray-400 text-white'
            )}
          >
            <IconWrite size={22} className="text-white" />
            <span className="text-l1 font-medium tracking-[-0.32px]">
              {isSubmitting ? '저장 중...' : '일기 저장'}
            </span>
          </Button>
        </div>
      </div>
    </form>
  );
}
