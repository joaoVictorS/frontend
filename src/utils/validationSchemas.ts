import * as yup from 'yup';

export const cadastroSchema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  senha: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('Senha é obrigatória'),
  confirmarSenha: yup.string()
    .oneOf([yup.ref('senha'), null], 'As senhas devem coincidir')
    .required('Confirmação de senha é obrigatória'),
  cep: yup.string().required('CEP é obrigatório'),
  numero: yup.string().required('Número é obrigatório'),
});
