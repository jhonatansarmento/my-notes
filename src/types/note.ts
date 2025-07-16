// src/types/note.ts
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Note {
  id: string;
  title: string;
  content: string | null;
  done: boolean;
  priority: Priority;
  createdAt: Date;
  dueDate: Date | null;
  userId: string;
}
