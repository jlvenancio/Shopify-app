# 🧪 Testando o CartPro - Primeiros Passos

## 🎯 Objetivo: Rodar o Projeto e Ver Funcionando!

---

## ✅ PRÉ-REQUISITOS

Você já tem:
- [x] Repositório clonado
- [x] VS Code aberto
- [x] Extensões instaladas

Ótimo! Vamos configurar e rodar!

---

## 🚀 PASSO A PASSO RÁPIDO

### **1️⃣ Abrir Terminal no VS Code**

Pressione `` Ctrl+` `` (ou View → Terminal)

### **2️⃣ Verificar se está na pasta correta**

```bash
# Deve estar em: Shopify-app/cartpro-app
pwd  # Mac/Linux
cd   # Windows

# Se não estiver, navegue:
cd caminho/para/Shopify-app/cartpro-app
```

### **3️⃣ Instalar Dependências**

```bash
npm install
```

**Aguarde:** ~1-2 minutos
**Saída esperada:** `added 741 packages`

### **4️⃣ Configurar Ambiente (Mínimo)**

```bash
# Criar arquivo .env
cp .env.example .env

# No Windows PowerShell:
Copy-Item .env.example .env
```

**Edite o .env:** (pode deixar as credenciais vazias por enquanto para testar)

```env
SHOPIFY_API_KEY=test_key
SHOPIFY_API_SECRET=test_secret
SHOPIFY_APP_URL=http://localhost:3000
SESSION_SECRET=79Ai9MMsmIx9Tkjwi3Veb2bfY6iiUEnzl3tZvKeGHk4=
DATABASE_URL="file:./dev.db"
```

### **5️⃣ Configurar Banco de Dados**

```bash
# Gerar Prisma Client
npx prisma generate

# Criar banco de dados
npx prisma db push
```

**Saída esperada:**
```
✔ Generated Prisma Client
✔ Database synchronized with Prisma schema
```

### **6️⃣ Iniciar Servidor**

```bash
npm run dev
```

**Ou no VS Code:** Pressione `Ctrl+Shift+B`

**Saída esperada:**
```
 REMIX DEV SERVER started
  Local:   http://localhost:3000/
