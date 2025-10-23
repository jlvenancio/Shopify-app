# 🔧 Setup Guide - CartPro

## Configuração Completa Passo a Passo

### ✅ Já Concluído

- [x] Instalação do Node.js e npm
- [x] Instalação do Shopify CLI
- [x] Instalação das dependências do projeto
- [x] Geração do SESSION_SECRET

---

## 📝 Próximos Passos

### 1️⃣ Criar App na Shopify Partners (5 minutos)

#### a) Acesse o Shopify Partners Dashboard
👉 https://partners.shopify.com/

#### b) Crie um Novo App
1. No menu lateral, clique em **"Apps"**
2. Clique no botão **"Create app"**
3. Escolha **"Create app manually"**

#### c) Preencha as Informações Básicas
- **App name**: `CartPro` (ou o nome que preferir)
- **App type**: Escolha **"Public app"** (para publicar futuramente) ou **"Custom app"** (apenas para sua loja)

#### d) Configure a App URL
**IMPORTANTE**: Como estamos em desenvolvimento local, você tem duas opções:

**Opção A - Desenvolvimento Local (Recomendado para começar)**
```
App URL: http://localhost:3000
```

**Opção B - Usando Ngrok/Cloudflare Tunnel**
Se quiser acessar de qualquer lugar:
```bash
# Instalar ngrok
npm install -g ngrok

# Iniciar tunnel
ngrok http 3000

# Use a URL fornecida (ex: https://abc123.ngrok.io)
```

#### e) Configure as Redirect URLs
Adicione TODAS estas URLs (substitua `localhost:3000` pela sua URL se usar ngrok):

```
http://localhost:3000/auth/callback
http://localhost:3000/auth/shopify/callback
http://localhost:3000/api/auth/callback
```

Se usar ngrok, adicione também com HTTPS:
```
https://seu-id.ngrok.io/auth/callback
https://seu-id.ngrok.io/auth/shopify/callback
https://seu-id.ngrok.io/api/auth/callback
```

#### f) Copie as Credenciais
Após criar o app, você verá:
- **Client ID** (ou API key)
- **Client secret** (ou API secret key)

⚠️ **IMPORTANTE**: Guarde essas credenciais em local seguro!

---

### 2️⃣ Atualizar o Arquivo .env (2 minutos)

Abra o arquivo `.env` e preencha as credenciais:

```env
# Cole aqui o Client ID
SHOPIFY_API_KEY=seu_client_id_aqui

# Cole aqui o Client Secret
SHOPIFY_API_SECRET=seu_client_secret_aqui

# Se estiver usando localhost
SHOPIFY_APP_URL=http://localhost:3000

# OU se estiver usando ngrok
# SHOPIFY_APP_URL=https://seu-id.ngrok.io
```

---

### 3️⃣ Atualizar shopify.app.toml (1 minuto)

Abra o arquivo `shopify.app.toml` e atualize:

```toml
client_id = "seu_client_id_aqui"
application_url = "http://localhost:3000"  # ou sua URL do ngrok
dev_store_url = "sua-loja.myshopify.com"   # URL da sua dev store
```

---

### 4️⃣ Configurar App Scopes (1 minuto)

No Shopify Partners dashboard:

1. Vá em **"Configuration"** no seu app
2. Na seção **"API access"**, adicione os seguintes scopes:
   - ✅ `read_products`
   - ✅ `write_products`
   - ✅ `read_orders`
   - ✅ `read_customers`
   - ✅ `write_discounts`
   - ✅ `write_cart_transforms` (importante para o cart drawer!)

3. Clique em **"Save"**

---

### 5️⃣ Inicializar o Banco de Dados (1 minuto)

No terminal, execute:

```bash
# Gerar o Prisma Client
npx prisma generate

# Criar o banco de dados
npx prisma db push
```

Você deverá ver:
```
✔ Generated Prisma Client
✔ Database synchronized with Prisma schema
```

---

### 6️⃣ Iniciar o Servidor de Desenvolvimento (30 segundos)

```bash
npm run dev
```

Você deverá ver algo como:
```
 REMIX DEV SERVER started
  Local:   http://localhost:3000/
```

---

### 7️⃣ Instalar o App na Dev Store (3 minutos)

#### Opção A - Pelo Partners Dashboard (Mais Fácil)

1. No Partners dashboard, abra seu app
2. Clique em **"Test on development store"**
3. Selecione sua development store
4. Clique em **"Install app"**

#### Opção B - Pela URL Direta

Abra no navegador:
```
https://sua-loja.myshopify.com/admin/oauth/install_custom_app?client_id=SEU_CLIENT_ID
```

Substitua:
- `sua-loja` pelo nome da sua dev store
- `SEU_CLIENT_ID` pelo seu Client ID

#### Autorizar o App

