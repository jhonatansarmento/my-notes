'use client';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4'>
      <Card className='w-full max-w-md text-center'>
        <div className='p-6'>
          <i className='pi pi-exclamation-triangle text-6xl text-red-500 mb-4'></i>
          <h2 className='text-2xl font-bold text-gray-800 dark:text-white mb-4'>
            Oops! Algo deu errado
          </h2>
          <p className='text-gray-600 dark:text-gray-400 mb-6'>
            Ocorreu um erro inesperado. Por favor, tente novamente.
          </p>
          {error.digest && (
            <p className='text-sm text-gray-500 mb-4'>
              ID do erro: {error.digest}
            </p>
          )}
          <div className='flex flex-col gap-3'>
            <Button
              label='Tentar Novamente'
              icon='pi pi-refresh'
              onClick={reset}
              className='w-full'
            />
            <Button
              label='Voltar ao Início'
              icon='pi pi-home'
              outlined
              onClick={() => (window.location.href = '/')}
              className='w-full'
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
