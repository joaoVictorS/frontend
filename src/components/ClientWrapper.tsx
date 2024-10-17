"use client"; // Este componente será um Client Component

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Verifica se estamos nas rotas públicas (login ou register)
  const isPublicPage = pathname === '/login' || pathname === '/register' || pathname === '/reset-password';

  return (
    <>
      {/* Se não estiver em uma página pública, mostre o Header */}
      {!isPublicPage && <Header />}
      
      <main className="flex-grow container mx-auto">
        {children} {/* Conteúdo da página */}
      </main>
      
      {/* Se não estiver em uma página pública, mostre o Footer */}
      {!isPublicPage && <Footer />}
    </>
  );
}
