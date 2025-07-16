import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import LoginForm from './components/LoginForm';

const LoginPage = async () => {
  try {
    const { userId } = await auth();
    if (userId) {
      redirect('/notes');
    }
  } catch (error) {
    console.error('Erro na verificação de autenticação:', error);
    // Em caso de erro, continua para mostrar a página de login
  }

  return <LoginForm />;
};

export default LoginPage;
