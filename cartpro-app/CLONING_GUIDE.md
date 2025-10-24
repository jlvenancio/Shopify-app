# 📥 Como Clonar e Configurar o Repositório CartPro

## 🎯 Guia Completo Passo a Passo

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter:

- [ ] **Git instalado** no seu computador
- [ ] **Node.js** instalado (v18 ou superior)
- [ ] **VS Code** instalado (opcional, mas recomendado)
- [ ] Acesso ao repositório (permissões corretas)

---

## 🔍 Passo 1: Encontrar a URL do Repositório

### No GitHub:

1. Vá para o repositório no GitHub
2. Clique no botão verde **"Code"**
3. Você verá a URL do repositório

**Exemplo de URLs:**
```
HTTPS: https://github.com/jlvenancio/Shopify-app.git
SSH:   git@github.com:jlvenancio/Shopify-app.git
```

---

## 💻 Passo 2: Clonar o Repositório

### Método 1: Via Terminal/CMD (Recomendado)

#### No Windows (PowerShell ou CMD):

```powershell
# 1. Abra o PowerShell ou CMD
# 2. Navegue até onde quer clonar (ex: pasta de projetos)
cd C:\Users\SeuUsuario\Projetos

# 3. Clone o repositório
git clone https://github.com/jlvenancio/Shopify-app.git

# 4. Entre na pasta
cd Shopify-app\cartpro-app
```

#### No Mac/Linux (Terminal):

```bash
# 1. Abra o Terminal
# 2. Navegue até onde quer clonar (ex: pasta de projetos)
cd ~/Projetos

# 3. Clone o repositório
git clone https://github.com/jlvenancio/Shopify-app.git

# 4. Entre na pasta
cd Shopify-app/cartpro-app
```

### Método 2: Via VS Code

1. Abra o **VS Code**
2. Pressione `Ctrl+Shift+P` (ou `Cmd+Shift+P` no Mac)
3. Digite: **"Git: Clone"**
4. Cole a URL: `https://github.com/jlvenancio/Shopify-app.git`
5. Escolha a pasta onde quer salvar
6. Clique em **"Open"** quando terminar

### Método 3: Via GitHub Desktop

1. Abra o **GitHub Desktop**
2. File → Clone Repository
3. Cole a URL ou selecione da lista
4. Escolha a pasta local
5. Clique em **"Clone"**

---

## 🔐 Autenticação

### Se for repositório privado:

