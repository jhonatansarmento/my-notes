'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SignInButton } from '@clerk/nextjs';
import {
  Book,
  CheckCircle,
  CircleUserRound,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export default function LoginForm() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 p-4 text-gray-200'>
      <div className='w-full max-w-md'>
        {/* Branding */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4'>
            <Book className='text-white w-7 h-7' />
          </div>
          <h1 className='text-3xl font-bold'>My Notes</h1>
          <p className='text-sm text-gray-400'>
            Organize suas ideias de forma inteligente
          </p>
        </div>

        {/* Card de Login */}
        <Card className='bg-gray-800 border border-gray-700 shadow-xl'>
          <CardContent className='p-6 space-y-6'>
            {/* Header */}
            <div className='text-center space-y-1'>
              <h2 className='text-2xl font-semibold'>Bem-vindo de volta!</h2>
              <p className='text-sm text-gray-400'>
                Faça login para acessar suas notas
              </p>
            </div>

            {/* Divider */}
            <div className='relative text-center'>
              <Separator className='bg-gray-700' />
              <span className='absolute left-1/2 -translate-x-1/2 -top-2.5 bg-gray-800 px-3 text-sm text-gray-400'>
                Entre com
              </span>
            </div>

            {/* Google Login */}
            <SignInButton
              mode='modal'
              fallbackRedirectUrl='/notes'
              forceRedirectUrl='/notes'
            >
              <Button
                variant='outline'
                size='lg'
                className='w-full justify-center gap-2 border-gray-600 text-gray-300 hover:text-white'
              >
                <CircleUserRound className='h-5 w-5' />
                Continuar com Google
              </Button>
            </SignInButton>

            {/* Divider */}
            <Separator className='bg-gray-700' />

            {/* Destaques */}
            <div className='text-sm space-y-3'>
              <div className='flex items-center gap-3 text-gray-400'>
                <CheckCircle className='text-green-500 w-4 h-4' />
                Sincronização em tempo real
              </div>
              <div className='flex items-center gap-3 text-gray-400'>
                <Sparkles className='text-yellow-400 w-4 h-4' />
                Organização por prioridades
              </div>
              <div className='flex items-center gap-3 text-gray-400'>
                <ShieldCheck className='text-blue-500 w-4 h-4' />
                Acesso seguro e privado
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className='text-center mt-6 text-xs text-gray-500'>
          <p>
            Ao continuar, você concorda com nossos{' '}
            <a href='#' className='text-blue-400 hover:underline'>
              Termos de Uso
            </a>{' '}
            e{' '}
            <a href='#' className='text-blue-400 hover:underline'>
              Política de Privacidade
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
