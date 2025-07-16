import { db } from '@/lib/prisma';
import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import NotesClient from './components/NotesClient';

const NotesPage = async () => {
  const { userId } = await auth();

  // Redirecionar para login se não estiver autenticado
  if (!userId) {
    redirect('/login');
  }

  const notes = await db.note.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      {/* Header com UserButton */}
      <header className='bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700'>
        <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
          <div className='flex items-center'>
            <i className='pi pi-bookmark text-2xl text-blue-600 mr-3'></i>
            <h1 className='text-xl sm:text-2xl font-bold text-gray-800 dark:text-white'>
              My Notes
            </h1>
          </div>
          <div className='flex items-center gap-2 sm:gap-4'>
            <span className='hidden sm:block text-sm text-gray-600 dark:text-gray-400'>
              Bem-vindo!
            </span>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'w-8 h-8 sm:w-10 sm:h-10',
                  userButtonPopoverCard: 'shadow-lg',
                  userButtonPopoverActions: 'text-sm',
                },
              }}
            />
          </div>
        </div>
      </header>

      {/* Conteúdo das notas */}
      <main className='container mx-auto px-4 py-6'>
        <NotesClient notes={notes} userId={userId} />
      </main>
    </div>
  );
};

export default NotesPage;
