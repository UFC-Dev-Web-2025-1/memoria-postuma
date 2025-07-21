# Sistema de Autenticação com Cookies - Memória Póstuma

## 📋 Como Funciona

Este sistema implementa autenticação **SEM BACKEND**, usando apenas cookies do navegador e localStorage para simular um banco de dados.

## 🔄 Fluxo da Aplicação

### 1. **Página de Registro (`/register`)**
- Usuário preenche email e senha
- Dados são "salvos" no `localStorage` (simula banco de dados)
- Após sucesso, redireciona para `/login`
- **Botão Google**: Simula autenticação Google (dados fictícios)

### 2. **Página de Login (`/login`)**
- Usuário insere credenciais
- Sistema verifica no `localStorage`
- Cria sessão no cookie `userSession`
- Após sucesso, redireciona para `/` (home)

### 3. **Página Home (`/`)**
- **Protegida**: Só acessa quem está logado
- Verifica cookie `userSession` automaticamente
- Se não logado → redireciona para `/login`
- Mostra dados do usuário logado
- Botão "Sair" limpa cookie e redireciona

## 🍪 Como Funcionam os Cookies

### Criação da Sessão
```typescript
cookieUtils.setCookie('userSession', JSON.stringify({
  email: "usuario@email.com",
  loginTime: new Date().toISOString(),
  sessionId: "abc123",
  provider: "google" // se login Google
}), 7); // Expira em 7 dias
```

### Verificação da Sessão
```typescript
// Em toda página protegida:
const userData = cookieUtils.getUserData();
if (userData) {
  // Usuário está logado
} else {
  // Redireciona para login
}
```

## 📁 Arquivos Criados

### `src/utils/auth.ts`
- **cookieUtils**: Funções para gerenciar cookies
- **authService**: Simula API de autenticação (login, registro, Google)

### `src/contexts/AuthContext.tsx`
- Context React global para estado de autenticação
- Hook `useAuth()` para acessar dados do usuário

### Páginas Atualizadas
- **`/login`**: Funcionalidade completa com validação
- **`/register`**: Funcionalidade completa com validação
- **`/` (home)**: Página protegida com verificação automática

## 🧪 Como Testar

### 1. **Teste de Registro**
1. Acesse `/register`
2. Preencha email e senha (mín. 6 caracteres)
3. Clique "REGISTRAR" → Aguarde loading → Redireciona para login
4. **OU** clique "ENTRAR COM GOOGLE" → Login automático

### 2. **Teste de Login**
1. Acesse `/login` 
2. Use credenciais cadastradas no registro
3. Clique "ENTRAR" → Aguarde loading → Redireciona para home
4. **OU** clique "ENTRAR COM GOOGLE" → Login automático

### 3. **Teste de Proteção de Rota**
1. Acesse `/` diretamente sem estar logado → Redireciona para login
2. Após login, acesse `/` → Mostra página protegida
3. Clique "Sair" → Limpa sessão e volta para login

## 🔒 Recursos de Segurança

### Validações Implementadas
- ✅ Email e senha obrigatórios
- ✅ Senha mínima de 6 caracteres  
- ✅ Verificação se usuário já existe
- ✅ Proteção automática de rotas
- ✅ Sessão com expiração (7 dias)

### Estados da Interface
- ✅ Loading durante operações
- ✅ Alertas de sucesso/erro
- ✅ Campos desabilitados durante loading
- ✅ Botões desabilitados sem dados

## 💾 Dados Persistidos

### localStorage
- `registeredUsers`: Array com usuários cadastrados
- Persiste entre sessões do navegador
- Simula banco de dados local

### Cookies
- `userSession`: Dados da sessão atual
- Expira automaticamente em 7 dias
- Usado para manter login persistente

## 📱 Fluxo Completo do Protótipo

```
REGISTRO → LOGIN → HOME
    ↓        ↓       ↓
 Salva no  Verifica  Página  
localStorage usuário  protegida
    ↓        ↓       ↓
 Redireciona Cria    Mostra
 para login  cookie  dados
```

## 🚀 Próximos Passos (Opcional)

Para expandir o sistema:
1. **Middleware de autenticação** no Next.js
2. **Proteção de múltiplas rotas**
3. **Perfis de usuário** mais detalhados  
4. **Recuperação de senha** simulada
5. **Tema dark/light** baseado no usuário

---

**✅ Sistema 100% funcional sem necessidade de backend!**