```

### **7️⃣ Abrir no Navegador**

Abra: **http://localhost:3000**

---

## 🎨 O QUE VOCÊ VAI VER

### **1. Página Inicial (http://localhost:3000)**

Você verá uma página do Remix. Pode dar erro de autenticação (normal sem credenciais Shopify), mas mostra que está rodando!

### **2. Estrutura do Projeto no VS Code**

```
cartpro-app/
├── app/                    ✅ Código React/Remix
│   ├── routes/            ✅ Rotas da aplicação
│   ├── db.server.ts       ✅ Prisma
│   └── shopify.server.ts  ✅ Config Shopify
├── extensions/            ✅ Cart Drawer
│   └── cart-drawer/       ✅ Liquid + JS + CSS
├── prisma/                ✅ Database
│   ├── schema.prisma      ✅ Schema
│   └── dev.db            ✅ SQLite (criado)
└── node_modules/          ✅ Dependências
```

### **3. Ver o Código do Cart Drawer**

Abra: `extensions/cart-drawer/assets/cart-drawer.js`

Este é o JavaScript que faz o carrinho funcionar!

---

## 🧪 TESTES RÁPIDOS

### **Teste 1: Servidor Rodando ✅**

```bash
# Terminal deve mostrar:
➜  Local:   http://localhost:3000/
```

### **Teste 2: Hot Reload Funcionando 🔥**

1. Abra: `app/routes/app._index.tsx`
2. Mude algum texto
3. Salve (`Ctrl+S`)
4. Veja a página recarregar automaticamente!

### **Teste 3: TypeScript Funcionando 📘**

1. Abra qualquer arquivo `.tsx`
2. Digite algo errado de propósito
3. Veja o erro aparecer inline (Error Lens)!

### **Teste 4: Prisma Studio 🗄️**

```bash
# Abrir interface do banco
npx prisma studio
```

Abre em: **http://localhost:5555**

Você verá as tabelas:
- Session
- ShopSettings
- UpsellRule
- Analytics

### **Teste 5: Ver Estrutura Visual**

No VS Code:
- `Ctrl+Shift+E` → Ver arquivos
- `Ctrl+Shift+F` → Buscar no projeto
- `Ctrl+P` → Quick open (tente: `app.tsx`)

---

## 🎯 ENTENDENDO A ESTRUTURA

### **Backend (Remix + Shopify)**

| Arquivo | O Que Faz |
|---------|-----------|
| `app/routes/app._index.tsx` | Dashboard principal |
| `app/routes/app.settings.tsx` | Página de configurações |
| `app/shopify.server.ts` | Configuração Shopify OAuth |
| `app/db.server.ts` | Cliente Prisma (banco) |

### **Frontend (Cart Drawer)**

| Arquivo | O Que Faz |
|---------|-----------|
| `extensions/cart-drawer/blocks/cart-drawer.liquid` | Template Liquid |
| `extensions/cart-drawer/assets/cart-drawer.js` | JavaScript do carrinho |
| `extensions/cart-drawer/assets/cart-drawer.css` | Estilos do carrinho |

### **Database (Prisma)**

| Arquivo | O Que Faz |
|---------|-----------|
| `prisma/schema.prisma` | Schema do banco |
| `prisma/dev.db` | Banco SQLite (criado automaticamente) |

---

## 🔍 EXPLORANDO O CÓDIGO

### **1. Ver o Dashboard**

Abra: `app/routes/app._index.tsx`

```typescript
// Linha ~52: Este é o componente principal
export default function Index() {
  const { shop, settings, analytics } = useLoaderData<typeof loader>();

  return (
    <Page title="CartPro Dashboard">
      {/* Dashboard com analytics */}
    </Page>
  );
}
```

### **2. Ver Configurações**

Abra: `app/routes/app.settings.tsx`

```typescript
// Linha ~126: Página de configurações
export default function Settings() {
  // Todos os controles de customização do cart drawer
}
```

### **3. Ver Cart Drawer**

Abra: `extensions/cart-drawer/assets/cart-drawer.js`

```javascript
// Linha ~7: Classe principal do cart drawer
class CartProDrawer {
  constructor() {
    this.drawer = document.getElementById('cartpro-drawer');
    // ... inicialização
  }
}
```

### **4. Ver Schema do Banco**

Abra: `prisma/schema.prisma`

```prisma
// Linha ~29: Configurações da loja
model ShopSettings {
  id                    String   @id @default(cuid())
  shop                  String   @unique
  // ... todas as configurações
}
```

---

## 🎨 TESTAR FUNCIONALIDADES

### **Teste: Format on Save ✨**

1. Abra qualquer arquivo `.tsx` ou `.ts`
2. Bagunce a formatação de propósito
3. Salve (`Ctrl+S`)
4. Código formata automaticamente!

### **Teste: Code Snippets 📝**

1. Crie novo arquivo: `app/routes/test.tsx`
2. Digite: `remix-route` + `Tab`
3. Template completo aparece!

### **Teste: Git Integration 🌳**

1. Pressione `Ctrl+Shift+G`
2. Veja Source Control
3. GitLens mostra "blame" no código

### **Teste: Search Everything 🔍**

1. Pressione `Ctrl+Shift+F`
2. Busque: `CartProDrawer`
3. Vê todos os lugares onde aparece!

---

## 📊 COMANDOS ÚTEIS NO TERMINAL

```bash
# Ver estrutura de pastas
tree -L 2        # Mac/Linux
dir /s /b        # Windows

# Ver processos rodando
ps aux | grep node     # Mac/Linux
tasklist | findstr node  # Windows

# Ver logs do servidor
# (já aparece no terminal onde rodou npm run dev)

# Parar servidor
Ctrl+C

# Limpar terminal
clear    # Mac/Linux
cls      # Windows
```

---

## 🐛 SE ALGO DEU ERRADO

### ❌ **"Cannot find module"**

```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### ❌ **"Port 3000 already in use"**

```bash
# Matar processo
# Mac/Linux:
lsof -ti:3000 | xargs kill

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Ou mudar porta no .env:
PORT=3001
```

### ❌ **"Prisma Client not found"**

```bash
npx prisma generate
```

### ❌ **Página em branco**

- Verifique se o servidor está rodando
- Verifique se não tem erros no terminal
- Tente: http://localhost:3000
- Abra DevTools (F12) e veja erros no Console

