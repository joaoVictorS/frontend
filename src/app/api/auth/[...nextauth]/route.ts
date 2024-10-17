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
        if (credentials) {
          return { id: '1', email: credentials.email }; // 'id' como string
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Adiciona `id` ao token
      }
      return token;
    },
    async session({ session, token }) {
      // Converte `token.id` para string se existir
      session.id = token.id as string; // Usa o campo `id` no token e força a tipagem para string
      return session;
    },
  },
});

export { handler as GET, handler as POST };
