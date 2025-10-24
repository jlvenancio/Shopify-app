# 🚀 Get Started - CartPro

## ⚡ Setup Super Rápido (5 minutos)

### 1️⃣ Clonar
```bash
git clone https://github.com/jlvenancio/Shopify-app.git
cd Shopify-app/cartpro-app
```

### 2️⃣ Instalar
```bash
npm install
```

### 3️⃣ Configurar
```bash
cp .env.example .env
# Edite .env e adicione suas credenciais Shopify
```

### 4️⃣ Database
```bash
npx prisma generate
npx prisma db push
```

### 5️⃣ Rodar
```bash
npm run dev
```

### 6️⃣ Abrir no VS Code
```bash
code .
# Instale as extensões recomendadas quando solicitado
```

---

## 🔑 Onde Conseguir Credenciais?

1. Acesse: https://partners.shopify.com/
2. Apps → Create app
3. Copie **Client ID** e **Client Secret**
4. Cole no arquivo `.env`:
   ```env
   SHOPIFY_API_KEY=seu_client_id
   SHOPIFY_API_SECRET=seu_client_secret
   ```

---

## 📚 Documentação Completa

| Documento | Para Que Serve |
|-----------|----------------|
| **CLONING_GUIDE.md** | 📥 Como clonar (detalhado) |
| **SETUP_GUIDE.md** | ⚙️ Setup completo passo a passo |
| **QUICK_START.md** | ⚡ Setup rápido (10 min) |
| **VSCODE_GUIDE.md** | 💻 Uso do VS Code |
| **README.md** | 📖 Documentação técnica |
| **PROJECT_PLAN.md** | 💼 Plano de negócio |

---

## 🆘 Problemas?

### Git não encontrado?
→ Instale: https://git-scm.com/

### Node não encontrado?
→ Instale: https://nodejs.org/

### Prisma não funciona?
→ Veja: **PRISMA_SETUP.md**

### Porta 3000 ocupada?
→ Mude no `.env`: `PORT=3001`

---

## ✅ Tudo Funcionando?

Após setup, você deve ter:
- ✅ Servidor rodando em http://localhost:3000
- ✅ VS Code aberto com extensões
- ✅ Sem erros no terminal

**Próximo passo:** Instalar na dev store
→ Veja: **SETUP_GUIDE.md** (seção 7)

---

**Happy Coding! 🎉**
