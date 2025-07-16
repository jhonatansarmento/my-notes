'use server';

import { db } from '@/lib/prisma';

export async function listNotes(userId: string) {
  const notes = await db.note.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return notes;
}
