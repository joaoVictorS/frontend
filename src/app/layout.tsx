// src/app/layout.tsx
import './globals.css';
import Providers from '@/components/Providers'; // Importa o Providers para gerenciar Redux e Session
import ClientWrapper from '@/components/ClientWrapper';

export const metadata = {
  title: 'Meu App',
  description: 'Um projeto Next.js para processo seletivo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="flex flex-col min-h-screen">
        <Providers>
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </Providers>
      </body>
    </html>
  );
}
