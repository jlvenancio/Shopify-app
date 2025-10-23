# 💻 Guia Completo de Uso do VS Code - CartPro

## 🚀 Configuração Inicial

### 1️⃣ Abrir o Projeto no VS Code

```bash
# Opção 1: Pelo terminal
cd cartpro-app
code .

# Opção 2: No VS Code
File → Open Folder → Selecione cartpro-app
```

### 2️⃣ Instalar Extensões Recomendadas

Quando abrir o projeto, o VS Code vai mostrar uma notificação:
**"This workspace has extension recommendations"**

Clique em **"Install All"** ou:

1. Pressione `Ctrl+Shift+P` (ou `Cmd+Shift+P` no Mac)
2. Digite: `Extensions: Show Recommended Extensions`
3. Instale todas as extensões recomendadas

#### 📦 Extensões Essenciais Incluídas:

| Extensão | Função |
|----------|--------|
| **ESLint** | Linting de código |
| **Prettier** | Formatação automática |
| **Prisma** | Suporte para Prisma ORM |
| **Error Lens** | Mostra erros inline |
| **GitLens** | Git superpowers |
| **Shopify Theme Check** | Validação de Liquid |
| **TODO Tree** | Visualizar TODOs |
| **Path Intellisense** | Autocomplete de caminhos |

### 3️⃣ Configurações Automáticas

As seguintes configurações já estão ativas:

✅ **Format on Save** - Código formatado ao salvar
✅ **Auto Save** - Salva quando muda de arquivo
✅ **ESLint Fix** - Corrige erros automaticamente
✅ **Import Organization** - Organiza imports ao salvar
✅ **TypeScript Strict** - Type checking rigoroso

---

## ⌨️ Atalhos de Teclado Úteis

### Navegação

| Atalho | Ação |
|--------|------|
| `Ctrl+P` | Quick Open (abrir arquivo) |
| `Ctrl+Shift+P` | Command Palette |
| `Ctrl+B` | Toggle Sidebar |
| `Ctrl+J` | Toggle Terminal |
| `Ctrl+\`` | Toggle Terminal |
| `Ctrl+Shift+E` | Explorer |
| `Ctrl+Shift+F` | Search |
| `Ctrl+Shift+G` | Source Control (Git) |

### Edição

| Atalho | Ação |
|--------|------|
| `Alt+Up/Down` | Move linha |
| `Shift+Alt+Up/Down` | Duplicar linha |
| `Ctrl+/` | Comentar linha |
| `Ctrl+D` | Selecionar próxima ocorrência |
| `Ctrl+Shift+L` | Selecionar todas ocorrências |
| `F2` | Renomear símbolo |
| `Ctrl+Space` | Trigger suggestions |

### Debugging

| Atalho | Ação |
|--------|------|
| `F5` | Start/Continue debugging |
| `F9` | Toggle breakpoint |
| `F10` | Step over |
| `F11` | Step into |
| `Shift+F11` | Step out |

---

## 🎯 Tasks - Executar Comandos

Pressione `Ctrl+Shift+P` e digite `Tasks: Run Task`

### Tasks Disponíveis:

| Task | Descrição |
|------|-----------|
| 🚀 **Start Dev Server** | Inicia o servidor de desenvolvimento |
| 🔨 **Build** | Build para produção |
| 🗄️ **Prisma Generate** | Gera Prisma Client |
| 📊 **Prisma Studio** | Abre interface visual do banco |
| 🔄 **Prisma Push** | Atualiza schema do banco |
| 🧹 **Lint** | Verifica erros de código |
| 💅 **Format Code** | Formata todo o código |
| 🔍 **Type Check** | Verifica tipos TypeScript |
| ⚡ **Quick Start** | Setup completo automático |

**Atalho Rápido**: `Ctrl+Shift+B` para a task default (Start Dev Server)

---

## 🐛 Debugging

### Configurações de Debug Disponíveis:

#### 1. 🚀 Run Dev Server
Executa o servidor sem debugging

#### 2. 🐛 Debug Dev Server
Executa com debugging completo:
- Breakpoints funcionam
- Inspeção de variáveis
- Call stack disponível

#### 3. 🔍 Attach to Process
Conecta a um processo Node.js já rodando

#### 4. 🗄️ Prisma Studio
Abre o Prisma Studio para visualizar o banco

### Como Usar:

1. **Adicionar Breakpoint**: Clique ao lado do número da linha
2. **Iniciar Debug**: Pressione `F5` ou clique em "Run and Debug"
3. **Escolher Config**: Selecione "🐛 Debug Dev Server"
4. **Inspecionar**: Passe o mouse sobre variáveis para ver valores

