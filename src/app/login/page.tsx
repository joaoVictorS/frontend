"use client";

import { useForm } from 'react-hook-form';
import Input from '@/components/Input';
import Button from '@/components/Button';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log("Login data:", data);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="E-mail" type="email" name="email" {...register('email', { required: 'E-mail é obrigatório' })} />
        <p className="text-red-500">{errors.email?.message}</p>

        <Input label="Senha" type="password" name="password" {...register('password', { required: 'Senha é obrigatória' })} />
        <p className="text-red-500">{errors.password?.message}</p>

        <Button type="submit">Entrar</Button>
      </form>
    </div>
  );
};

export default Login;
