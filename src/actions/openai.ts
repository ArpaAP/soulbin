'use server';

import { z } from 'zod';

import { AIStyle } from '@/generated/prisma/enums';
import prisma from '@/lib/prisma';
import { HumanMessage, AIMessage, SystemMessage } from '@langchain/core/messages';
import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';

// OpenAI API 키 확인
const API_KEY = process.env.OPENAI_API_KEY;

if (!API_KEY) {
  console.warn('OpenAI API 키가 설정되지 않았습니다.');
}

// 공통 모델 설정
const createModel = (temperature: number = 0.7) => {
  return new ChatOpenAI({
    modelName: 'gpt-4o-mini',
    temperature,
    openAIApiKey: API_KEY,
  });
};

// 감정 분석 결과 타입 정의
const emotionSchema = z.object({
  emotion: z
    .string()
    .describe(
      '주요 감정 (예: 불안, 기쁨, 슬픔, 분노, 스트레스, 피로, 외로움, 만족, 희망, 걱정 등)'
    ),
  intensity: z.number().min(1).max(10).describe('1부터 10까지의 감정 강도'),
  tags: z.array(z.string()).describe('관련 태그 3-5개'),
  summary: z.string().describe('감정 상태에 대한 한 줄 요약'),
});

type EmotionAnalysisResult = z.infer<typeof emotionSchema>;

const emotionParser = StructuredOutputParser.fromZodSchema(emotionSchema);

/**
 * 감정 분석 함수
 */
export async function analyzeEmotionAction(text: string): Promise<EmotionAnalysisResult> {
  if (!API_KEY) throw new Error('OpenAI API 키가 설정되지 않았습니다.');

  const model = createModel(0.3);

  const prompt = new PromptTemplate({
    template: `당신은 감정 분석 전문가입니다. 사용자의 텍스트를 분석하여 다음 형식의 JSON으로 응답해주세요.
감정은 한국어로 표현하고, 태그는 구체적이고 실용적으로 3-5개 정도 제공해주세요.

{format_instructions}

사용자 텍스트: {text}`,
    inputVariables: ['text'],
    partialVariables: { format_instructions: emotionParser.getFormatInstructions() },
  });

  try {
    const chain = prompt.pipe(model).pipe(emotionParser);
    const result = await chain.invoke({ text });
    return result as EmotionAnalysisResult;
  } catch (error) {
    console.error('감정 분석 실패:', error);
    // 폴백 데이터 반환
    return {
      emotion: '복합적인 감정',
      intensity: 5,
      tags: ['분석 필요'],
      summary: '감정 분석 중 오류가 발생했습니다.',
    };
  }
}

/**
 * 성격별 프롬프트 생성
 */
const getPersonalitySystemPrompt = (style: AIStyle) => {
  const prompts = {
    [AIStyle.AUTO]: `당신은 공감 능력이 뛰어난 심리 상담 전문가입니다.
사용자의 감정 상태를 이해하고, 상황에 따라 적절한 조언을 제공해주세요.
조언은 다음 원칙을 따라주세요:
1. 감정 강도가 높을 때(7 이상)는 먼저 공감하고 위로해주세요
2. 감정 강도가 낮거나 중간일 때는 직설적이고 실용적인 조언도 괜찮습니다
3. 구체적이고 실천 가능한 대처 방법을 제시해주세요
4. 긍정적이지만 현실적인 관점을 유지해주세요
5. 2-4문장 정도의 적절한 길이로 작성해주세요
6. 존댓말을 사용하되 상황에 맞는 톤을 유지해주세요`,

    [AIStyle.COLD]: `당신은 직설적이고 현실적인 조언을 제공하는 전문 상담가입니다.
사용자의 감정을 인정하되, 솔직하고 때로는 따끔한 조언을 제공해주세요.
조언은 다음 원칙을 따라주세요:
1. 과도한 공감이나 위로보다는 현실적인 해결책을 제시하세요
2. 사용자가 스스로 문제를 직시하도록 도와주세요
3. 구체적이고 실행 가능한 행동 지침을 제공하세요
4. 감정에 휩쓸리기보다 이성적으로 접근하도록 유도하세요
5. 2-4문장 정도로 간결하고 명확하게 전달하세요
6. 존댓말을 사용하되 직설적인 톤을 유지해주세요`,

    [AIStyle.WARM]: `당신은 따뜻하고 공감 능력이 뛰어난 심리 상담 전문가입니다.
사용자의 감정을 충분히 이해하고, 항상 부드럽고 위로가 되는 조언을 제공해주세요.
조언은 다음 원칙을 따라주세요:
1. 먼저 사용자의 감정을 충분히 공감하고 인정해주세요
2. 따뜻하고 격려하는 말로 위로해주세요
3. 부드럽고 실천 가능한 대처 방법을 제시해주세요
4. 긍정적이고 희망적인 관점을 유지해주세요
5. 3-5문장 정도로 충분히 공감하며 작성해주세요
6. 존댓말을 사용하되 따뜻하고 다정한 톤을 유지해주세요`,
  };

  return prompts[style] || prompts[AIStyle.AUTO];
};

