import { ChatRoom } from './chat-room';
import { getChat } from '@/actions/chat';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ChatRoomPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ChatRoomPage({ params }: ChatRoomPageProps) {
  const { id } = await params;
  const chat = await getChat(id);

  if (!chat) {
    notFound();
  }

  return (
    <div className="bg-bg relative flex h-full min-h-screen flex-col">
      {/* Header */}
      <div className="px-g5 fixed inset-x-0 z-10 mx-auto flex h-14 max-w-[430px] items-center justify-center bg-white py-2.5">
        <Link href="/dashboard/chat" className="absolute left-5">
          {/* Using a simple back arrow or X icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="#111111"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <h1 className="text-h5 text-black-200">새로운 대화</h1>
      </div>

      <div className="mb-[56px]" />

      {/* Chat Room Content */}
      <ChatRoom chatId={chat.id} initialMessages={chat.messages} />
    </div>
  );
}
