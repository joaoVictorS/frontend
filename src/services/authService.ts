import { signIn } from "next-auth/react";

export const authService = {
    login: async (email: string, password: string) => {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const user = storedUsers.find(
        (u: any) => u.email === email && u.senha === password
      );
  
      if (!user) {
        throw new Error('Credenciais inválidas');
      }
  
      const res = await signIn('credentials', {
        redirect: false,
        email: user.email,
        password: user.senha,
      });
  
      if (res?.error) {
        throw new Error(res.error);
      }
  
      // Salvando nome do usuário no Local Storage
      localStorage.setItem('loggedInUserName', user.nome);
      return user.nome;
    },
  };
  