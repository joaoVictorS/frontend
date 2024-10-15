"use client";

import { useForm } from 'react-hook-form';
import Input from '@/components/Input';
import Button from '@/components/Button';

const Recuperacao = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log("Recuperação de senha:", data);
    // Lógica de envio de e-mail de recuperação de senha
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Recuperar Senha</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="E-mail" type="email" name="email" {...register('email', { required: 'E-mail é obrigatório' })} />
        <p className="text-red-500">{errors.email?.message}</p>

        <Button type="submit">Enviar</Button>
      </form>
    </div>
  );
};

export default Recuperacao;
