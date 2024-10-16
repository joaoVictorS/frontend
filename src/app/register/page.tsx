"use client";

import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { cadastroSchema } from '@/utils/validationSchemas';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { fetchAddressByCep } from '@/services/cepService';
import { useRouter } from 'next/navigation';

const CadastroPage = () => {
  const router = useRouter();

  // Estados para controlar os campos do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [loadingCep, setLoadingCep] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
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

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cepValue = e.target.value.replace(/\D/g, '');
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

        // Atualizando os campos de endereço
        setRua(address.logradouro || '');
        setBairro(address.bairro || '');
        setCidade(address.localidade || '');
        setEstado(address.uf || '');
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
      } finally {
        setLoadingCep(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <ToastContainer />

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
          <form onSubmit={onSubmit} className="space-y-3">
            <Input
              label="Nome Completo"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <Input
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  label="Senha"
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>
              <div>
                <Input
                  label="Confirmar Senha"
                  type="password"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                />
              </div>
            </div>

            <Input
              label="CEP"
              type="text"
              value={cep}
              onChange={handleCepChange}
            />
            {loadingCep && <p className="text-sm text-blue-500">Buscando CEP...</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Rua"
                type="text"
                value={rua}
                onChange={(e) => setRua(e.target.value)}
              />
              <Input
                label="Bairro"
                type="text"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Número"
                type="text"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
              <Input
                label="Cidade"
                type="text"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
              <Input
                label="Estado"
                type="text"
                value={estado}
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
