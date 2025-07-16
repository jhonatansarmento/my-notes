'use server';

import { db } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function toggleNoteDone(noteId: string) {
  const note = await db.note.findUnique({ where: { id: noteId } });
  if (!note) throw new Error('Nota não encontrada');

  await db.note.update({
    where: { id: noteId },
    data: { done: !note.done },
  });

  revalidatePath('/notes');
}
