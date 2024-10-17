import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '@/components/Button';
import Input from '@/components/Input';

const schema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
});

export default function PasswordRecovery() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    // Lógica para recuperação de senha
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input type={''} label="E-mail" {...register('email')} error={errors?.email?.message} />
      <Button type="submit">Enviar link de recuperação</Button>
    </form>
  );
}
