"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { cadastroSchema } from '@/utils/validationSchemas';
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

const Cadastro = () => {
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [loadingCep, setLoadingCep] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CadastroFormData>({
    resolver: yupResolver(cadastroSchema),
  });

  const onSubmit = (data: CadastroFormData) => {
    console.log("Dados do cadastro:", data);
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cepValue = e.target.value.replace(/\D/g, '');  // Remove caracteres não numéricos
    setCep(cepValue);  // Atualize o estado local do CEP

    if (cepValue.length === 8) {  // Verifica se o CEP tem 8 dígitos
      try {
        setLoadingCep(true);
        const address = await fetchAddressByCep(cepValue);
        
        if (address.erro) {
          console.error("CEP inválido");
          return;
        }

        // Atualiza os estados locais dos campos de endereço
        setRua(address.logradouro || '');
        setBairro(address.bairro || '');
        setCidade(address.localidade || '');
        setEstado(address.uf || '');

        // Sincroniza os campos com o react-hook-form
        setValue('rua', address.logradouro || '');
        setValue('bairro', address.bairro || '');
        setValue('cidade', address.localidade || '');
        setValue('estado', address.uf || '');

        console.log("Campos de endereço atualizados com sucesso!");
      } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
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
          <Input label="Nome Completo" type="text" name="nome" {...register('nome')}  />
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
            <Input
              label="CEP"
              type="text"
              name="cep"
              value={cep}  // Valor controlado localmente
              onChange={handleCepChange}  // Chama handleCepChange ao digitar no campo de CEP
            />
            <p className="text-red-500 text-sm">{errors.cep?.message}</p>
            {loadingCep && <p className="text-sm text-blue-500">Buscando CEP...</p>}
          </div>
          <div className="md:col-span-2">
            <Input
              label="Rua"
              type="text"
              name="rua"
              value={rua}  // Valor controlado localmente
              disabled  // Campo desabilitado, apenas a API pode alterá-lo
            />
            <p className="text-red-500 text-sm">{errors.rua?.message}</p>
          </div>
        </div>

        {/* Bairro e Número */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              label="Bairro"
              type="text"
              name="bairro"
              value={bairro}  // Valor controlado localmente
              disabled  // Campo desabilitado
            />
            <p className="text-red-500 text-sm">{errors.bairro?.message}</p>
          </div>
          <div>
            <Input
              label="Número"
              type="text"
              name="numero"
              {...register('numero')}  // O número é editável
            />
            <p className="text-red-500 text-sm">{errors.numero?.message}</p>
          </div>
        </div>

        {/* Cidade e Estado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              label="Cidade"
              type="text"
              name="cidade"
              value={cidade}  // Valor controlado localmente
              disabled  // Campo desabilitado
            />
            <p className="text-red-500 text-sm">{errors.cidade?.message}</p>
          </div>
          <div>
            <Input
              label="Estado"
              type="text"
              name="estado"
              value={estado}  // Valor controlado localmente
              disabled  // Campo desabilitado
            />
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
