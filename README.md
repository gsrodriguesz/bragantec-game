# 🎮 Bragantec Game

> Sistema de gamificação interativo para engajar estudantes durante a Bragantec - feira tecnológica do IFSP Bragança Paulista.

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.9-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-5.1.0-000000?style=flat&logo=express)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-5.1.7-003B57?style=flat&logo=sqlite)](https://sqlite.org/)

## 📖 Sobre o Projeto

O **Bragantec Game** é uma plataforma web gamificada desenvolvida para ser apresentada nos laboratórios de informática durante a feira tecnológica Bragantec. O sistema oferece uma experiência interativa onde visitantes podem:

- 🎯 Completar missões explorando diferentes seções
- ⭐ Ganhar XP e subir de nível
- 🪙 Coletar moedas virtuais
- 🎖️ Desbloquear conquistas e badges
- 👤 Personalizar avatar e criar perfil único
- 🏆 Competir no ranking com outros visitantes

## ✨ Funcionalidades

### 🎮 Sistema de Gamificação
- **Sistema de XP e Níveis**: Progresso baseado em ações do usuário
- **Missões Interativas**: 5 missões diferentes com recompensas
- **Sistema de Moedas**: Economia virtual para engajamento
- **Badges e Conquistas**: Reconhecimento por marcos alcançados
- **Mascote Interativo**: Personagem que guia e incentiva o jogador

### 👤 Perfil de Usuário
- **24 Avatares Únicos**: Ampla variedade de personagens
- **Criação de Perfil**: Nome personalizado e avatar escolhido
- **Persistência de Dados**: Progresso salvo permanentemente
- **Histórico de Atividades**: Tracking completo das ações

### 🗄️ Sistema de Persistência
- **Banco de Dados SQLite**: Armazenamento robusto e eficiente
- **API REST**: Backend completo com Express.js
- **Fallback Inteligente**: Sistema híbrido com localStorage
- **Sincronização Automática**: Dados sempre atualizados

### 👮‍♂️ Painel Administrativo
- **Dashboard Completo**: Visualização de todos os usuários
- **Estatísticas em Tempo Real**: Métricas de engajamento
- **Sistema de Filtros**: Busca e ordenação avançada
- **Dados Simulados**: Demonstração com 30 usuários fictícios
- **Gerenciamento de Dados**: Limpeza e backup de informações

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 19.1.1** - Biblioteca principal
- **Vite 7.1.9** - Build tool moderna e rápida
- **CSS Modules** - Estilização componentizada
- **React Router DOM** - Navegação SPA

### Backend
- **Express.js 5.1.0** - Framework web para Node.js
- **SQLite3 5.1.7** - Banco de dados leve e eficiente
- **CORS** - Controle de acesso entre origens

### DevTools
- **ESLint 9.36.0** - Linting e qualidade de código
- **Concurrently** - Execução simultânea de processos

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js 18.0.0 ou superior
- npm ou yarn

### 1. Clone o repositório
```bash
git clone https://github.com/gsrodriguesz/bragantec-game.git
cd bragantec-game
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Execute o sistema completo
```bash
# Inicia frontend + backend simultaneamente
npm run dev:full
```

### Ou execute separadamente:

```bash
# Terminal 1 - Backend (API)
npm run server

# Terminal 2 - Frontend
npm run dev
```

### 4. Acesse a aplicação
- **Frontend**: http://localhost:5173
- **API**: http://localhost:3001
- **Health Check**: http://localhost:3001/api/health

## 🎯 Como Usar

### Para Visitantes
1. **Acesse** a página inicial
2. **Digite seu nome** e **escolha um avatar**
3. **Explore** as diferentes seções do site
4. **Complete missões** para ganhar XP e moedas
5. **Suba de nível** e desbloqueie conquistas

### Para Administradores
1. **Acesse** `/admin` no navegador
2. **Digite a senha**: `bragantec2025`
3. **Visualize** todos os usuários cadastrados
4. **Alterne** entre dados reais e simulados
5. **Gerencie** informações do sistema

## 🏗️ Estrutura do Projeto

```
bragantec/
├── public/                 # Arquivos estáticos
├── server/                 # Backend API
│   ├── server.cjs         # Servidor Express
│   ├── database.cjs       # Controlador SQLite
│   └── bragantec.db       # Banco de dados (auto-gerado)
├── src/
│   ├── Components/        # Componentes React
│   │   ├── AdminPanel/    # Painel administrativo
│   │   ├── GameSystem/    # Sistema de gamificação
│   │   ├── GameUI/        # Interface do jogo
│   │   ├── Header/        # Cabeçalho
│   │   ├── Footer/        # Rodapé
│   │   ├── ItemProjeto/   # Cards de projetos
│   │   └── ItemScratch/   # Cards do Scratch
│   ├── pages/             # Páginas da aplicação
│   │   ├── Homepage/      # Página inicial
│   │   ├── Projetos/      # Galeria de projetos
│   │   ├── Curso/         # Informações do curso
│   │   └── Scratch/       # Atividades Scratch
│   ├── services/          # Serviços e APIs
│   │   └── api.js         # Cliente da API REST
│   └── assets/            # Recursos estáticos
├── package.json           # Dependências e scripts
└── README.md             # Este arquivo
```

## 🎮 Sistema de Missões

| Missão | Descrição | Recompensa |
|--------|-----------|------------|
| 🎉 **Bem-vindo** | Explore a página inicial | 50 XP + 10 moedas |
| 👀 **Explorador** | Visite a seção de projetos | 100 XP + 20 moedas |
| 🎓 **Estudante** | Conheça o curso | 75 XP + 15 moedas |
| 🎨 **Criativo** | Explore o Scratch | 125 XP + 25 moedas |
| 🏆 **Mestre** | Visite todas as seções | 200 XP + 50 moedas |

## 🏆 Sistema de Badges

- 🎉 **Primeira Visita** - Bem-vindo ao sistema
- 👀 **Visualizador** - Abriu um projeto
- 🔍 **Curioso** - Explorou 3 seções diferentes
- 🎓 **Estudioso** - Completou todas as missões
- ⭐ **Nível 5** - Alcançou o nível 5

## 📊 API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/health` | Status da API |
| `GET` | `/api/users` | Listar todos usuários |
| `GET` | `/api/users/:name` | Buscar usuário específico |
| `POST` | `/api/users` | Criar/atualizar usuário |
| `PUT` | `/api/users/:name/activity` | Atualizar última atividade |
| `DELETE` | `/api/users` | Limpar todos os dados |

## 🎨 Design e UX

- **Tipografia**: Comic Sans MS para design amigável
- **Cores**: Gradientes vibrantes e atrativas
- **Responsividade**: Adaptado para mobile e desktop
- **Animações**: Transições suaves e feedback visual
- **Acessibilidade**: Contraste adequado e navegação clara

## 🔒 Segurança

- **Validação de dados** no frontend e backend
- **Sanitização** de inputs do usuário
- **CORS** configurado adequadamente
- **Proteção** do painel administrativo com senha

## 📈 Métricas e Analytics

O painel administrativo oferece:
- Total de usuários cadastrados
- XP total acumulado
- Moedas em circulação
- Atividade dos usuários
- Progresso das missões

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Scripts Disponíveis

```bash
npm run dev          # Inicia apenas o frontend
npm run server       # Inicia apenas o backend
npm run dev:full     # Inicia frontend + backend
npm run build        # Build de produção
npm run preview      # Preview do build
npm run lint         # Verificação de código
```

## 🐛 Troubleshooting

### Problema: API não conecta
**Solução**: Verifique se o servidor backend está rodando na porta 3001

### Problema: Dados não salvam
**Solução**: O sistema usa fallback para localStorage quando a API está indisponível

### Problema: Página em branco
**Solução**: Execute `npm install` e `npm run dev:full`

## 📄 Licença

Este projeto foi desenvolvido para uso educacional durante a Bragantec 2025.

## 👨‍💻 Autor

Desenvolvido para o **IFSP - Instituto Federal de São Paulo - Campus Bragança Paulista**

---

**🎯 Objetivo**: Engajar visitantes da Bragantec através de uma experiência gamificada e educativa.

**🎪 Evento**: Feira tecnológica que apresenta projetos e cursos do IFSP Bragança Paulista.
