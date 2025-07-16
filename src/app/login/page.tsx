import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import LoginForm from './components/LoginForm';

const LoginPage = async () => {
  const { userId } = await auth();
  if (userId) {
    redirect('/');
  }

  return <LoginForm />;
};

export default LoginPage;
