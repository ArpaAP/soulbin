import { startOfDay, endOfDay, subDays, format } from 'date-fns';

import TossFaceIcon from '@/components/TossFaceIcon';

import { IconX } from '@/icons';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const EMOTION_EMOJI_MAP: Record<string, string> = {
  기쁨: '🥰',
  행복: '🥰',
  즐거움: '😆',
  설렘: '💓',
  슬픔: '😢',
  우울: '🌧️',
  분노: '😡',
  화남: '🔥',
  불안: '😨',
  걱정: '😟',
  평온: '😌',
  편안: '🍃',
  놀람: '😲',
  당황: '💦',
  지루함: '🥱',
  무기력: '🫠',
};

function getEmotionEmoji(emotion: string) {
  return EMOTION_EMOJI_MAP[emotion] || '😐';
}

function GrayIcon() {
  return (
    <div className="relative flex shrink-0 items-center justify-center overflow-clip">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
      >
        <path
          d="M23.2548 43.1244C22.638 43.1244 22.1136 42.6516 22.0596 42.0264C22.0032 41.3664 22.4928 40.7856 23.154 40.728C25.3524 40.5408 27.48 39.9804 29.4792 39.0636C30.0804 38.7888 30.7932 39.0516 31.0704 39.6552C31.3464 40.2576 31.0824 40.9692 30.4788 41.2464C28.2276 42.2784 25.8312 42.9084 23.3568 43.1208C23.322 43.1232 23.2884 43.1244 23.2548 43.1244ZM18.6156 42.9324C18.5568 42.9324 18.4968 42.9288 18.4368 42.9192C15.9108 42.5424 13.5528 41.8116 11.4312 40.746C10.8384 40.4484 10.5996 39.7272 10.8972 39.1356C11.1948 38.5428 11.9136 38.3028 12.5076 38.6016C14.4012 39.552 16.5156 40.206 18.7896 40.5456C19.4448 40.644 19.8972 41.2536 19.8 41.91C19.7112 42.5052 19.1988 42.9336 18.6144 42.9336L18.6156 42.9324ZM33.9564 38.9496C33.5976 38.9496 33.2424 38.79 33.006 38.484C32.6004 37.9596 32.6976 37.206 33.2208 36.8004C34.9656 35.4516 36.4548 33.828 37.6476 31.9752C38.0052 31.4184 38.748 31.2564 39.306 31.6164C39.8628 31.9752 40.0236 32.7168 39.6648 33.2748C38.3244 35.3568 36.6504 37.182 34.6884 38.6988C34.47 38.868 34.212 38.9496 33.9552 38.9496H33.9564ZM8.0952 38.3088C7.8192 38.3088 7.5432 38.214 7.3164 38.0208C5.4384 36.4164 3.876 34.4844 2.6736 32.2776C2.3556 31.6956 2.5716 30.9672 3.1524 30.6504C3.7332 30.3312 4.4628 30.5472 4.7796 31.1292C5.8416 33.078 7.2192 34.782 8.874 36.1956C9.378 36.6264 9.438 37.3836 9.0072 37.8876C8.7696 38.1648 8.4336 38.3088 8.0952 38.3088ZM40.7112 29.6556C40.578 29.6556 40.4412 29.6328 40.308 29.5848C39.684 29.3616 39.3576 28.6764 39.5808 28.0512C40.3176 25.9848 40.6908 23.814 40.6908 21.6C40.6908 20.9376 41.2284 20.3568 41.8908 20.3568C42.5532 20.3568 43.0908 20.8512 43.0908 21.5136V21.5988C43.0908 24.0888 42.6696 26.5308 41.8404 28.8564C41.6652 29.3472 41.2032 29.6544 40.71 29.6544L40.7112 29.6556ZM1.986 28.5948C1.4604 28.5948 0.978 28.2468 0.8304 27.7164C0.2796 25.7352 0 23.6772 0 21.5988C0 21.204 0.00959983 20.8092 0.0299998 20.4156C0.0635998 19.7532 0.63 19.2324 1.29 19.2792C1.9512 19.3128 2.4612 19.878 2.4264 20.5392C2.4084 20.892 2.4 21.2448 2.4 21.5988C2.4 23.46 2.6496 25.302 3.1428 27.0732C3.3204 27.7116 2.9472 28.3728 2.3088 28.5504C2.2008 28.5804 2.0928 28.5948 1.986 28.5948ZM41.3472 18.0996C40.8036 18.0996 40.3104 17.7276 40.1808 17.1756C39.6756 15.0336 38.8092 13.0092 37.608 11.1588C37.2468 10.6032 37.4052 9.8592 37.9608 9.4992C38.5164 9.138 39.2604 9.2976 39.6204 9.852C40.9716 11.934 41.946 14.2128 42.516 16.6236C42.6684 17.2692 42.2688 17.9148 41.6244 18.0672C41.5308 18.09 41.4384 18.0996 41.3472 18.0996ZM1.9656 17.0844C1.8612 17.0844 1.7544 17.07 1.6476 17.0412C1.008 16.866 0.6324 16.206 0.8076 15.5664C1.4736 13.1388 2.5248 10.8936 3.9336 8.8968C4.3164 8.3544 5.0652 8.2248 5.6064 8.6076C6.1488 8.9892 6.2784 9.738 5.8956 10.2804C4.6464 12.0504 3.714 14.0424 3.1224 16.2012C2.976 16.734 2.4936 17.0844 1.9656 17.0844ZM35.6568 8.1192C35.3568 8.1192 35.0568 8.0076 34.824 7.7832C33.234 6.2496 31.4136 5.0112 29.4096 4.1028C28.806 3.8292 28.5384 3.1176 28.812 2.514C29.0844 1.9104 29.796 1.6404 30.4008 1.9164C32.6532 2.9388 34.7028 4.3308 36.4896 6.0552C36.966 6.516 36.9804 7.2756 36.5196 7.752C36.2844 7.9968 35.9712 8.1192 35.6568 8.1192ZM8.034 7.3452C7.6968 7.3452 7.362 7.2036 7.1244 6.9288C6.6912 6.4272 6.7476 5.6688 7.2492 5.2368C9.0996 3.6408 11.2392 2.3868 13.6104 1.5072C14.2296 1.2756 14.922 1.5936 15.1524 2.2152C15.3828 2.8368 15.066 3.5268 14.4444 3.7572C12.3432 4.5372 10.4496 5.646 8.8164 7.0548C8.5896 7.2504 8.3112 7.3452 8.034 7.3452ZM25.4784 2.7888C25.4016 2.7888 25.3224 2.7816 25.2444 2.766C24.018 2.5224 22.7556 2.4 21.492 2.4C20.5764 2.4372 19.626 2.5272 18.7128 2.6664C18.0612 2.7708 17.4456 2.3172 17.3448 1.6608C17.2452 1.0056 17.6952 0.3936 18.3504 0.2928C19.3512 0.1404 20.3928 0.042 21.444 0H21.4596C22.9212 0 24.336 0.138 25.71 0.4104C26.3604 0.5388 26.7828 1.1712 26.6544 1.8204C26.5416 2.3916 26.04 2.7888 25.4784 2.7888Z"
          fill="#888888"
        />
        <path
          d="M15.9948 20.4323C17.3428 20.4323 18.4356 19.0085 18.4356 17.2523C18.4356 15.496 17.3428 14.0723 15.9948 14.0723C14.6468 14.0723 13.554 15.496 13.554 17.2523C13.554 19.0085 14.6468 20.4323 15.9948 20.4323Z"
          fill="#888888"
        />
        <path
          d="M26.9868 20.4323C28.3348 20.4323 29.4276 19.0085 29.4276 17.2523C29.4276 15.496 28.3348 14.0723 26.9868 14.0723C25.6388 14.0723 24.546 15.496 24.546 17.2523C24.546 19.0085 25.6388 20.4323 26.9868 20.4323Z"
          fill="#888888"
        />
        <path
          d="M28.1316 29.4036H14.8488C14.2044 29.4036 13.6836 28.8816 13.6836 28.2384C13.6836 27.5952 14.2044 27.0732 14.8488 27.0732H28.1316C28.776 27.0732 29.2968 27.5952 29.2968 28.2384C29.2968 28.8816 28.776 29.4036 28.1316 29.4036Z"
          fill="#888888"
        />
      </svg>
    </div>
  );
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user?.isRegistered) {
    redirect('/register');
  }

  // Data Fetching
  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());
  const weekStart = subDays(new Date(), 7);

  const [todayDiary, weeklyDiaries, recentDiaries] = await Promise.all([
    prisma.diary.findFirst({
      where: {
        userId: session.user.id,
        createdAt: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
      include: { analysis: true },
    }),
    prisma.diary.findMany({
      where: {
        userId: session.user.id,
        createdAt: {
          gte: weekStart,
        },
        analysis: {
          isNot: null,
        },
      },
      select: {
        analysis: {
          select: {
            emotion: true,
          },
        },
      },
    }),
    prisma.diary.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 3,
      include: {
        analysis: true,
      },
    }),
  ]);

  // Weekly Summary Calculation
  const emotionCounts = weeklyDiaries.reduce(
    (acc, curr) => {
      const emotion = curr.analysis?.emotion;
      if (emotion) {
        acc[emotion] = (acc[emotion] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  const mostFrequentEmotion = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0]?.[0];

  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  const greetingEmoji = () => {
    const hour = currentDate.getHours();
    if (hour < 6) return '🌙';
    if (hour < 12) return '🌅';
    if (hour < 18) return '☀️';
    if (hour < 22) return '🌆';
    return '🌙';
  };

  const greeting = () => {
    const hour = currentDate.getHours();
    if (hour < 6) return '늦은 밤이에요';
    if (hour < 12) return '좋은 아침이에요';
    if (hour < 18) return '좋은 오후에요';
    if (hour < 22) return '좋은 저녁이에요';
    return '늦은 밤이에요';
  };

  return (
    <div className="bg-bg relative min-h-screen w-full">
      {/* GNB */}
      <div className="bg-bg px-g5 mx-auto mt-2 box-border flex h-14 w-full max-w-[430px] content-stretch items-center gap-2.5 overflow-clip py-2.5">
        <p className="text-black-200 relative shrink-0 text-center text-[20px] leading-[28px] font-semibold tracking-[-0.5px] text-nowrap whitespace-pre not-italic">
          SoulBin
        </p>
      </div>

      {/* Contents */}
      <div className="gap-g2 px-g3 py-g0 mx-auto box-border flex w-full max-w-[430px] flex-col content-stretch items-start overflow-clip">
        {/* 인사 카드 */}
        <div className="bg-dashboard-nav-bg gap-g3 p-g4 rounded-br3 relative box-border flex w-full shrink-0 content-stretch items-center overflow-clip">
          <TossFaceIcon emoji={greetingEmoji()} />
          <div className="gap-g0 p-g0 relative box-border flex shrink-0 flex-col content-stretch items-start leading-0 not-italic">
            <div className="text-black-100 relative flex w-full shrink-0 flex-col justify-center text-[18px] font-semibold tracking-[-0.45px]">
              <p className="leading-[26px]">
                {greeting()}, {session.user.name}님
              </p>
            </div>
            <div className="text-grey-300 relative flex w-full shrink-0 flex-col justify-center text-[14px] font-normal tracking-[-0.35px]">
              <p className="leading-[22px]">{dateString}</p>
            </div>
          </div>
        </div>

        {/* 오늘의 마음가짐 카드 */}
        <div className="gap-g3 p-g4 rounded-br3 relative box-border flex w-full shrink-0 flex-col content-stretch items-start justify-center overflow-clip bg-white">
          <TossFaceIcon emoji="💖" size={64} />
          <div className="gap-g1 relative flex shrink-0 flex-col content-stretch items-start justify-center text-nowrap whitespace-pre not-italic">
            <p className="text-black-100 relative shrink-0 text-[20px] leading-[28px] font-semibold tracking-[-0.5px]">
              오늘의 마음가짐
            </p>
            <p className="text-grey-300 relative shrink-0 text-[14px] leading-[22px] font-normal tracking-[-0.35px] whitespace-normal">
              첫 감정 일기를 작성하고 나만의 마음가짐을 받아보세요!
            </p>
          </div>
          <div className="right-g4 top-g4 absolute size-[24px] overflow-clip">
            <IconX />
          </div>
        </div>

        {/* 일기 쓰기 / AI 챗봇 상담 버튼 */}
        <div className="gap-g2 relative flex w-full shrink-0 content-stretch items-start">
          <Link
            href="/dashboard/diary/write"
            className="bg-white-100 gap-g2 px-g4 py-g5 rounded-br3 relative box-border flex min-h-px min-w-px shrink-0 grow basis-0 flex-col content-stretch items-center justify-center overflow-clip"
          >
            <TossFaceIcon emoji="✍️" size={24} />
            <p className="relative shrink-0 text-[16px] leading-[20px] font-medium tracking-[-0.32px] text-nowrap whitespace-pre text-black not-italic">
              일기 쓰기
            </p>
          </Link>
          <div className="bg-white-100 gap-g2 px-g4 py-g5 rounded-br3 relative box-border flex min-h-px min-w-px shrink-0 grow basis-0 flex-col content-stretch items-center justify-center overflow-clip">
            <TossFaceIcon emoji="💬" size={24} />
            <p className="relative shrink-0 text-[16px] leading-[20px] font-medium tracking-[-0.32px] text-nowrap whitespace-pre text-black not-italic">
              AI 챗봇 상담
            </p>
          </div>
        </div>

        {/* 오늘의 감정 카드 */}
        <div className="gap-g3 p-g4 rounded-br3 relative box-border flex w-full shrink-0 flex-col content-stretch items-start overflow-clip bg-white">
          <p className="relative shrink-0 text-[18px] leading-[26px] font-semibold tracking-[-0.45px] text-nowrap whitespace-pre text-black not-italic">
            오늘의 감정
          </p>
          {todayDiary?.analysis ? (
            <div className="flex w-full items-center gap-4">
              <TossFaceIcon emoji={getEmotionEmoji(todayDiary.analysis.emotion)} size={48} />
              <div className="flex flex-col gap-1">
                <p className="text-b1 text-black-100 font-medium">
                  오늘의 감정은{' '}
                  <span className="text-primary-green">{todayDiary.analysis.emotion}</span>이에요
                </p>
                <p className="text-b3 text-grey-300 line-clamp-1">{todayDiary.analysis.summary}</p>
              </div>
            </div>
          ) : (
            <div className="relative flex h-[100px] w-full shrink-0 flex-col content-stretch items-center justify-center gap-2.5">
              <GrayIcon />
              <p className="text-grey-300 relative shrink-0 text-[14px] leading-[22px] font-normal tracking-[-0.35px] text-nowrap whitespace-pre not-italic">
                아직 오늘의 감정을 기록하지 않았어요
              </p>
            </div>
          )}
        </div>

        {/* 이번 주 요약 카드 */}
        <div className="gap-g3 p-g4 rounded-br3 relative box-border flex w-full shrink-0 flex-col content-stretch items-start overflow-clip bg-white">
          <p className="relative shrink-0 text-[18px] leading-[26px] font-semibold tracking-[-0.45px] text-nowrap whitespace-pre text-black not-italic">
            이번 주 요약
          </p>
          {mostFrequentEmotion ? (
            <div className="flex w-full items-center gap-4">
              <TossFaceIcon emoji={getEmotionEmoji(mostFrequentEmotion)} size={48} />
              <div className="flex flex-col gap-1">
                <p className="text-b1 text-black-100 font-medium">
                  이번 주는 <span className="text-primary-green">{mostFrequentEmotion}</span>을 가장
                  많이 느꼈어요
                </p>
                <p className="text-b3 text-grey-300">
                  총 {weeklyDiaries.length}개의 감정을 기록했어요
                </p>
              </div>
            </div>
          ) : (
            <div className="relative flex h-[100px] w-full shrink-0 flex-col content-stretch items-center justify-center gap-2.5">
              <GrayIcon />
              <p className="text-grey-300 relative shrink-0 text-[14px] leading-[22px] font-normal tracking-[-0.35px] text-nowrap whitespace-pre not-italic">
                감정 기록을 시작해볼까요?
              </p>
            </div>
          )}
        </div>

        {/* 최근 일기 기록 카드 */}
        <div className="gap-g3 p-g4 rounded-br3 relative box-border flex w-full shrink-0 flex-col content-stretch items-start overflow-clip bg-white">
          <p className="relative shrink-0 text-[18px] leading-[26px] font-semibold tracking-[-0.45px] text-nowrap whitespace-pre text-black not-italic">
            최근 일기 기록
          </p>
          {recentDiaries.length > 0 ? (
            <div className="gap-g2 flex w-full flex-col">
              {recentDiaries.map((diary) => (
                <Link
                  href="/dashboard/diary/list"
                  key={diary.id}
                  className="rounded-br3 p-g3 flex w-full items-center justify-between border border-gray-100 bg-white transition-colors hover:bg-gray-50"
                >
                  <div className="gap-g3 flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50">
                      <TossFaceIcon
                        emoji={getEmotionEmoji(diary.analysis?.emotion || '평온')}
                        size={24}
                      />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-b2 text-black-100 font-medium">
                        {diary.analysis?.emotion || '분석 중'}
                      </p>
                      <p className="text-c1 text-grey-300 line-clamp-1 max-w-[200px]">
                        {diary.analysis?.summary || diary.content}
                      </p>
                    </div>
                  </div>
                  <p className="text-c2 text-grey-200 whitespace-nowrap">
                    {format(diary.createdAt, 'M.d')}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="relative flex h-[100px] w-full shrink-0 flex-col content-stretch items-center justify-center gap-2.5">
              <GrayIcon />
              <p className="text-grey-300 relative shrink-0 text-[14px] leading-[22px] font-normal tracking-[-0.35px] text-nowrap whitespace-pre not-italic">
                아직 기록이 없어요
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
