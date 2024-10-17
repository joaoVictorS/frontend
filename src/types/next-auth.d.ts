import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    id: string; // Adiciona a propriedade `id` na sessão
  }
}
