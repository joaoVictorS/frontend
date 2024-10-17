"use client";

import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'; // Notificações
import 'react-toastify/dist/ReactToastify.css'; // Estilos do toast
import Input from '@/components/Input'; // Componente de Input reutilizável
import Button from '@/components/Button'; // Componente de Botão reutilizável

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulação de envio de e-mail de recuperação de senha
    setTimeout(() => {
      setLoading(false);
      toast.success('E-mail de recuperação enviado!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ToastContainer /> {/* Exibe notificações */}

      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
        {/* Lado esquerdo - Login em vez de Recuperação */}
        <div className="hidden md:flex md:w-1/2 bg-[var(--color-default-gft)] text-white p-10 items-center justify-center flex-col">
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="mb-6 text-center">
            Please log in with your credentials.
          </p>
          <button
            className="border border-white py-2 px-6 rounded-full hover:bg-white hover:text-[var(--color-default-gft)] transition"
            onClick={() => window.location.href = '/login'}
          >
            LOGIN
          </button>
        </div>

        {/* Lado direito - Formulário de Recuperação de Senha */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-center mb-6 text-[rgb(31 41 55)]">Recuperar Senha</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="flex justify-center">
              <Button
                type="submit"
                className="w-full bg-[rgb(31 41 55)] text-white hover:bg-opacity-90 transition-opacity"
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar E-mail de Recuperação'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
