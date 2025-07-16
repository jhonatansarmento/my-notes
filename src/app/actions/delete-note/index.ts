'use server';

import { db } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteNote(noteId: string) {
  await db.note.delete({ where: { id: noteId } });
  revalidatePath('/notes');
}
