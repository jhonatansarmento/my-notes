# 🚀 Deploy Guide para Vercel

## Passos para Deploy

### 1. Configurar Variáveis de Ambiente na Vercel

No dashboard da Vercel, adicione as seguintes variáveis:

```env
# Database
DATABASE_URL=your_postgresql_connection_string

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_key_here
CLERK_SECRET_KEY=sk_live_your_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/login
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/notes
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/notes
```

### 2. Configurar Banco de Dados

1. Crie um banco PostgreSQL (recomendado: Vercel Postgres, Railway, ou Supabase)
2. Configure a `DATABASE_URL` com a string de conexão
3. Execute as migrations automaticamente no deploy

### 3. Deploy

1. Conecte o repositório GitHub à Vercel
2. A Vercel detectará automaticamente que é um projeto Next.js
3. O build será executado com `prisma generate && next build`
4. As migrations serão aplicadas automaticamente

## Troubleshooting

### Erro "PrismaClientInitializationError"

- Verifique se a `DATABASE_URL` está configurada corretamente
- Teste a conexão com o banco

### Erro "Prisma Client not generated"

- O comando `postinstall` deve resolver isso automaticamente
- Se não resolver, adicione `prisma generate` no script de build

### Erro de Timeout

- Configure `maxDuration: 30` no vercel.json para funções que precisam de mais tempo
