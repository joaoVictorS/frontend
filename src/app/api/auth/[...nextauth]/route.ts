import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        // Validação do usuário não precisa ser feita aqui. Deixe o cliente cuidar disso.
        // Apenas retorne um valor estático ou null se não passar, para o NextAuth funcionar
        return { id: 1, email: credentials?.email }; // Retornar um mock válido
      },
    }),
  ],
  pages: {
    signIn: '/login', // Página de login personalizada
  },
  session: {
    strategy: 'jwt', // Sessão gerenciada com JWT
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Adiciona ID do usuário ao token
      }
      return token;
    },
    async session({ session, token }) {
      session.id = token.id; // Passa o ID do token para a sessão
      return session;
    },
  },
});

export { handler as GET, handler as POST };
