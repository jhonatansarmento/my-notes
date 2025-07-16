'use client';

import { UserButton } from '@clerk/nextjs';
import { Bookmark } from 'lucide-react';

interface NotesHeaderProps {
  firstName: string;
}

export default function NotesHeader({ firstName }: NotesHeaderProps) {
  return (
    <header className='bg-gray-800 border-b border-gray-800 shadow-sm'>
      <div className='max-w-5xl mx-auto px-4 py-4 flex justify-between items-center'>
        {/* Logo / Título */}
        <div className='flex items-center gap-2'>
          <Bookmark className='h-6 w-6 text-blue-500' />
          <h1 className='text-xl sm:text-2xl font-bold text-gray-100'>
            My Notes
          </h1>
        </div>

        {/* Usuário + saudação */}
        <div className='flex items-center gap-3'>
          <span className='sm:block text-sm text-gray-400'>
            Bem-vindo,{' '}
            <span className='text-gray-200 font-medium'>{firstName}</span>!
          </span>
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'w-8 h-8 sm:w-10 sm:h-10',
                userButtonPopoverCard:
                  'shadow-lg bg-gray-900 border border-gray-800',
                userButtonPopoverActions: 'text-sm text-gray-200',
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