/**
 * 조언 생성 함수
 */
export async function generateAdviceAction(
  emotionData: { emotion: string; intensity: number; tags: string[]; summary: string },
  content: string,
  style: AIStyle = AIStyle.AUTO
) {
  if (!API_KEY) throw new Error('OpenAI API 키가 설정되지 않았습니다.');

  const model = createModel(0.8);
  const systemPrompt = getPersonalitySystemPrompt(style);

  const prompt = new PromptTemplate({
    template: `${systemPrompt}

사용자의 현재 감정 상태:
- 주요 감정: {emotion}
- 감정 강도: {intensity}/10
- 관련 태그: {tags}
- 상황: {content}

이 상황에 대한 조언을 부탁드립니다.`,
    inputVariables: ['emotion', 'intensity', 'tags', 'content'],
  });

  try {
    const chain = prompt.pipe(model);
    const response = await chain.invoke({
      emotion: emotionData.emotion,
      intensity: emotionData.intensity,
      tags: emotionData.tags.join(', '),
      content,
    });

    return typeof response.content === 'string'
      ? response.content.trim()
      : String(response.content);
  } catch (error) {
    console.error('조언 생성 실패:', error);
    return '지금 느끼시는 감정을 있는 그대로 받아들여 보세요. 모든 감정은 의미가 있고, 시간이 지나면 변화합니다.';
  }
}

/**
 * 전체 감정 처리 파이프라인
 */
export async function processEmotionAction(text: string, style: AIStyle = AIStyle.AUTO) {
  try {
    // 1. 감정 분석
    const analysis = await analyzeEmotionAction(text);

    // 2. 조언 생성
    const advice = await generateAdviceAction(analysis, text, style);

    return {
      ...analysis,
      advice,
    };
  } catch (error) {
    console.error('감정 처리 실패:', error);
    throw error;
  }
}

/**
 * 오늘의 마음가짐 생성 함수
 */
export async function generateDailyMindsetAction(emotionStats: {
  total: number;
  mostCommon: string | null;
  averageIntensity: number;
}) {
  if (!API_KEY) throw new Error('OpenAI API 키가 설정되지 않았습니다.');

  const model = createModel(0.9);

  const prompt = new PromptTemplate({
    template: `당신은 따뜻하고 지혜로운 감정 코치입니다.
사용자의 최근 감정 패턴을 바탕으로 오늘 하루를 위한 긍정적이고 실용적인 조언을 제공해주세요.
조언은 다음 형식을 따라주세요:
- 2-3문장으로 간결하게
- 구체적이고 실천 가능한 내용
- 따뜻하고 격려하는 톤
- 존댓말 사용

최근 나의 감정 패턴:
- 총 {total}개의 감정 기록
- 가장 많이 느낀 감정: {mostCommon}
- 평균 감정 강도: {averageIntensity}/10

오늘 하루를 위한 조언을 부탁드립니다.`,
    inputVariables: ['total', 'mostCommon', 'averageIntensity'],
  });

  try {
    const chain = prompt.pipe(model);
    const response = await chain.invoke({
      total: emotionStats.total,
      mostCommon: emotionStats.mostCommon || '없음',
      averageIntensity: emotionStats.averageIntensity.toFixed(1),
    });

    return typeof response.content === 'string'
      ? response.content.trim()
      : String(response.content);
  } catch (error) {
    console.error('오늘의 마음가짐 생성 실패:', error);
    return '오늘은 작은 것에 감사하는 하루를 보내보세요. 당신이 가진 것들에 집중하면 마음이 더 풍요로워질 거예요.';
  }
}

/**
 * 채팅 응답 생성 함수
 */
export async function processChatAction(chatId: string) {
  if (!API_KEY) throw new Error('OpenAI API 키가 설정되지 않았습니다.');

  // 1. 이전 대화 기록 조회 (최근 10개)
  const recentMessages = await prisma.message.findMany({
    where: { chatId },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  // 시간순 정렬 및 메시지 객체 변환
  const history = recentMessages.reverse().map((msg) =>
    msg.role === 'USER' || msg.role === 'SYSTEM' // SYSTEM role handling might need adjustment if stored in DB
      ? new HumanMessage(msg.content)
      : new AIMessage(msg.content)
  );

  const model = createModel(0.7);

  // 시스템 프롬프트 (기본 상담가 페르소나)
  const systemPrompt = `당신은 공감 능력이 뛰어나고 전문적인 심리 상담 AI입니다.
사용자의 이야기를 경청하고, 감정을 읽어주며, 적절한 위로와 조언을 제공해주세요.
대화의 맥락을 파악하여 자연스럽게 대화를 이어나가세요.
너무 길지 않게(3-5문장 내외) 답변하고, 따뜻하고 정중한 말투를 사용해주세요.`;

  const messages = [new SystemMessage(systemPrompt), ...history];

  try {
    const response = await model.invoke(messages);
    const aiContent =
      typeof response.content === 'string' ? response.content : String(response.content);

    return aiContent;
  } catch (error) {
    console.error('채팅 응답 생성 실패:', error);
    return '죄송합니다. 잠시 후 다시 시도해주세요.';
  }
}
