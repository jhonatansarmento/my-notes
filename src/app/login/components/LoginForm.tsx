'use client';

import { SignInButton } from '@clerk/nextjs';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

const LoginForm = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4'>
      <div className='w-full max-w-md'>
        {/* Logo/Brand Section */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4'>
            <i className='pi pi-book text-white text-2xl'></i>
          </div>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>My Notes</h1>
          <p className='text-gray-600'>
            Organize suas ideias de forma inteligente
          </p>
        </div>

        {/* Login Card */}
        <Card className='shadow-xl border-0'>
          <div className='text-center space-y-6 p-6'>
            <div>
              <h2 className='text-2xl font-semibold text-gray-800 mb-2'>
                Bem-vindo de volta!
              </h2>
              <p className='text-gray-600'>
                Faça login para acessar suas notas
              </p>
            </div>

            <Divider className='my-6'>
              <span className='text-gray-500 bg-white px-3'>Entre com</span>
            </Divider>

            {/* Social Login Buttons */}
            <div className='space-y-3'>
              <SignInButton>
                <Button
                  label='Continuar com Google'
                  icon='pi pi-google'
                  className='w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  size='large'
                />
              </SignInButton>
            </div>

            <Divider />

            {/* Features Highlights */}
            <div className='text-left space-y-3'>
              <div className='flex items-center gap-3 text-sm text-gray-600'>
                <i className='pi pi-check-circle text-green-600'></i>
                <span>Sincronização em tempo real</span>
              </div>
              <div className='flex items-center gap-3 text-sm text-gray-600'>
                <i className='pi pi-check-circle text-green-600'></i>
                <span>Organização por prioridades</span>
              </div>
              <div className='flex items-center gap-3 text-sm text-gray-600'>
                <i className='pi pi-check-circle text-green-600'></i>
                <span>Acesso seguro e privado</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className='text-center mt-6 text-sm text-gray-500'>
          <p>
            Ao continuar, você concorda com nossos{' '}
            <a href='#' className='text-blue-600 hover:underline'>
              Termos de Uso
            </a>{' '}
            e{' '}
            <a href='#' className='text-blue-600 hover:underline'>
              Política de Privacidade
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
