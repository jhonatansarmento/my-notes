'use server';

import { db } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface AddNoteParams {
  userId: string;
  title: string;
  content?: string;
}

export async function addNoteAction({ userId, title, content }: AddNoteParams) {
  await db.note.create({
    data: {
      title,
      content,
      userId,
    },
  });

  revalidatePath('/');
}
