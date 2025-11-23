'use client';

import * as React from 'react';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from 'recharts';

import TossFaceIcon from '@/components/TossFaceIcon';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface AnalysisData {
  totalCount: number;
  mostFrequentEmotion: string;
  averageIntensity: string;
  emotionTypesCount: number;
  pieData: { emotion: string; count: number; fill: string }[];
  barData: { emotion: string; intensity: number }[];
  lineData: { date: string; intensity: number; count: number }[];
  emotionDetails: { emotion: string; count: number; avgIntensity: string; percentage: number }[];
}

const chartConfig = {
  intensity: {
    label: '강도',
    color: 'var(--chart-1)',
  },
  count: {
    label: '횟수',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

export function AnalysisDashboard({ data }: { data: AnalysisData }) {
  const dynamicChartConfig = React.useMemo(() => {
    const config: ChartConfig = {
      ...chartConfig,
    };
    data.pieData.forEach((item) => {
      config[item.emotion] = {
        label: item.emotion,
        color: item.fill,
      };
    });
    return config;
  }, [data]);

  return (
    <div className="gap-g2 px-g3 py-g2 flex flex-col">
      {/* Summary Cards */}
      <div className="gap-g2 flex">
        <div className="gap-g4 rounded-br3 p-g4 flex flex-1 items-center bg-white">
          <TossFaceIcon emoji="📝" size={32} />
          <div className="gap-g1 flex flex-col">
            <p className="text-c1 text-grey-300">총 감정 기록 수</p>
            <p className="text-h5 text-black-100">{data.totalCount}개</p>
          </div>
        </div>
        <div className="gap-g4 rounded-br3 p-g4 flex flex-1 items-center bg-white">
          <TossFaceIcon emoji="😀" size={32} />
          <div className="gap-g1 flex flex-col">
            <p className="text-c1 text-grey-300">가장 많은 감정</p>
            <p className="text-h5 text-black-100">{data.mostFrequentEmotion}</p>
          </div>
        </div>
      </div>

      <div className="gap-g2 flex">
        <div className="gap-g4 rounded-br3 p-g4 flex flex-1 items-center bg-white">
          <TossFaceIcon emoji="💪" size={32} />
          <div className="gap-g1 flex flex-col">
            <p className="text-c1 text-grey-300">평균 감정 강도</p>
            <p className="text-h5 text-black-100">{data.averageIntensity} / 10</p>
          </div>
        </div>
        <div className="gap-g4 rounded-br3 p-g4 flex flex-1 items-center bg-white">
          <TossFaceIcon emoji="🤔" size={32} />
          <div className="gap-g1 flex flex-col">
            <p className="text-c1 text-grey-300">느낀 감정 종류</p>
            <p className="text-h5 text-black-100">{data.emotionTypesCount}개</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      {/* Emotion Distribution (Pie Chart) */}
      <div className="gap-g3 rounded-br3 p-g4 flex flex-col bg-white">
        <p className="text-h6 text-black">감정 종류 분포</p>
        <ChartContainer
          id="chart-pie"
          config={dynamicChartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square w-2/3 pb-0"
        >
          <PieChart margin={{ top: 24, right: 0, bottom: 24, left: 0 }}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={data.pieData}
              dataKey="count"
              nameKey="emotion"
              innerRadius={50}
              strokeWidth={5}
              animationDuration={500}
              label={({ name }) => name}
            >
              {data.pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {data.totalCount.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>

      {/* Avg Intensity by Emotion (Bar Chart) */}
      <div className="gap-g3 rounded-br3 p-g4 flex flex-col bg-white">
        <p className="text-h6 text-black">감정별 평균 강도</p>
        <ChartContainer id="chart-bar" config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={data.barData}>
            <CartesianGrid />
            <XAxis dataKey="emotion" tickLine={false} tickMargin={10} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} tickMargin={10} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar
              dataKey="intensity"
              fill="var(--color-primary-green)"
              radius={8}
              fillOpacity={0.7}
            />
          </BarChart>
        </ChartContainer>
      </div>

      {/* Recent 7 Days Intensity (Line Chart) */}
      <div className="gap-g3 rounded-br3 p-g4 flex flex-col bg-white">
        <p className="text-h6 text-black">최근 7일간 감정 강도 변화</p>
        <ChartContainer
          id="chart-line-intensity"
          config={chartConfig}
          className="min-h-[200px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={data.lineData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(5)}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              width={30}
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line
              dataKey="intensity"
              type="linear"
              stroke="var(--color-primary-green)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </div>

      {/* Recent 7 Days Count (Line Chart) */}
      <div className="gap-g3 rounded-br3 p-g4 flex flex-col bg-white">
        <p className="text-h6 text-black">최근 7일간 감정 기록 수</p>
        <ChartContainer id="chart-line-count" config={chartConfig} className="min-h-[200px] w-full">
          <LineChart
            accessibilityLayer
            data={data.lineData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(5)}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              width={30}
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line
              dataKey="count"
              type="linear"
              stroke="var(--color-primary-green)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </div>

      {/* Detailed Info */}
      <div className="gap-g3 rounded-br3 p-g4 flex flex-col bg-white">
        <p className="text-h6 text-black">감정별 상세 정보</p>
        <div className="gap-g3 flex flex-col">
          {data.emotionDetails.map((detail) => (
            <div
              key={detail.emotion}
              className="gap-g2 rounded-br3 p-g3 flex flex-col border border-gray-200 bg-white"
            >
              <p className="text-l1 text-start text-black">{detail.emotion}</p>
              <div className="flex items-center justify-between">
                <p className="text-b3 text-grey-200">{detail.count}회</p>
                <div className="gap-g1 flex items-center">
                  <p className="text-b3 text-grey-200">평균 강도</p>
                  <p className="text-l2 text-primary-green">{detail.avgIntensity}</p>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="bg-primary-green h-full"
                  style={{ width: `${(parseFloat(detail.avgIntensity) / 10) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
