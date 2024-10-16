"use client";

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const Header = () => {
  const { data: session } = useSession(); // Obtém a sessão atual

  return (
    <header className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link href="/">
        <h1 className="text-lg font-bold">Genesys</h1>
      </Link>

      {session ? (
        <div className="flex items-center gap-4">
          <p>Bem-vindo, {session.user?.name}!</p>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })} // Realiza o logout e redireciona para /login
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link href="/login" className="text-white">
          Login
        </Link>
      )}
    </header>
  );
};

export default Header;
