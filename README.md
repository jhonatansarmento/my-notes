# My Notes

Uma aplicação moderna e intuitiva para gerenciamento de notas pessoais, construída com Next.js 15, Clerk para autenticação e Prisma para banco de dados.

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/username/my-notes)
[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://github.com/username/my-notes)

## Sumário

- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Como rodar](#-como-rodar)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias usadas](#-tecnologias-usadas)
- [Screenshots](#-screenshots)
- [Deploy](#-deploy)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn** (gerenciador de pacotes)
- **PostgreSQL** (banco de dados)
- **Git** (controle de versão)

### Versões recomendadas:

```bash
node --version  # v18.0.0 ou superior
npm --version   # v8.0.0 ou superior
```

## Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/my-notes.git
cd my-notes
```

2. **Instale as dependências:**

```bash
npm install
# ou
yarn install
```

3. **Configure o banco de dados:**

```bash
npx prisma generate
npx prisma db push
```

4. **Execute o seed (opcional):**

```bash
npx prisma db seed
```

## Configuração

1. **Crie o arquivo `.env.local` na raiz do projeto:**

```bash
cp .env.example .env.local
```

2. **Configure as variáveis de ambiente:**

```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/my_notes"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxx

# URLs do Clerk
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Como obter as chaves do Clerk:

1. Acesse [clerk.com](https://clerk.com)
2. Crie uma conta e um novo projeto
3. Vá em **API Keys** no dashboard
4. Copie a **Publishable Key** e **Secret Key**

## Como rodar

### Desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000)

### Build para produção:

```bash
npm run build
npm run start
# ou
yarn build
yarn start
```

### Outros comandos úteis:

```bash
npm run lint        # Executar linting
npx prisma studio   # Abrir Prisma Studio
npx prisma migrate dev # Executar migrações
```

## Estrutura do projeto

```
my-notes/
├── 📂 prisma/              # Configuração do banco de dados
│   ├── schema.prisma       # Schema do Prisma
│   ├── seed.ts            # Dados iniciais
│   └── migrations/        # Migrações do banco
├── 📂 public/             # Arquivos estáticos
├── 📂 src/
│   ├── 📂 app/            # App Router (Next.js 13+)
│   │   ├── 📂 actions/    # Server Actions
│   │   │   ├── add-note/
│   │   │   ├── create-note/
│   │   │   ├── delete-note/
│   │   │   ├── list-notes/
│   │   │   └── toggle-note/
│   │   ├── 📂 login/      # Página de login
│   │   ├── 📂 notes/      # Página de notas
│   │   ├── layout.tsx     # Layout principal
│   │   ├── page.tsx       # Página inicial
│   │   └── globals.css    # Estilos globais
│   ├── 📂 lib/            # Utilitários e configurações
│   │   └── prisma.ts      # Cliente do Prisma
│   └── middleware.ts      # Middleware do Next.js
├── package.json
└── README.md
```

## Funcionalidades

- **Autenticação segura** com Clerk
- **Criar notas** com título e conteúdo
- **Listar todas as notas** do usuário
- **Marcar notas como concluídas**
- **Excluir notas**
- **Sistema de prioridades** (Baixa, Média, Alta)
- **Data de vencimento** para notas
- **Interface responsiva** com Tailwind CSS
- **Atualizações em tempo real**
- **Perfil de usuário** integrado

## 🛠️ Tecnologias usadas

### Frontend:

- **[Next.js 15](https://nextjs.org/)** - Framework React para produção
- **[React 19](https://react.dev/)** - Biblioteca para interfaces de usuário
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitário

### Backend:

- **[Prisma](https://prisma.io/)** - ORM moderno para banco de dados
- **[PostgreSQL](https://postgresql.org/)** - Banco de dados relacional
- **[Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)** - Funções server-side do Next.js

### Autenticação:

- **[Clerk](https://clerk.com/)** - Plataforma de autenticação completa

### Ferramentas de desenvolvimento:

- **[ESLint](https://eslint.org/)** - Linter para JavaScript/TypeScript
- **[PostCSS](https://postcss.org/)** - Ferramenta para transformar CSS

## Deploy

### Deploy no Vercel (Recomendado):

1. **Conecte seu repositório:**

   - Faça push do código para o GitHub
   - Acesse [vercel.com](https://vercel.com)
   - Importe seu repositório

2. **Configure as variáveis de ambiente:**

   - Adicione todas as variáveis do `.env.local`
   - Configure a `DATABASE_URL` para produção

3. **Deploy automático:**
   - O Vercel fará o deploy automaticamente
   - Cada push na branch main gera um novo deploy

### Configuração de banco para produção:

```bash
# Execute as migrações em produção
npx prisma migrate deploy

# Gere o cliente Prisma
npx prisma generate
```

## Contribuição

Contribuições são sempre bem-vindas! Para contribuir:

1. **Fork o projeto**
2. **Crie uma branch para sua feature:**
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
3. **Commit suas mudanças:**
   ```bash
   git commit -m 'feat: adiciona nova funcionalidade'
   ```
4. **Push para a branch:**
   ```bash
   git push origin feature/nova-funcionalidade
   ```
5. **Abra um Pull Request**

### Padrões de commit:

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `style:` formatação
- `refactor:` refatoração de código
- `test:` testes

### Antes de enviar um PR:

- ✅ Execute os testes: `npm run test`
- ✅ Execute o linter: `npm run lint`
- ✅ Verifique se o build está funcionando: `npm run build`

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">

**[⬆ Voltar ao topo](#-my-notes)**

</div>
