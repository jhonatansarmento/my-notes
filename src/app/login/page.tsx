import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import LoginForm from './components/LoginForm';

export default async function LoginPage() {
  const { userId } = await auth();
  if (userId) {
    redirect('/notes');
  }
  return <LoginForm />;
}
