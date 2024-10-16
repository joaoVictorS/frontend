import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Obter o token JWT da requisição
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Permitir o acesso às rotas públicas (login, register, API)
  if (
    pathname.includes('/api/auth') || // Permitir rotas de autenticação da API
    pathname === '/login' || // Permitir a página de login
    pathname === '/register' // Permitir a página de registro
  ) {
    return NextResponse.next();
  }

  // Redirecionar para login se o token não for encontrado e estiver tentando acessar uma rota protegida
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Permitir o acesso às outras rotas
  return NextResponse.next();
}

// Define as rotas protegidas
export const config = {
  matcher: [
    '/((?!login|register|api|_next/static|_next/image|favicon.ico).*)', // Proteger todas as rotas exceto login, register e as rotas públicas
  ],
};
