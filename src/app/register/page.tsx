"use client";

import { useState } from 'react';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { fetchAddressByCep } from '@/services/cepService';
import { useRouter } from 'next/navigation';
import { CadastroFormData, FieldErrors } from '@/interfaces/form'; // Importando as interfaces

// Esquema de validação usando Yup
const cadastroSchema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  senha: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('Senha é obrigatória'),
  confirmarSenha: yup
    .string()
    .oneOf([yup.ref('senha'), undefined], 'As senhas devem coincidir')
    .required('Confirmação de senha é obrigatória'),
  cep: yup.string().required('CEP é obrigatório'),
  numero: yup.string().required('Número é obrigatório'),
});

const CadastroPage = () => {
  const router = useRouter();

  // Estados tipados com a interface CadastroFormData
  const [formData, setFormData] = useState<CadastroFormData>({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    cep: '',
    rua: '',
    bairro: '',
    numero: '',
    cidade: '',
    estado: '',
  });

  const [loadingCep, setLoadingCep] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({}); // Tipagem para os erros

  // Função para capturar mudanças nos inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Função de envio do formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await cadastroSchema.validate(formData, { abortEarly: false });
      setErrors({}); // Limpar os erros após validação

      if (formData.senha !== formData.confirmarSenha) {
        toast.error('As senhas não correspondem!', {
          position: 'top-right',
          autoClose: 3000,
          theme: 'colored',
        });
        return;
      }

      // Salvar no Local Storage
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = [...existingUsers, formData];
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      toast.success('Cadastro realizado com sucesso!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });

      // Redirecionar após o cadastro
      router.push('/login');
    } catch (validationErrors: any) {
      const formattedErrors = validationErrors.inner.reduce(
        (acc: FieldErrors, err: any) => ({ ...acc, [err.path]: err.message }),
        {}
      );
      setErrors(formattedErrors);
    }
  };

  // Função para buscar endereço a partir do CEP
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cepValue = e.target.value.replace(/\D/g, '');
    setFormData((prevData) => ({ ...prevData, cep: cepValue }));

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

        setFormData((prevData) => ({
          ...prevData,
          rua: address.logradouro || '',
          bairro: address.bairro || '',
          cidade: address.localidade || '',
          estado: address.uf || '',
        }));
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
        <div className="hidden md:flex md:w-1/2 bg-gray-800 text-white p-8 items-center justify-center flex-col">
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <button
            className="border border-white py-2 px-6 rounded-full hover:bg-white hover:text-gray-800 transition"
            onClick={() => router.push('/login')}
          >
            SIGN IN
          </button>
        </div>

        <div className="w-full md:w-1/2 p-5 md:p-10">
          <h2 className="text-3xl font-bold text-center mb-4">Create Account</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              label="Nome Completo"
              name="nome"
              type="text"
              value={formData.nome}
              onChange={handleInputChange}
              error={errors.nome}
            />

            <Input
              label="E-mail"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Senha"
                name="senha"
                type="password"
                value={formData.senha}
                onChange={handleInputChange}
                error={errors.senha}
              />
              <Input
                label="Confirmar Senha"
                name="confirmarSenha"
                type="password"
                value={formData.confirmarSenha}
                onChange={handleInputChange}
                error={errors.confirmarSenha}
              />
            </div>

            <Input
              label="CEP"
              name="cep"
              type="text"
              value={formData.cep}
              onChange={handleCepChange}
              error={errors.cep}
            />
            {loadingCep && <p className="text-sm text-blue-500">Buscando CEP...</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Rua"
                name="rua"
                type="text"
                value={formData.rua}
                onChange={handleInputChange}
              />
              <Input
                label="Bairro"
                name="bairro"
                type="text"
                value={formData.bairro}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Número"
                name="numero"
                type="text"
                value={formData.numero}
                onChange={handleInputChange}
                error={errors.numero}
              />
              <Input
                label="Cidade"
                name="cidade"
                type="text"
                value={formData.cidade}
                onChange={handleInputChange}
              />
              <Input
                label="Estado"
                name="estado"
                type="text"
                value={formData.estado}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex justify-center">
              <Button type="submit" className="w-full md:w-96 bg-gray-800 text-white hover:bg-opacity-90">
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