### ❌ **TypeScript errors**

```bash
# Verificar tipos
npm run typecheck
```

---

## ✅ CHECKLIST DE SUCESSO

Você conseguiu se:

- [ ] `npm install` rodou sem erros
- [ ] `npx prisma generate` funcionou
- [ ] `npx prisma db push` criou o banco
- [ ] `npm run dev` iniciou o servidor
- [ ] http://localhost:3000 abre (mesmo com erro de auth)
- [ ] Vê a estrutura de arquivos no VS Code
- [ ] Extensões estão funcionando (vê erros inline)
- [ ] Hot reload funciona (muda código, atualiza)
- [ ] Prisma Studio abre (npx prisma studio)

---

## 🎓 PRÓXIMOS PASSOS

Agora que está rodando localmente:

### **Para Testar COM Shopify:**

1. **Criar App na Shopify Partners**
   - Veja: `SETUP_GUIDE.md` (seção 1-4)
   - Conseguir API Key e Secret
   - Preencher no `.env`

2. **Instalar na Dev Store**
   - Veja: `SETUP_GUIDE.md` (seção 7)
   - Testar com loja real

3. **Ativar Cart Drawer**
   - Veja: `SETUP_GUIDE.md` (seção 8)
   - Ver funcionando no storefront

### **Para Continuar Desenvolvendo:**

1. **Explorar o código**
   - Veja: `VSCODE_GUIDE.md`
   - Use atalhos e snippets

2. **Adicionar funcionalidades**
   - Edite arquivos existentes
   - Crie novas rotas
   - Customize o cart drawer

3. **Fazer commits**
   - `Ctrl+Shift+G` → Source Control
   - Stage → Commit → Push

---

## 🎨 EXPLORANDO VISUALMENTE

### **No VS Code:**

1. **File Explorer** (`Ctrl+Shift+E`)
   - Navegue pelos arquivos
   - Veja estrutura do projeto

2. **Search** (`Ctrl+Shift+F`)
   - Busque: `settings`
   - Veja onde é usado

3. **Source Control** (`Ctrl+Shift+G`)
   - Veja histórico de commits
   - Branch atual

4. **Extensions** (`Ctrl+Shift+X`)
   - Veja extensões instaladas
   - 23 extensões ativas!

### **No Navegador:**

1. **http://localhost:3000**
   - Interface principal (se tiver credenciais)

2. **http://localhost:5555**
   - Prisma Studio (banco de dados visual)

3. **DevTools** (F12)
   - Console → Ver logs
   - Network → Ver requisições
   - Elements → Inspecionar HTML

---

## 💡 DICAS PROFISSIONAIS

### **1. Use Múltiplos Terminais**

No VS Code:
- Terminal 1: `npm run dev` (servidor)
- Terminal 2: `npx prisma studio` (banco)
- Terminal 3: comandos git, etc.

**Criar novo:** Clique no `+` no terminal

### **2. Use Breakpoints**

1. Clique ao lado do número da linha
2. Pressione `F5` (Debug mode)
3. Inspecione variáveis!

### **3. Use Command Palette**

`Ctrl+Shift+P` → Acesso a TUDO

### **4. Use Quick Open**

`Ctrl+P` → Digite nome do arquivo

---

## 🎉 PARABÉNS!

Se chegou até aqui, você tem:

✅ **Projeto rodando localmente**
✅ **Ambiente de desenvolvimento configurado**
✅ **VS Code otimizado**
✅ **Banco de dados funcionando**
✅ **Hot reload ativo**
✅ **Pronto para desenvolver!**

---

## 📚 DOCUMENTAÇÃO DE REFERÊNCIA

| O Que Fazer | Ver Documento |
|-------------|---------------|
| Criar app Shopify | SETUP_GUIDE.md |
| Usar VS Code | VSCODE_GUIDE.md |
| Entender arquitetura | README.md |
| Ver plano de negócio | PROJECT_PLAN.md |
| Resolver problemas | PRISMA_SETUP.md |

---

## ❓ DÚVIDAS?

**Me diga:**
- O que apareceu no terminal?
- Conseguiu abrir http://localhost:3000?
- Teve algum erro?
- O que quer explorar?

**Estou aqui para ajudar! 🚀**