---

## 📝 Snippets Personalizados

Snippets para acelerar o desenvolvimento:

### React/Remix

| Snippet | Trigger | Descrição |
|---------|---------|-----------|
| Remix Route | `remix-route` | Route component completo |
| Polaris Page | `polaris-page` | Página com Polaris |
| useState | `us` | React useState |
| useEffect | `ue` | React useEffect |

### API

| Snippet | Trigger | Descrição |
|---------|---------|-----------|
| Fetch API | `fetch-api` | Chamada fetch completa |
| GraphQL | `shopify-gql` | Query GraphQL Shopify |
| Try Catch | `tryc` | Try catch block |
| Async Function | `asf` | Função async com try/catch |

### Prisma

| Snippet | Trigger | Descrição |
|---------|---------|-----------|
| Prisma Model | `prisma-model` | Modelo Prisma completo |

### Utilities

| Snippet | Trigger | Descrição |
|---------|---------|-----------|
| Console Log | `clo` | console.log com label |

### Como Usar:

1. Digite o trigger (ex: `remix-route`)
2. Pressione `Tab`
3. Preencha os campos (use `Tab` para pular)

---

## 🔍 Busca e Navegação

### Buscar Arquivos
- `Ctrl+P` → Digite nome do arquivo
- Exemplo: `app.tsx`, `settings`

### Buscar em Todo o Projeto
- `Ctrl+Shift+F` → Digite termo de busca
- Use regex: ative o botão `.*`

### Ir para Definição
- `F12` ou `Ctrl+Click` → Vai para definição
- `Alt+F12` → Peek Definition (preview)

### Ir para Símbolo
- `Ctrl+Shift+O` → Símbolos no arquivo atual
- `Ctrl+T` → Símbolos em todo workspace

---

## 🎨 Temas e Aparência

O projeto recomenda o **GitHub Theme**, mas você pode escolher:

1. `Ctrl+K Ctrl+T` → Escolher tema
2. Temas recomendados:
   - GitHub Dark
   - Material Theme
   - One Dark Pro

### Ícones

Material Icon Theme já configurado! Ícones bonitos para cada tipo de arquivo.

---

## 📊 Extensões Específicas do Projeto

### Prisma Extension

- **Syntax Highlighting** para arquivos `.prisma`
- **Formatting** automático
- **Linting** de schema
- **Autocomplete**

### Shopify Theme Check

- Validação de código Liquid
- Melhores práticas
- Performance hints

### Error Lens

Mostra erros **inline** no código (muito útil!):
```typescript
const x: number = "hello"; // ⚠️ Type 'string' is not assignable to type 'number'
```

### TODO Tree

Encontra todos os TODOs no projeto:
- `TODO:` → Coisas a fazer
- `FIXME:` → Coisas para corrigir
- `BUG:` → Bugs conhecidos
- `NOTE:` → Notas importantes

Acesse: Barra lateral → TODO Tree icon

---

## 🔧 Terminal Integrado

### Abrir Terminal
- `Ctrl+\`` → Toggle terminal
- `Ctrl+Shift+\`` → Novo terminal

### Comandos Úteis no Terminal

```bash
# Desenvolvimento
npm run dev              # Iniciar servidor
npm run build            # Build produção

# Database
npm run prisma:studio    # Visualizar dados
npm run prisma:generate  # Gerar client
npm run db:setup         # Setup completo

# Manutenção
npm run lint             # Verificar erros
npm run format           # Formatar código
npm run typecheck        # Verificar tipos

# Setup
npm run setup            # Setup automático
npm run fresh            # Reinstalar tudo
```

### Múltiplos Terminais

Você pode ter vários terminais abertos:
1. Terminal 1: `npm run dev` (servidor)
2. Terminal 2: `npm run prisma:studio` (banco)
3. Terminal 3: comandos git, etc.

**Trocar entre terminais**: Dropdown no canto superior direito do terminal

---

## 🌳 Git Integration

### Source Control (Ctrl+Shift+G)

#### Staging Changes
- Clique no `+` ao lado do arquivo para stage
- Ou `Stage All Changes` para todos

#### Commit
1. Digite mensagem do commit
2. `Ctrl+Enter` ou clique em ✓

#### Push/Pull
- Clique nos `...` → Push/Pull
- Ou use status bar (inferior)

### GitLens

Recursos extras:
- **Blame Annotations**: Vê quem modificou cada linha
- **Line History**: Histórico de uma linha
- **File History**: Histórico do arquivo
- **Compare**: Comparar versões

