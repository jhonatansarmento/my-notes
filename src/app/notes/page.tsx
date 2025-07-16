import NotesClient from '@/app/notes/components/NotesClient';
import NotesHeader from '@/app/notes/components/NotesHeader';
import { db } from '@/lib/prisma';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const NotesPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect('/login');
  }

  const user = await currentUser();

  const notes = await db.note.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className='bg-gray-50 min-h-screen dark:bg-gray-900'>
      {/* Header com UserButton */}
      <NotesHeader firstName={user?.firstName || 'Usuário'} />
      {/* Conteúdo das notas */}
      <main className='container mx-auto px-4 py-6'>
        <NotesClient notes={notes} userId={userId} />
      </main>
    </div>
  );
};

export default NotesPage;
