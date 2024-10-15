"use client";

import Button from '@/components/Button';

const Home = () => {
  const users = [
    { nome: 'João', email: 'joao@email.com', endereco: 'Rua A, 123, Cidade B, Estado C' },
    { nome: 'Maria', email: 'maria@email.com', endereco: 'Rua X, 456, Cidade Y, Estado Z' },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Lista de Usuários</h1>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nome</th>
            <th className="border px-4 py-2">E-mail</th>
            <th className="border px-4 py-2">Endereço</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{user.nome}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.endereco}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