**Ativar Blame**: `Ctrl+Shift+P` → `GitLens: Toggle Line Blame`

---

## 📁 Estrutura do Projeto no Explorer

```
cartpro-app/
├── 📱 app/                    # Remix application
│   ├── routes/               # Rotas do app
│   ├── *.server.ts          # Server-side code
│   └── root.tsx              # Root component
│
├── 🎨 extensions/             # Theme App Extension
│   └── cart-drawer/          # Cart drawer
│       ├── blocks/           # Liquid blocks
│       ├── assets/           # CSS, JS
│       └── snippets/         # Liquid snippets
│
├── 🗄️ prisma/                 # Database
│   └── schema.prisma         # Schema definition
│
├── 📚 docs/                   # Documentação
│
├── 🎭 public/                 # Static assets
│
├── 🔧 .vscode/                # VS Code config
│   ├── settings.json         # Workspace settings
│   ├── extensions.json       # Extensões recomendadas
│   ├── launch.json           # Debug configs
│   ├── tasks.json            # Tasks
│   └── *.code-snippets       # Snippets personalizados
│
└── 📄 Config Files
    ├── .env                  # Environment variables
    ├── package.json          # Dependencies
    ├── tsconfig.json         # TypeScript config
    └── vite.config.ts        # Vite config
```

---

## 🎓 Workflow Recomendado

### Dia a Dia de Desenvolvimento

#### 1. **Abrir VS Code**
```bash
cd cartpro-app
code .
```

#### 2. **Iniciar Servidor**
- Pressione `Ctrl+Shift+B`
- Ou `F5` para debug mode

#### 3. **Desenvolver**
- Edite arquivos
- Salva automaticamente
- Formata ao salvar
- Vê erros inline

#### 4. **Testar**
- Abra http://localhost:3000
- Teste mudanças
- Use breakpoints se necessário

#### 5. **Commit**
- `Ctrl+Shift+G` → Source Control
- Stage changes
- Escreva mensagem
- Commit

---

## 🚨 Troubleshooting

### Extensões Não Funcionando
```bash
# Recarregar window
Ctrl+Shift+P → "Reload Window"
```

### ESLint/Prettier Conflito
Já configurado! Mas se tiver problemas:
```bash
# Reinstalar
npm run fresh
```

### TypeScript Errors
```bash
# Verificar versão
Ctrl+Shift+P → "TypeScript: Select TypeScript Version"
# Escolher: "Use Workspace Version"
```

### Terminal Não Funciona
```bash
# Matar terminal e abrir novo
Clique no ícone de lixeira no terminal
Ctrl+` para abrir novo
```

---

## 💡 Dicas e Truques

### 1. Multi-Cursor
`Alt+Click` em vários lugares → Edite tudo ao mesmo tempo

### 2. Rename Symbol
`F2` em um símbolo → Renomeia em todo o projeto

### 3. Format Document
`Shift+Alt+F` → Formata documento inteiro

### 4. Quick Fix
`Ctrl+.` → Mostra ações rápidas (quick fixes)

### 5. Organize Imports
`Shift+Alt+O` → Organiza e remove imports não usados

### 6. Go to Line
`Ctrl+G` → Ir para linha específica

### 7. Fold/Unfold
`Ctrl+Shift+[` → Fold
`Ctrl+Shift+]` → Unfold

### 8. Zen Mode
`Ctrl+K Z` → Modo sem distrações

---

## 📖 Recursos Adicionais

### VS Code Docs
https://code.visualstudio.com/docs

### Keyboard Shortcuts PDF
`Ctrl+K Ctrl+R` → Abre PDF de atalhos

### Interactive Playground
`Ctrl+Shift+P` → "Interactive Playground"

---

## ✅ Checklist de Setup

- [ ] VS Code instalado
- [ ] Projeto aberto no VS Code
- [ ] Extensões recomendadas instaladas
- [ ] Terminal funcionando
- [ ] ESLint funcionando (vê avisos)
- [ ] Prettier funcionando (formata ao salvar)
- [ ] TypeScript funcionando (vê erros de tipo)
- [ ] Consegue rodar dev server (Ctrl+Shift+B)
- [ ] Git funcionando (Ctrl+Shift+G)
- [ ] Snippets funcionam (teste: `clo` + Tab)

---

## 🎉 Pronto!

Agora você tem um ambiente de desenvolvimento profissional!

**Dúvidas?** Consulte:
- Este guia
- README.md (documentação técnica)
- SETUP_GUIDE.md (setup inicial)

**Bom desenvolvimento! 🚀**
