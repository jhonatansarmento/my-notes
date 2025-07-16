'use server';

import { db } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface CreateNoteParams {
  userId: string;
  title: string;
  content?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: Date;
}

export async function createNote(params: CreateNoteParams) {
  const { userId, title, content, priority = 'MEDIUM', dueDate } = params;

  const note = await db.note.create({
    data: {
      title,
      content,
      priority,
      dueDate,
      userId,
    },
  });

  revalidatePath('/notes');
  return note; // Retornar a nota criada
}
