'use server';

import { processChatAction, generateChatTitleAction } from './openai';
import { MessageRole } from '@/generated/prisma/enums';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

/**
 * Get all chats for the current user
 */
export async function getChats() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return [];
  }

  try {
    const chats = await prisma.chat.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    });

    return chats;
  } catch (error) {
    console.error('Failed to fetch chats:', error);
    return [];
  }
}

/**
 * Get a specific chat with messages
 */
export async function getChat(chatId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        userId: session.user.id,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    return chat;
  } catch (error) {
    console.error('Failed to fetch chat:', error);
    return null;
  }
}

/**
 * Create a new chat session
 */
export async function createChat() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    const chat = await prisma.chat.create({
      data: {
        userId: session.user.id,
        title: '새로운 상담',
      },
    });

    revalidatePath('/dashboard/chat');
    return chat;
  } catch (error) {
    console.error('Failed to create chat:', error);
    throw new Error('Failed to create chat');
  }
}

/**
 * Delete a chat session
 */
export async function deleteChat(chatId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    await prisma.chat.delete({
      where: {
        id: chatId,
        userId: session.user.id,
      },
    });

    revalidatePath('/dashboard/chat');
  } catch (error) {
    console.error('Failed to delete chat:', error);
    throw new Error('Failed to delete chat');
  }
}

/**
 * Save a message to the database
 */
export async function saveMessage(chatId: string, content: string, role: MessageRole) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    // Verify chat ownership
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        userId: session.user.id,
      },
    });

    if (!chat) {
      throw new Error('Chat not found');
    }

    const message = await prisma.message.create({
      data: {
        chatId,
        content,
        role,
      },
    });

    // If this is the first user message, generate and update title
    let titleUpdate = {};
    if (role === 'USER') {
      const messageCount = await prisma.message.count({
        where: { chatId },
      });

      if (messageCount === 1) {
        const title = await generateChatTitleAction(content);
        titleUpdate = { title };
      }
    }

    // Update chat's updatedAt timestamp and optionally title
    await prisma.chat.update({
      where: { id: chatId },
      data: {
        updatedAt: new Date(),
        ...titleUpdate,
      },
    });

    revalidatePath(`/dashboard/chat/${chatId}`);
    revalidatePath('/dashboard/chat');

    return message;
  } catch (error) {
    console.error('Failed to save message:', error);
    throw new Error('Failed to save message');
  }
}

/**
 * Generate AI response and save it
 */
export async function generateAIResponse(chatId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    // Generate AI response
    const aiContent = await processChatAction(chatId);

    // Save AI message
    const message = await prisma.message.create({
      data: {
        chatId,
        content: aiContent,
        role: 'ASSISTANT',
      },
    });

    // Update chat's updatedAt timestamp
    await prisma.chat.update({
      where: { id: chatId },
      data: { updatedAt: new Date() },
    });

    revalidatePath(`/dashboard/chat/${chatId}`);
    revalidatePath('/dashboard/chat');

    return message;
  } catch (error) {
    console.error('Failed to generate AI response:', error);
    throw new Error('Failed to generate AI response');
  }
}
