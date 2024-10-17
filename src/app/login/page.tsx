"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from '@/components/Input';
import Button from '@/components/Button'; // Componente Button
import { authService } from '@/services/authService';
import { LoginState } from '@/interfaces/auth';  // Importando as interfaces

const LoginPage = () => {
  // Estado do formulário de login com a interface LoginState
  const [formData, setFormData] = useState<LoginState>({
    email: '',
    password: '',
    loading: false,
  });

  const router = useRouter();

  // Função para lidar com as alterações de input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Atualiza o campo correto (email ou password)
    }));
  };

  // Função para lidar com o envio do formulário de login
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.loading) return; // Evitar múltiplos cliques

    setFormData((prev) => ({ ...prev, loading: true }));

    try {
      const userName = await authService.login(formData.email, formData.password);

      toast.success(`Bem-vindo, ${userName}!`, {
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
    } catch (error: unknown) {
      const errorMessage = (error instanceof Error) ? error.message : 'Erro ao fazer login!';
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } finally {
      setFormData((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ToastContainer />

      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
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

        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-center mb-6 text-[rgb(31 41 55)]">Welcome Back</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="E-mail"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Senha"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            <div className="flex justify-center">
              <Button
                type="submit"
                className="w-full bg-[rgb(31 41 55)] text-white"
                disabled={formData.loading}
              >
                {formData.loading ? 'Entrando...' : 'Login'}
              </Button>
            </div>

            <div className="text-center mt-4">
              <span
                className="text-[rgb(31 41 55)] hover:underline cursor-pointer"
                onClick={() => router.push('/reset-password')}
              >
                Esqueceu a senha?
              </span>
            </div>
          </form>

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