#### HTTPS (Mais fácil):
- Será pedido usuário e senha
- **Use Personal Access Token** como senha (não a senha da conta!)
- [Criar token aqui](https://github.com/settings/tokens)

#### SSH (Mais seguro):
```bash
# 1. Gerar chave SSH (se não tiver)
ssh-keygen -t ed25519 -C "seu-email@example.com"

# 2. Copiar chave pública
cat ~/.ssh/id_ed25519.pub

# 3. Adicionar no GitHub
# Settings → SSH and GPG keys → New SSH key
# Cole a chave copiada

# 4. Clonar com SSH
git clone git@github.com:jlvenancio/Shopify-app.git
```

---

## ✅ Passo 3: Verificar se Clonou Corretamente

```bash
# Ver estrutura
ls -la

# Deve ver:
# cartpro-app/
# .git/
# README.md (se tiver na raiz)
```

---

## 🔧 Passo 4: Instalar Dependências

```bash
# Entrar na pasta do app
cd cartpro-app

# Instalar dependências
npm install

# Aguardar instalação (pode levar 1-2 minutos)
```

**Saída esperada:**
```
added 741 packages in 45s
```

---

## ⚙️ Passo 5: Configurar Ambiente

### Copiar arquivo de exemplo:

```bash
# Copiar .env.example para .env
cp .env.example .env

# No Windows (PowerShell):
Copy-Item .env.example .env
```

### Editar o arquivo .env:

```bash
# Abrir com VS Code
code .env

# Ou usar qualquer editor de texto
notepad .env    # Windows
nano .env       # Mac/Linux
```

### Preencher as credenciais:

```env
# Preencha estes campos:
SHOPIFY_API_KEY=seu_api_key_aqui
SHOPIFY_API_SECRET=seu_api_secret_aqui
SHOPIFY_APP_URL=http://localhost:3000

# Já está preenchido (gerado automaticamente):
SESSION_SECRET=79Ai9MMsmIx9Tkjwi3Veb2bfY6iiUEnzl3tZvKeGHk4=

# Opcional (seu dev store):
SHOP_CUSTOM_DOMAIN=sua-loja.myshopify.com
```

**Onde conseguir as credenciais?**
→ Veja o arquivo **SETUP_GUIDE.md** (seção "Criar App na Shopify Partners")

---

## 🗄️ Passo 6: Configurar Banco de Dados

```bash
# Gerar Prisma Client
npx prisma generate

# Criar banco de dados
npx prisma db push

# Verificar se funcionou (opcional)
npx prisma studio
```

**Saída esperada:**
```
✔ Generated Prisma Client
✔ Database synchronized with Prisma schema
```

---

## 🚀 Passo 7: Iniciar Servidor de Desenvolvimento

```bash
# Iniciar servidor
npm run dev
```

**Saída esperada:**
```
 REMIX DEV SERVER started
  Local:   http://localhost:3000/
```

---

## 🎉 Passo 8: Abrir no VS Code

```bash
# Abrir projeto no VS Code
code .
```

**No VS Code:**
1. Aparecerá popup: **"This workspace has extension recommendations"**
2. Clique em **"Install All"**
3. Aguarde instalação das 23 extensões

---

## 📊 Estrutura Esperada

Após clonar, você deve ter:

```
Shopify-app/
└── cartpro-app/
    ├── .vscode/              ✅ Configurações VS Code
    ├── app/                  ✅ Código Remix
    ├── extensions/           ✅ Theme App Extension
    ├── prisma/               ✅ Database schema
    ├── public/               ✅ Assets estáticos
    ├── node_modules/         ✅ Dependências (após npm install)
    ├── .env                  ✅ Variáveis (após copiar)
    ├── package.json          ✅ Dependências
    ├── README.md             ✅ Documentação
    └── ... outros arquivos
```

---

## 🚨 Problemas Comuns

### ❌ "git: command not found"

**Solução:** Instalar Git
- Windows: https://git-scm.com/download/win
- Mac: `brew install git`
- Linux: `sudo apt install git`

### ❌ "Permission denied (publickey)"

**Solução:** Configurar SSH ou usar HTTPS
```bash
# Mudar para HTTPS
git remote set-url origin https://github.com/jlvenancio/Shopify-app.git
```

### ❌ "npm: command not found"

**Solução:** Instalar Node.js
- https://nodejs.org/ (versão LTS)

### ❌ "prisma generate" falha

**Solução 1:** Limpar cache
```bash
rm -rf node_modules
npm install
npx prisma generate
```

**Solução 2:** Ignorar checksum
```bash
PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 npx prisma generate
```

### ❌ "Port 3000 already in use"

**Solução:** Matar processo ou mudar porta
```bash
# Matar processo na porta 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill

# Ou mudar porta no .env:
PORT=3001
```

### ❌ ".env not found"

**Solução:** Copiar do exemplo
```bash
cp .env.example .env
```

---

## 📋 Checklist Completo

Após seguir todos os passos:

- [ ] Repositório clonado
- [ ] Pasta `cartpro-app` existe
- [ ] `npm install` executado (node_modules existe)
- [ ] `.env` criado e preenchido
- [ ] `npx prisma generate` executado
- [ ] `npx prisma db push` executado
- [ ] `npm run dev` funciona
- [ ] Servidor abre em http://localhost:3000
- [ ] VS Code aberto com extensões instaladas
- [ ] Git configurado (pode fazer commits)

---

## 🎯 Próximos Passos

Agora que clonou e configurou:

### 1. Criar App na Shopify Partners
→ Leia: **SETUP_GUIDE.md** (seção 1)

### 2. Instalar na Dev Store
→ Leia: **SETUP_GUIDE.md** (seção 7)

### 3. Ativar Theme Extension
→ Leia: **SETUP_GUIDE.md** (seção 8)

### 4. Começar a Desenvolver!
→ Leia: **VSCODE_GUIDE.md** (workflow)

---

## 🔄 Comandos Git Úteis

Depois de clonar, você pode usar:

```bash
# Ver status
git status

# Ver branches
git branch -a

# Mudar de branch
git checkout nome-do-branch

# Atualizar código
git pull

# Ver histórico
git log --oneline

# Ver mudanças
git diff
```

---

## 💡 Dicas Importantes

### 1. **Sempre trabalhe em um branch**
```bash
# Criar novo branch
git checkout -b feature/minha-funcionalidade

# Desenvolver...

# Commit
git add .
git commit -m "feat: minha funcionalidade"

# Push
git push origin feature/minha-funcionalidade
```

### 2. **Mantenha atualizado**
```bash
# Antes de começar a trabalhar
git pull origin main

# Ou se estiver em outro branch
git pull origin nome-do-branch
```

### 3. **Use .env para dados sensíveis**
- ⚠️ **NUNCA** commite o arquivo `.env`
- ⚠️ `.env` está no `.gitignore` (não vai para o Git)
- ✅ Use `.env.example` como template

### 4. **Instale as extensões do VS Code**
- Aumenta produtividade em 10x
- Formata código automaticamente
- Mostra erros antes de rodar

---

## 📚 Documentação de Referência

| Documento | Quando Usar |
|-----------|-------------|
| **SETUP_GUIDE.md** | Setup inicial completo |
| **VSCODE_GUIDE.md** | Uso do VS Code |
| **QUICK_START.md** | Setup rápido (10 min) |
| **README.md** | Documentação técnica |
| **PRISMA_SETUP.md** | Problemas com Prisma |

---

## 🆘 Precisa de Ajuda?

### Erro ao clonar?
1. Verifique se tem acesso ao repositório
2. Verifique credenciais (token ou SSH)
3. Tente com HTTPS primeiro

### Erro ao instalar?
1. Verifique se tem Node.js instalado: `node --version`
2. Limpe cache: `npm cache clean --force`
3. Delete `node_modules` e rode `npm install` novamente

### Erro ao rodar?
1. Verifique se `.env` existe e está preenchido
2. Verifique se banco foi criado: `npx prisma db push`
3. Verifique se porta 3000 está livre

---

## ✅ Resumo do Processo

```bash
# 1. Clonar
git clone https://github.com/jlvenancio/Shopify-app.git
cd Shopify-app/cartpro-app

# 2. Instalar
npm install

# 3. Configurar
cp .env.example .env
# Editar .env com credenciais

# 4. Database
npx prisma generate
npx prisma db push

# 5. Rodar
npm run dev

# 6. Abrir VS Code
code .
```

---

## 🎉 Pronto!

Agora você tem o projeto rodando localmente!

**Próximo passo:** Configurar o app na Shopify Partners
→ Veja: **SETUP_GUIDE.md**

**Dúvidas?** Consulte os guias ou me pergunte! 🚀
