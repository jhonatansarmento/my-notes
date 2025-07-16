import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

const HomePage = async () => {
  // Se o usuário estiver logado, redirecionar para /notes
  const { userId } = await auth();
  if (userId) {
    redirect('/notes');
  }
  return (
    <>
      <main className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800'>
        <div className='container mx-auto px-4 py-12'>
          {/* Hero Section */}
          <div className='text-center mb-16'>
            <div className='mb-6'>
              <i className='pi pi-bookmark text-6xl text-blue-600'></i>
            </div>
            <h1 className='text-5xl font-bold text-gray-800 dark:text-white mb-6'>
              My Notes
            </h1>
            <p className='text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto'>
              Organize suas ideias, gerencie suas tarefas e mantenha tudo em um
              só lugar. Uma solução simples e eficiente para suas anotações
              pessoais.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Link href='/login'>
                <Button
                  label='Fazer Login'
                  icon='pi pi-sign-in'
                  className='px-8 py-3 text-lg'
                  size='large'
                />
              </Link>
              <Link href='/notes'>
                <Button
                  label='Ver Notas'
                  icon='pi pi-list'
                  outlined
                  className='px-8 py-3 text-lg'
                  size='large'
                />
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div className='grid md:grid-cols-3 gap-8 mb-16'>
            <Card className='text-center h-full'>
              <div className='p-6'>
                <i className='pi pi-pencil text-4xl text-blue-600 mb-4'></i>
                <h3 className='text-xl font-semibold mb-3'>Criação Simples</h3>
                <p className='text-gray-600 dark:text-gray-400'>
                  Crie notas rapidamente com títulos, conteúdo e defina
                  prioridades para melhor organização.
                </p>
              </div>
            </Card>

            <Card className='text-center h-full'>
              <div className='p-6'>
                <i className='pi pi-check-circle text-4xl text-green-600 mb-4'></i>
                <h3 className='text-xl font-semibold mb-3'>
                  Gestão de Tarefas
                </h3>
                <p className='text-gray-600 dark:text-gray-400'>
                  Marque tarefas como concluídas e acompanhe seu progresso de
                  forma visual e intuitiva.
                </p>
              </div>
            </Card>

            <Card className='text-center h-full'>
              <div className='p-6'>
                <i className='pi pi-calendar text-4xl text-purple-600 mb-4'></i>
                <h3 className='text-xl font-semibold mb-3'>
                  Prazos e Prioridades
                </h3>
                <p className='text-gray-600 dark:text-gray-400'>
                  Defina datas de vencimento e prioridades para manter o foco no
                  que é mais importante.
                </p>
              </div>
            </Card>
          </div>

          {/* Call to Action */}
          <div className='text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
            <h2 className='text-3xl font-semibold text-gray-800 dark:text-white mb-4'>
              Pronto para começar?
            </h2>
            <p className='text-lg text-gray-600 dark:text-gray-300 mb-6'>
              Comece a organizar suas ideias agora mesmo. É rápido, fácil e
              gratuito!
            </p>
            <Link href='/login'>
              <Button
                label='Comece Agora'
                icon='pi pi-arrow-right'
                iconPos='right'
                className='px-10 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 border-none'
                size='large'
              />
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className='bg-gray-800 text-white py-8 mt-16'>
          <div className='container mx-auto px-4 text-center'>
            <div className='flex justify-center items-center mb-4'>
              <i className='pi pi-bookmark text-2xl mr-2'></i>
              <span className='text-xl font-semibold'>My Notes</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};

export default HomePage;
