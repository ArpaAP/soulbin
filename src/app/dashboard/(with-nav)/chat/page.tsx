import TossFaceIcon from '@/components/TossFaceIcon';

import { ChatCard } from './chat-card';
import { CreateChatButton } from './create-chat-button';
import { getChats } from '@/actions/chat';

export default async function ChatPage() {
  const chats = await getChats();

  return (
    <div className="bg-bg flex h-full min-h-screen flex-col">
      {/* Header */}
      <div className="px-g5 flex h-14 items-center justify-center py-2.5">
        <h1 className="text-h5 text-black-200">상담 목록</h1>
      </div>

      {/* Content */}
      <div className="px-g3 flex flex-1 flex-col pb-[100px]">
        {chats.length === 0 ? (
          <div className="rounded-br3 mt-2.5 flex w-full flex-col items-center justify-center bg-white py-4">
            <div className="gap-g6 p-g8 flex w-full flex-col items-center justify-center">
              <TossFaceIcon emoji="💬" size={72} />
              <div className="gap-g2 flex flex-col items-center justify-center text-center">
                <p className="text-h6 text-black-100">아직 상담 기록이 없어요</p>
                <p className="text-b2 text-grey-300">마음 편하게 AI와 상담해보세요</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-2.5 flex w-full flex-col gap-2.5">
            {chats.map((chat) => (
              <ChatCard
                key={chat.id}
                id={chat.id}
                title={chat.title}
                lastMessage={chat.messages[0]?.content || null}
                updatedAt={chat.updatedAt}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Button */}
      <div className="px-g5 fixed bottom-[90px] left-1/2 z-10 w-full max-w-[430px] -translate-x-1/2">
        <CreateChatButton />
      </div>
    </div>
  );
}
