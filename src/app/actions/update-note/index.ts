'use server';

import { db } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface UpdateNoteParams {
  id: string;
  title: string;
  content?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: Date;
}

export async function updateNote(params: UpdateNoteParams) {
  const { id, title, content, priority = 'MEDIUM', dueDate } = params;

  const note = await db.note.update({
    where: { id },
    data: {
      title,
      content,
      priority,
      dueDate: dueDate ?? null,
    },
  });

  revalidatePath('/notes');
  return note;
}
