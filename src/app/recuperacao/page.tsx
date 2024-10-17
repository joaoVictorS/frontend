"use client";

import { useForm } from 'react-hook-form';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Lógica para recuperação de senha separada do componente de interface
const handlePasswordRecovery = (email: string) => {
  // Simulação de envio de recuperação de senha
  console.log(`Recuperação de senha para: ${email}`);
  toast.success('E-mail de recuperação enviado com sucesso!');
};

const Recuperacao = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: { email: string }) => {
    handlePasswordRecovery(data.email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ToastContainer />

      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Recuperar Senha</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Campo de E-mail */}
          <Input
            label="E-mail"
            type="email"
            {...register('email', { required: 'E-mail é obrigatório' })}
            placeholder="Digite seu e-mail"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>

          {/* Botão Enviar */}
          <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600 transition">
            Enviar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Recuperacao;
