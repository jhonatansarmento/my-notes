import { Toaster } from '@/components/ui/sonner';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import type { Metadata } from 'next';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'My Notes - Organize suas ideias',
  description:
    'Aplicação para gerenciar notas e tarefas de forma simples e eficiente',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang='pt-br' suppressHydrationWarning>
        <body className={'antialiased dark'}>
          {children}
          <Toaster richColors position='top-right' />
        </body>
      </html>
    </ClerkProvider>
  );
}
