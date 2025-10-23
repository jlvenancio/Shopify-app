# 🔧 Configuração do Prisma - Alternativas

## ⚠️ Problema Atual

O ambiente atual tem restrições de rede que impedem o download dos binários do Prisma.

## ✅ Soluções Alternativas

### Opção 1: Executar no Seu Ambiente Local (RECOMENDADO)

Clone o repositório no seu computador e execute:

```bash
# Clone o repositório
git clone <url-do-repo>
cd cartpro-app

# Instale as dependências
npm install

# Gere o Prisma Client (vai funcionar no seu PC)
npx prisma generate

# Crie o banco de dados
npx prisma db push

# Inicie o servidor
npm run dev
```

### Opção 2: Usar Prisma com SQLite Sem Engine Download

Se estiver em um ambiente offline ou com restrições, você pode:

1. **Ignorar temporariamente o Prisma:**

Crie um arquivo `app/db-mock.server.ts`:

```typescript
// Mock temporário para desenvolvimento sem Prisma
export default {
  session: {
    findUnique: async () => null,
    create: async (data: any) => data,
    update: async (data: any) => data,
    delete: async () => ({}),
  },
  shopSettings: {
    findUnique: async () => ({
      id: "1",
      shop: "test.myshopify.com",
      isActive: true,
      plan: "free",
      drawerPosition: "right",
      drawerWidth: 400,
      primaryColor: "#000000",
      secondaryColor: "#ffffff",
      buttonColor: "#000000",
      textColor: "#000000",
      freeShippingEnabled: true,
      freeShippingThreshold: 50.0,
      freeShippingMessage: "Free shipping on orders over {amount}",
      upsellEnabled: true,
      upsellTitle: "You may also like",
      maxUpsellProducts: 3,
      timerEnabled: false,
      timerDuration: 600,
      timerMessage: "Hurry! Offer ends in",
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    create: async (data: any) => ({ ...data, id: "1", createdAt: new Date(), updatedAt: new Date() }),
    update: async (data: any) => data,
  },
  analytics: {
    findFirst: async () => null,
    create: async (data: any) => data,
  },
  upsellRule: {
    findMany: async () => [],
  },
};
```

E use este mock temporariamente até conseguir rodar no seu ambiente local.

### Opção 3: Usar Docker

Se tiver Docker disponível:

```bash
# Criar Dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

CMD ["npm", "run", "dev"]
```

### Opção 4: Deploy Direto (Para Produção)

Plataformas como Railway, Render e Heroku NÃO têm essas restrições:

**Railway:**
```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway up
```

**Render:**
1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente
3. Deploy automático!

## 🎯 Recomendação

Para continuar o desenvolvimento:

1. **AGORA**: Clone o repo no seu computador local
2. **Configure** o ambiente seguindo o SETUP_GUIDE.md
3. **Desenvolva** localmente (sem restrições de rede)
4. **Commit** suas mudanças
5. **Deploy** em produção quando estiver pronto

## 📝 Comandos para Seu Ambiente Local

Quando rodar no seu PC:

```bash
# 1. Instalar dependências
npm install

# 2. Copiar .env
cp .env.example .env
# Edite o .env com suas credenciais Shopify

# 3. Gerar Prisma Client
npx prisma generate

# 4. Criar banco de dados
npx prisma db push

# 5. Ver o banco (opcional)
npx prisma studio

# 6. Iniciar servidor
npm run dev
```

## 🔍 Verificar se Prisma Funcionou

Após executar `npx prisma generate`, você deve ver:

```
✔ Generated Prisma Client to ./node_modules/@prisma/client
```

E um arquivo `dev.db` será criado na raiz do projeto.

## 🆘 Ainda com Problemas?

Se após rodar no seu PC ainda tiver problemas:

1. Delete `node_modules` e `package-lock.json`
2. Execute `npm install` novamente
3. Tente `npx prisma generate` novamente

---

**Nota**: As restrições de rede são apenas no ambiente de demonstração atual.
No seu computador local ou em servidores de produção, tudo funcionará normalmente!
