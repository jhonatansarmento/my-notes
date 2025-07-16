import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import './globals.css';

// PrimeReact imports
import { dark } from '@clerk/themes';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';

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
        <body className={'antialiased'}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