1. Você será redirecionado para uma página de autorização
2. Revise as permissões solicitadas
3. Clique em **"Install app"**
4. Aguarde o redirecionamento para o dashboard do app

---

### 8️⃣ Ativar a Theme Extension (2 minutos)

1. No admin da sua dev store, vá em:
   **Online Store → Themes**

2. No seu tema ativo, clique em **"Customize"**

3. No Theme Editor:
   - Clique no ícone de **"App embeds"** (canto inferior esquerdo)
   - Procure por **"CartPro Drawer"**
   - Ative o toggle ✅
   - Clique em **"Save"** no topo direito

---

### 9️⃣ Testar o Cart Drawer! 🎉

1. Abra sua storefront (loja)
2. Adicione qualquer produto ao carrinho
3. O cart drawer deve aparecer automaticamente! 🛒

#### Teste Todas as Funcionalidades:

- [ ] Cart drawer abre ao adicionar produto
- [ ] Produtos aparecem no drawer
- [ ] Consegue mudar quantidade (+/-)
- [ ] Consegue remover items
- [ ] Subtotal atualiza corretamente
- [ ] Botão "Checkout" redireciona
- [ ] Free shipping bar aparece (se habilitado)
- [ ] Upsells aparecem (se habilitado)
- [ ] Timer aparece (se habilitado)
- [ ] Design está personalizado

---

## 🎨 Personalizar o Cart Drawer

### No Theme Editor (Visual)

1. Online Store → Themes → Customize
2. Clique no bloco **CartPro** no theme editor
3. Ajuste as configurações:
   - Posição (esquerda/direita)
   - Largura
   - Cores
   - Mensagens

### No App Dashboard (Avançado)

1. Abra o app CartPro no admin
2. Vá em **Settings**
3. Configure opções avançadas:
   - Design do drawer
   - Threshold de frete grátis
   - Regras de upsell
   - Countdown timer

---

## 🐛 Troubleshooting

### ❌ "Error: Missing API key"
- Verifique se o `.env` tem `SHOPIFY_API_KEY` preenchido
- Reinicie o servidor após mudar o `.env`

### ❌ "OAuth error: Invalid redirect_uri"
- Verifique se as redirect URLs no Partners dashboard estão EXATAMENTE iguais
- Certifique-se de incluir http:// ou https://

### ❌ "Cart drawer não abre"
- Verifique se a App Embed está ativada no theme editor
- Abra o console do navegador (F12) e procure por erros
- Verifique se os assets estão carregando (cart-drawer.js e cart-drawer.css)

### ❌ "Database error"
- Execute `npx prisma db push` novamente
- Se persistir, delete o arquivo `dev.db` e rode novamente

### ❌ "Port 3000 already in use"
- Mate o processo na porta 3000: `lsof -ti:3000 | xargs kill`
- Ou mude a porta no `.env`: `PORT=3001`

### ❌ "Cannot connect to Shopify"
- Verifique sua conexão de internet
- Verifique se o `SHOPIFY_APP_URL` está correto
- Se usar ngrok, certifique-se que está rodando

---

## 📊 Checklist de Setup Completo

### Pré-requisitos
- [ ] Node.js instalado
- [ ] npm instalado
- [ ] Shopify CLI instalado
- [ ] Conta Shopify Partners criada
- [ ] Development store criada

### Configuração
- [ ] Dependências instaladas (`npm install`)
- [ ] App criada no Partners dashboard
- [ ] `.env` configurado com credenciais
- [ ] `shopify.app.toml` atualizado
- [ ] Banco de dados inicializado (`npx prisma db push`)

### Instalação
- [ ] Servidor dev rodando (`npm run dev`)
- [ ] App instalado na dev store
- [ ] Theme extension ativada
- [ ] Cart drawer testado e funcionando

### Personalização
- [ ] Cores personalizadas
- [ ] Posição do drawer configurada
- [ ] Free shipping threshold definido
- [ ] Upsells configurados

---

## 🎯 Próximos Passos Após Setup

1. **Customize o Design**
   - Ajuste cores para combinar com sua marca
   - Configure mensagens personalizadas
   - Teste diferentes layouts

2. **Configure Upsells**
   - Defina produtos relacionados
   - Crie regras de recomendação
   - Teste conversões

3. **Monitore Analytics**
   - Acompanhe conversões
   - Analise cart abandonment
   - Otimize baseado em dados

4. **Prepare para Produção**
   - Escolha serviço de hosting (Railway, Render)
   - Configure PostgreSQL
   - Faça deploy
   - Teste em loja real

---

## 📚 Recursos Úteis

- [Documentação Shopify Apps](https://shopify.dev/docs/apps)
- [Remix Docs](https://remix.run/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Shopify Polaris](https://polaris.shopify.com/)

---

**🎉 Parabéns! Seu ambiente está configurado e pronto para desenvolver!**

Precisa de ajuda? Consulte o README.md ou crie uma issue no repositório.
