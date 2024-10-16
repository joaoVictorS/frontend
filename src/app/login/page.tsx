"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from '@/components/Input';
import Button from '@/components/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      toast.error('Login falhou! Verifique suas credenciais.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } else {
      toast.success('Login bem-sucedido!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });

      setTimeout(() => {
        router.push('/home');
      }, 2000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-background)]">
      <ToastContainer />

      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
        {/* Lado esquerdo - Create Account */}
        <div className="hidden md:flex md:w-1/2 bg-[var(--color-default-gft)] text-white p-10 items-center justify-center flex-col">
          <h1 className="text-4xl font-bold mb-4">Create Account!</h1>
          <p className="mb-6 text-center">
            To start your journey with us, please register your account.
          </p>
          <button
            className="border border-white py-2 px-6 rounded-full hover:bg-white hover:text-[var(--color-default-gft)] transition"
            onClick={() => router.push('/register')}
          >
            SIGN UP
          </button>
        </div>

        {/* Lado direito - Formulário de Login */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-center mb-6 text-[rgb(31 41 55)]">Welcome Back</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex justify-center">
              <Button
                type="submit"
                className="w-full bg-[rgb(31 41 55)] text-white hover:bg-opacity-90 transition-opacity"
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Login'}
              </Button>
            </div>
          </form>

          {/* Link para Criar Conta */}
          <div className="text-center mt-4">
            <span className="text-gray-500">Don't have an account?</span>
            <button
              onClick={() => router.push('/register')}
              className="text-[rgb(31 41 55)] hover:underline ml-2"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
