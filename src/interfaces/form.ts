export interface CadastroFormData {
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
    cep: string;
    rua: string;
    bairro: string;
    numero: string;
    cidade: string;
    estado: string;
  }
  
  export interface FieldErrors {
    [key: string]: string | undefined;  
  }
  