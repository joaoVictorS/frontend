"use client";

import { useSession } from 'next-auth/react';

const ProfilePage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') return <p>Carregando...</p>;
  if (status === 'unauthenticated') return <p>Por favor, faça login.</p>;

  return (
    <div>
      <h1>Bem-vindo, {session?.user?.name}!</h1>
      <p>Email: {session?.user?.email}</p>
    </div>
  );
};

export default ProfilePage;
