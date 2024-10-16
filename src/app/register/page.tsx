"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { cadastroSchema } from '@/utils/validationSchemas'; // Validação com Yup
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { fetchAddressByCep } from '@/services/cepService';
import { useRouter } from 'next/navigation';

// Interface para os dados do formulário
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

const CadastroPage = () => {
  const router = useRouter();

  // Estados para controlar os campos do formulário
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [loadingCep, setLoadingCep] = useState(false);
  const [numero, setNumero] = useState('');

  // Configuração do react-hook-form com yupResolver
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CadastroFormData>({
    resolver: yupResolver(cadastroSchema), // Validações Yup
  });

  // Função de envio do formulário
  const onSubmit = async (data: CadastroFormData) => {
    // Verificação manual de senha e confirmação
    if (data.senha !== data.confirmarSenha) {
      toast.error('As senhas não correspondem!', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
      return;
    }

    toast.success('Cadastro realizado com sucesso!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
    });
  };

  // Função de mudança no CEP
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cepValue = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    setCep(cepValue);

    if (cepValue.length === 8) {
      try {
        setLoadingCep(true);
        const address = await fetchAddressByCep(cepValue);

        if (address.erro) {
          toast.error('CEP inválido!', {
            position: 'top-right',
            autoClose: 3000,
            theme: 'colored',
          });
          return;
        }

        // Atualiza os campos de endereço com os dados retornados
        setRua(address.logradouro || '');
        setBairro(address.bairro || '');
        setCidade(address.localidade || '');
        setEstado(address.uf || '');

        // Atualiza os valores no react-hook-form
        setValue('rua', address.logradouro || '');
        setValue('bairro', address.bairro || '');
        setValue('cidade', address.localidade || '');
        setValue('estado', address.uf || '');
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
      } finally {
        setLoadingCep(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <ToastContainer /> {/* Exibe o Toast */}

      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
        {/* Lado esquerdo - Welcome Back */}
        <div className="hidden md:flex md:w-1/2 bg-[var(--color-default-gft)] text-white p-8 items-center justify-center flex-col">
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="mb-6 text-center">
            To keep connected with us, please login with your personal info
          </p>
          <button
            className="border border-white py-2 px-6 rounded-full hover:bg-white hover:text-[var(--color-default-gft)] transition"
            onClick={() => router.push('/login')}
          >
            SIGN IN
          </button>
        </div>

        {/* Lado direito - Formulário de Cadastro */}
        <div className="w-full md:w-1/2 p-5 md:p-10">
          <h2 className="text-3xl font-bold text-center mb-4 text-[rgb(31 41 55)]">Create Account</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <Input
              label="Nome Completo"
              type="text"
              {...register('nome')}
            />
            <p className="text-red-500 text-sm">{errors.nome?.message}</p>

            <Input
              label="E-mail"
              type="email"
              {...register('email')}
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  label="Senha"
                  type="password"
                  {...register('senha')}
                />
                <p className="text-red-500 text-sm">{errors.senha?.message}</p>
              </div>
              <div>
                <Input
                  label="Confirmar Senha"
                  type="password"
                  {...register('confirmarSenha')}
                />
                <p className="text-red-500 text-sm">{errors.confirmarSenha?.message}</p>
              </div>
            </div>

            <Input
              label="CEP"
              type="text"
              value={cep} // Controlado pelo estado
              onChange={handleCepChange}
            />
            {loadingCep && <p className="text-sm text-blue-500">Buscando CEP...</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Rua"
                type="text"
                value={rua} // Controlado pelo estado
                onChange={(e) => setRua(e.target.value)}
              />
              <Input
                label="Bairro"
                type="text"
                value={bairro} // Controlado pelo estado
                onChange={(e) => setBairro(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Número"
                type="text"
                value={numero} // Controlado pelo estado
                onChange={(e) => setNumero(e.target.value)}
              />
              <Input
                label="Cidade"
                type="text"
                value={cidade} // Controlado pelo estado
                onChange={(e) => setCidade(e.target.value)}
              />
              <Input
                label="Estado"
                type="text"
                value={estado} // Controlado pelo estado
                onChange={(e) => setEstado(e.target.value)}
              />
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                className="w-full md:w-96 bg-[rgb(31 41 55)] text-white hover:bg-opacity-90 transition-opacity"
              >
                Sign Up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CadastroPage;
