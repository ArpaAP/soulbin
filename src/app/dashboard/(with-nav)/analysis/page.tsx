import { format, subDays } from 'date-fns';

import TossFaceIcon from '@/components/TossFaceIcon';

import { AnalysisDashboard } from './analysis-dashboard';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AnalysisPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/');
  }

  const analyses = await prisma.diaryAnalysis.findMany({
    where: {
      diary: {
        userId: session.user.id,
      },
    },
    include: {
      diary: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const totalCount = analyses.length;

  if (totalCount < 3) {
    return (
      <div className="bg-background flex h-full w-full flex-col">
        {/* Header */}
        <div className="px-g5 pt-g4 flex h-14 w-full items-center justify-start">
          <h1 className="text-h5 text-black-200">분석</h1>
        </div>

        {/* Content */}
        <div className="px-g3 gap-g2 flex flex-col">
          <div className="rounded-br3 bg-white py-4">
            <div className="gap-g6 p-g8 flex flex-col items-center justify-center">
              <TossFaceIcon emoji="📊" size={72} />
              <div className="gap-g2 flex flex-col items-center text-center">
                <p className="text-h6 text-black-100">통계 데이터가 부족해요</p>
                <p className="text-b2 text-grey-300">최소 3개 이상의 감정 기록이 필요합니다</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const emotionCounts = analyses.reduce(
    (acc, curr) => {
      acc[curr.emotion] = (acc[curr.emotion] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const sortedEmotions = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1]);
  const mostFrequentEmotion = sortedEmotions[0] ? sortedEmotions[0][0] : '-';

  const totalIntensity = analyses.reduce((sum, curr) => sum + curr.intensity, 0);
  const averageIntensity = totalCount > 0 ? (totalIntensity / totalCount).toFixed(1) : '0.0';

  const emotionTypesCount = Object.keys(emotionCounts).length;

  // Chart Colors
  const CHART_COLORS = [
    '#62c762', // primary-green
    '#3b82f6', // blue
    '#f59e0b', // amber
    '#ef4444', // red
    '#8b5cf6', // violet
    '#ec4899', // pink
    '#14b8a6', // teal
    '#6366f1', // indigo
    '#06b6d4', // cyan
    '#84cc16', // lime
    '#f97316', // orange
  ];

  // Pie Data
  const pieData = sortedEmotions.map(([emotion, count], index) => ({
    emotion,
    count,
    fill: CHART_COLORS[index % CHART_COLORS.length],
  }));

  // Bar Data (Avg Intensity by Emotion)
  const intensityByEmotion = analyses.reduce(
    (acc, curr) => {
      if (!acc[curr.emotion]) acc[curr.emotion] = { sum: 0, count: 0 };
      acc[curr.emotion].sum += curr.intensity;
      acc[curr.emotion].count += 1;
      return acc;
    },
    {} as Record<string, { sum: number; count: number }>
  );

  const barData = Object.entries(intensityByEmotion).map(([emotion, { sum, count }]) => ({
    emotion,
    intensity: parseFloat((sum / count).toFixed(1)),
  }));

  // Line Data (Last 7 days)
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = subDays(today, 6 - i);
    return format(d, 'yyyy-MM-dd');
  });

  const lineData = last7Days.map((date) => {
    const dayAnalyses = analyses.filter((a) => format(a.createdAt, 'yyyy-MM-dd') === date);
    const dayAvg =
      dayAnalyses.length > 0
        ? dayAnalyses.reduce((sum, a) => sum + a.intensity, 0) / dayAnalyses.length
        : 0;
    return {
      date,
      intensity: parseFloat(dayAvg.toFixed(1)),
      count: dayAnalyses.length,
    };
  });

  // Emotion Details
  const emotionDetails = Object.entries(intensityByEmotion)
    .map(([emotion, { sum, count }]) => ({
      emotion,
      count,
      avgIntensity: (sum / count).toFixed(1),
      percentage: (count / totalCount) * 100,
    }))
    .sort((a, b) => b.count - a.count);

  const analysisData = {
    totalCount,
    mostFrequentEmotion,
    averageIntensity,
    emotionTypesCount,
    pieData,
    barData,
    lineData,
    emotionDetails,
  };

  return (
    <div className="bg-background flex h-full w-full flex-col">
      {/* Header */}
      <div className="px-g5 pt-g4 flex h-14 w-full items-center justify-start">
        <h1 className="text-h5 text-black-200">분석</h1>
      </div>

      <AnalysisDashboard data={analysisData} />
    </div>
  );
}
