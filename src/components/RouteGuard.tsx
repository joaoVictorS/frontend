"use client";

import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession(); // Obter o status da sessão
  const pathname = usePathname(); // Obter a rota atual
  const router = useRouter();

  // Verifica se estamos em uma página pública (login ou register)
  const isPublicPage = pathname === '/login' || pathname === '/register';

  // Verificar o status da sessão e redirecionar conforme necessário
  useEffect(() => {
    console.log('status:', isPublicPage);
    if (status === 'unauthenticated' && !isPublicPage) {
      // Se o usuário não está autenticado e não está em uma página pública, redirecionar para login
      router.replace('/login'); 
    }

    if (status === 'authenticated' && isPublicPage) {
      // Se o usuário está autenticado e tenta acessar uma página pública (login ou register), redirecionar para a home
      router.replace('/home'); 
    }
  }, [status, pathname, router, isPublicPage]);

  // Exibir um indicador de carregamento enquanto a sessão está sendo verificada
  if (status === 'loading') {
    return <p>Carregando...</p>;
  }

  return (
    <>
      {children} {/* Renderiza o conteúdo normalmente */}
    </>
  );
}
