"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import PersonCrud from '@/components/PersonCrud'; // Importa o CRUD de pessoas

const HomePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Se o usuário não está autenticado, redireciona para /login
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <p>Carregando...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <PersonCrud />
    </div>
  );
};

export default HomePage;
