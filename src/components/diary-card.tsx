'use client';

import { useState, useTransition } from 'react';

import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

import { deleteDiary } from '@/actions/diary';
import { ko } from 'date-fns/locale';

type DiaryCardProps = {
  id: string;
  content: string;
  analysisStatus: 'PENDING' | 'COMPLETED' | 'FAILED';
  analysis: {
    emotion: string;
    intensity: number;
    tags: string[];
    summary: string;
    advice: string | null;
  } | null;
  createdAt: Date;
};

export function DiaryCard({ id, content, analysisStatus, analysis, createdAt }: DiaryCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const formattedDate = format(createdAt, 'M월 d일 HH:mm', { locale: ko });

  const handleDelete = () => {
    startTransition(async () => {
      await deleteDiary(id);
      setIsDialogOpen(false);
    });
  };

  return (
    <>
      <div className="gap-g4 p-g4 rounded-br3 box-border flex w-full flex-col bg-white">
        {/* Header: Emotion Info + Date */}
        <div className="flex w-full items-center justify-between">
          <div className="gap-g2 flex items-center">
            {/* Emotion Chip */}
            {analysis?.emotion && (
              <div className="rounded-br2 box-border flex items-center justify-center gap-[10px] bg-[#7f8c8d] px-[10px] py-[6px]">
                <p className="text-l1 text-white">{analysis.emotion}</p>
              </div>
            )}
            {/* Strength - placeholder for now */}
            <div className="rounded-br1 box-border flex h-[26px] items-center justify-center gap-[10px] bg-[#edeff4] px-[6px] py-[4px]">
              <p className="text-c1 text-grey-300">강도: {analysis?.intensity ?? '-'} / 10</p>
            </div>
          </div>
          <p className="text-c1 text-grey-300">{formattedDate}</p>
        </div>

        {/* Diary Content */}
        <div className="w-full">
          <p className="text-b1 text-black">{content}</p>
        </div>

        {/* Tags */}
        {analysis?.tags.length ? (
          <div className="flex w-full flex-wrap gap-[6px]">
            {analysis.tags.map((tag, index) => (
              <div
                key={index}
                className="rounded-br2 box-border flex items-center justify-center bg-gray-50 px-[10px] py-[6px]"
              >
                <p className="text-c1 text-blue-500">#{tag}</p>
              </div>
            ))}
          </div>
        ) : null}

        {/* AI Analysis */}
        <div className="p-g4 rounded-br2 box-border flex w-full flex-col gap-[10px] bg-[#f8f9fb]">
          <div className="gap-g1 flex items-center">
            <span className="tossface text-[20px]">⚡</span>
            <p className="text-l2 text-black">AI 조언</p>
          </div>
          {analysisStatus === 'PENDING' && (
            <p className="text-b2 text-[#464646]">AI 분석 중입니다... 잠시 뒤에 확인해주세요.</p>
          )}
          {analysisStatus === 'FAILED' && (
            <p className="text-b2 text-[#464646]">AI 분석에 실패했습니다.</p>
          )}
          {analysisStatus === 'COMPLETED' && (
            <p className="text-b2 text-[#464646]">{analysis?.advice}</p>
          )}
        </div>

        {/* Delete Button */}
        <Button
          type="button"
          onClick={() => setIsDialogOpen(true)}
          className="border-destructive w-full border bg-white hover:bg-gray-50"
        >
          <p className="text-l1 text-error">삭제</p>
        </Button>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="p-g3 w-[350px] max-w-[350px] rounded-[12px]">
          {/* Title and Description */}
          <div className="gap-g2 py-g7 box-border flex flex-col items-center px-0 text-center">
            <DialogTitle className="text-h6 text-black-100">정말 삭제하시겠어요?</DialogTitle>
            <DialogDescription className="text-c1 text-[#4d4d4d]">
              다시 되돌릴 수 없으니 신중히 고민해주세요.
            </DialogDescription>
          </div>

          {/* Bottom Buttons */}
          <div className="gap-g2 flex w-full">
            <DialogClose asChild>
              <Button
                type="button"
                className="rounded-br2 px-g5 py-g0 h-[48px] flex-1 bg-[#edeff4] hover:bg-[#edeff4]/80"
              >
                <p className="text-l1 text-black-100">취소</p>
              </Button>
            </DialogClose>
            <Button
              type="button"
              onClick={handleDelete}
              disabled={isPending}
              className="rounded-br2 bg-error px-g5 py-g0 hover:bg-error/90 h-[48px] flex-1"
            >
              <p className="text-l1 text-white">{isPending ? '삭제 중...' : '삭제'}</p>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
