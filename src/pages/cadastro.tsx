"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { fetchAddressByCep } from '@/services/cepService';

interface CadastroFormData {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  cep: string;
  rua: string;
  bairro: string;
  numero: string;
  cidade: string;
  estado: string;
}

const cadastroSchema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  senha: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('Senha é obrigatória'),
  confirmarSenha: yup.string()
    .oneOf([yup.ref('senha'), null], 'As senhas devem coincidir')
    .required('Confirmação de senha é obrigatória'),
  cep: yup.string().required('CEP é obrigatório'),
  numero: yup.string().required('Número é obrigatório'),
});

const Cadastro = () => {
  const [loadingCep, setLoadingCep] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CadastroFormData>({
    resolver: yupResolver(cadastroSchema),
  });

  const onSubmit = (data: CadastroFormData) => {
    console.log("Dados do cadastro:", data);
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value;
    if (cep.length === 8) {
      try {
        setLoadingCep(true);
        const address = await fetchAddressByCep(cep);
        setValue('rua', address.logradouro);
        setValue('bairro', address.bairro);
        setValue('cidade', address.localidade);
        setValue('estado', address.uf);
      } catch (error) {
        console.error("Erro ao buscar o CEP");
      } finally {
        setLoadingCep(false);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Cadastro</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Nome Completo */}
        <div>
          <Input label="Nome Completo" type="text" name="nome" {...register('nome')} />
          <p className="text-red-500 text-sm">{errors.nome?.message}</p>
        </div>

        {/* E-mail e Senha */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input label="E-mail" type="email" name="email" {...register('email')} />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>
          <div>
            <Input label="Senha" type="password" name="senha" {...register('senha')} />
            <p className="text-red-500 text-sm">{errors.senha?.message}</p>
          </div>
        </div>

        {/* Confirmar Senha */}
        <div>
          <Input label="Confirmar Senha" type="password" name="confirmarSenha" {...register('confirmarSenha')} />
          <p className="text-red-500 text-sm">{errors.confirmarSenha?.message}</p>
        </div>

        {/* Endereço (CEP, Rua, Número) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Input label="CEP" type="text" name="cep" onChange={handleCepChange} {...register('cep')} />
            <p className="text-red-500 text-sm">{errors.cep?.message}</p>
            {loadingCep && <p className="text-sm text-blue-500">Buscando CEP...</p>}
          </div>
          <div className="md:col-span-2">
            <Input label="Rua" type="text" name="rua" {...register('rua')} />
            <p className="text-red-500 text-sm">{errors.rua?.message}</p>
          </div>
        </div>

        {/* Bairro e Número */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input label="Bairro" type="text" name="bairro" {...register('bairro')} />
            <p className="text-red-500 text-sm">{errors.bairro?.message}</p>
          </div>
          <div>
            <Input label="Número" type="text" name="numero" {...register('numero')} />
            <p className="text-red-500 text-sm">{errors.numero?.message}</p>
          </div>
        </div>

        {/* Cidade e Estado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input label="Cidade" type="text" name="cidade" {...register('cidade')} />
            <p className="text-red-500 text-sm">{errors.cidade?.message}</p>
          </div>
          <div>
            <Input label="Estado" type="text" name="estado" {...register('estado')} />
            <p className="text-red-500 text-sm">{errors.estado?.message}</p>
          </div>
        </div>

        {/* Botão de Enviar */}
        <div className="flex justify-center">
          <Button type="submit" className="w-full md:w-1/2">Cadastrar</Button>
        </div>
      </form>
    </div>
  );
};

export default Cadastro;
