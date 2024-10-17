import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Obter o token JWT da requisição
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Permitir o acesso livre às rotas públicas como login, register, reset-password e rotas da API de autenticação
  if (
    pathname.includes('/api/auth') || 
    pathname === '/login' || 
    pathname === '/register' || 
    pathname === '/reset-password' // Adicionar rota de recuperação de senha como rota pública
  ) {
    return NextResponse.next(); // Permitir a requisição
  }

  // Se o token não existir, redirecionar para o login
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Permitir o acesso às outras rotas protegidas
  return NextResponse.next();
}

// Definir as rotas que o middleware deve proteger
export const config = {
  matcher: [
    '/((?!login|register|reset-password|api|_next/static|_next/image|favicon.ico).*)', // Proteger todas as rotas exceto login, register, reset-password e rotas públicas
  ],
};
