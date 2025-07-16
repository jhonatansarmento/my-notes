'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoginForm from './LoginForm';

export default function LoginClient() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && userId) {
      router.push('/notes');
    }
  }, [isLoaded, userId, router]);

  return <LoginForm />;
}
