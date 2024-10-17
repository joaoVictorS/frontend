# Cadastro e Login com Next.js

Este é um projeto desenvolvido com **Next.js** e **TypeScript**, que implementa um sistema de autenticação de usuários com cadastro, login, recuperação de senha e persistência de dados no **Local Storage**.

## Funcionalidades Principais

- **Cadastro de Usuários**: Os dados de cadastro são validados utilizando **Yup** e armazenados no Local Storage.

- **Login de Usuários**: O login é verificado com base nos usuários armazenados no Local Storage. Após o login, o nome do usuário é exibido na página inicial.

- **Recuperação de Senha**: Permite que o usuário solicite a redefinição de senha.

- **Armazenamento no Local Storage**: Todos os dados de cadastro, incluindo nome, email e senha, são salvos localmente no navegador do usuário.

- **Autenticação com JWT**: A autenticação é gerenciada utilizando **NextAuth.js** com a estratégia de sessão JWT.

- **Componentização**: Todos os elementos visuais, como inputs, botões e modais, são componentizados para fácil reutilização e manutenção.

## Tecnologias e Bibliotecas

- **Next.js**: O framework React utilizado para SSR (Server-Side Rendering) e a estrutura do projeto.

- **TypeScript**: Para garantir uma tipagem estática e prevenir erros no desenvolvimento.

- **React Hook Form**: Para gerenciar o estado dos formulários e facilitar a manipulação de inputs.

- **Yup**: Para validação de formulários.

- **NextAuth.js**: Para gerenciar a autenticação e sessão de usuários com JWT.

- **React-Toastify**: Para exibir notificações amigáveis ao usuário durante o fluxo de login e cadastro.

- **Tanstack Table (React Table)**: Para exibir e manipular os dados de usuários em formato de tabela.

- **Tailwind CSS**: Para estilização responsiva e utilitária.

## Como o Projeto Funciona

### Cadastro de Usuários

Na página de **Cadastro**, o usuário insere seu nome, e-mail, senha e dados de endereço (CEP, rua, bairro, número, cidade e estado). O **CEP** é validado e utilizado para preencher automaticamente os campos de endereço através de uma API de CEP.

Todos os dados inseridos no cadastro são validados usando a biblioteca **Yup**, que garante que os campos obrigatórios sejam preenchidos corretamente. Se os dados forem válidos, eles são armazenados no **Local Storage** como um array de objetos de usuários.

### Login

O **Login** valida as credenciais do usuário com base nos dados armazenados no **Local Storage**. Se as credenciais estiverem corretas, uma sessão de login é criada usando **NextAuth.js**. O nome do usuário é salvo no Local Storage para ser exibido na página inicial.

### Recuperação de Senha

Na página de **Recuperação de Senha**, o usuário insere o seu e-mail para solicitar a redefinição da senha. Esta funcionalidade não está conectada a um serviço de envio de e-mails real, mas serve como exemplo de fluxo de recuperação de senha.

### Local Storage

- O **Local Storage** é utilizado para armazenar os dados de cadastro dos usuários, garantindo que mesmo após o fechamento do navegador, os dados ainda estejam disponíveis para verificação no próximo login.

- No momento do login, os dados são recuperados do Local Storage e comparados com as credenciais inseridas.

## Configuração do JWT

Para que a autenticação com **NextAuth.js** funcione corretamente, você precisará configurar uma **chave secreta** para gerar os tokens JWT.

1. Gere uma chave secreta segura usando o seguinte comando:

```bash


openssl  rand  -base64  32

inserir  o  conteudo  acima  em  "NEXTAUTH_SECRET"

NEXTAUTH_SECRET=your_generated_secret_here



git  clone  https://github.com/joaoVictorS/frontend.git


cd  frontend


npm  install


npm  run  dev
```

## Deployment

[Clique aqui para acessar o deploy na Vercel](https://frontend-mu-opal.vercel.app/login)
