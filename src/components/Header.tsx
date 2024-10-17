"use client";

import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const { data: session } = useSession(); // Obtém a sessão atual
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Verificar se o nome do usuário está no Local Storage
    const storedUserName = localStorage.getItem('loggedInUserName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <header className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link href="/">
        <h1 className="text-lg font-bold">Genesys</h1>
      </Link>

      {/* Verifica se há sessão ou nome no Local Storage */}
      {session || userName ? (
        <div className="flex items-center gap-4">
          <p>Bem-vindo, {session?.user?.name || userName}!</p>
          <button
            onClick={() => {
              // Limpar o local storage e realizar logout
              localStorage.removeItem('loggedInUserName');
              signOut({ callbackUrl: '/login' });
            }}
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
