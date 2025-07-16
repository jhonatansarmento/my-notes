import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import {
  ArrowRight,
  Bookmark,
  Calendar,
  CheckCircle,
  List,
  LogIn,
  Pencil,
} from 'lucide-react';

export default async function HomePage() {
  const { userId } = await auth();
  if (userId) {
    return redirect('/notes');
  }

  return (
    <main className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-gray-200'>
      <div className='container mx-auto px-4 py-16 space-y-20'>
        {/* Hero Section */}
        <section className='text-center max-w-3xl mx-auto space-y-6'>
          <div className='flex justify-center'>
            <Bookmark className='h-16 w-16 text-blue-500' />
          </div>

          <h1 className='text-4xl sm:text-5xl font-bold'>My Notes</h1>

          <p className='text-lg text-gray-400'>
            Organize suas ideias, gerencie tarefas e mantenha tudo em um só
            lugar. Uma solução simples e eficiente para suas anotações pessoais.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center mt-8'>
            <Link href='/login'>
              <Button size='lg' className='gap-2'>
                <LogIn className='h-5 w-5' /> Fazer Login
              </Button>
            </Link>

            <Link href='/notes'>
              <Button
                variant='outline'
                size='lg'
                className='gap-2 border-gray-600 text-gray-300 hover:text-white'
              >
                <List className='h-5 w-5' /> Ver Notas
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className='grid md:grid-cols-3 gap-6'>
          <Card className='bg-gray-800 border border-gray-700 hover:border-gray-600 transition'>
            <CardContent className='p-6 text-center space-y-4'>
              <Pencil className='h-10 w-10 text-blue-400 mx-auto' />
              <h3 className='text-xl font-semibold'>Criação Simples</h3>
              <p className='text-gray-400 text-sm'>
                Crie notas rapidamente com títulos, conteúdos e defina
                prioridades para melhor organização.
              </p>
            </CardContent>
          </Card>

          <Card className='bg-gray-800 border border-gray-700 hover:border-gray-600 transition'>
            <CardContent className='p-6 text-center space-y-4'>
              <CheckCircle className='h-10 w-10 text-green-400 mx-auto' />
              <h3 className='text-xl font-semibold'>Gestão de Tarefas</h3>
              <p className='text-gray-400 text-sm'>
                Marque tarefas como concluídas e acompanhe seu progresso de
                forma visual e intuitiva.
              </p>
            </CardContent>
          </Card>

          <Card className='bg-gray-800 border border-gray-700 hover:border-gray-600 transition'>
            <CardContent className='p-6 text-center space-y-4'>
              <Calendar className='h-10 w-10 text-purple-400 mx-auto' />
              <h3 className='text-xl font-semibold'>Prazos e Prioridades</h3>
              <p className='text-gray-400 text-sm'>
                Defina datas de vencimento e prioridades para manter o foco no
                que é mais importante.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className='text-center bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-10 space-y-6'>
          <h2 className='text-3xl font-semibold text-white'>
            Pronto para começar?
          </h2>
          <p className='text-gray-400 text-lg'>
            Comece a organizar suas ideias agora mesmo. É rápido, fácil e
            gratuito!
          </p>
          <Link href='/login'>
            <Button
              size='lg'
              className='gap-2 px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600'
            >
              Comece Agora <ArrowRight className='h-5 w-5' />
            </Button>
          </Link>
        </section>
      </div>

      {/* Footer */}
      <footer className='border-t border-gray-800 py-8 mt-20 text-center text-gray-500 text-sm'>
        <div className='flex justify-center items-center gap-2'>
          <Bookmark className='h-5 w-5 text-gray-400' />
          <span className='font-medium'>
            My Notes © {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    </main>
  );
}
