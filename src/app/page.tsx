import { db } from '@/lib/prisma';
import { listNotes } from './actions/list-notes';

export default async function NotesPage() {
  const user = await db.user.findUnique({
    where: { email: 'alice@example.com' },
  });

  if (!user) {
    return <main>Usuário não encontrado</main>;
  }

  // ✅ Agora pega as notas via Server Action
  const notes = await listNotes(user.id);

  return (
    <main>
      <h1>📒 Minhas Notas ({user.name})</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.done ? '✅' : '⬜'} {note.title} - {note.priority}
          </li>
        ))}
      </ul>
    </main>
  );
}
