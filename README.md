🚀 Plataforma de Gestão de Clientes (CRM)

Acesso ao Desafio em:
https://desafioaisolutionsexp.bbigelli.workers.dev/

📋 Sobre o Projeto
Plataforma web completa para gestão de clientes, desenvolvida como parte de um desafio técnico. O sistema oferece autenticação segura, CRUD completo de clientes e configurações de usuário, com foco em usabilidade e boas práticas de desenvolvimento.

🎯 Objetivo
Desenvolver uma aplicação web funcional com estrutura mínima definida, abrangendo desde o planejamento até a publicação, demonstrando capacidade de:

Planejamento e arquitetura de software

Desenvolvimento full-stack com React

Integração com serviços cloud (Supabase)

Publicação em plataformas serverless (Cloudflare Pages)

✨ Funcionalidades
🔐 Autenticação
Cadastro de novos usuários

Login com e-mail e senha

Sessão persistente

Logout seguro

Proteção de rotas (Dashboard privado)

📊 Dashboard
Gestão de Clientes (CRUD completo)

✅ Cadastrar novos clientes

✅ Listar todos os clientes

✅ Editar dados do cliente

✅ Excluir clientes

✅ Status do cliente (Ativo, Inativo, Bloqueado)

✅ Data de cadastro automática

⚙️ Configurações
Editar nome do usuário

Alterar e-mail

Atualizar senha

__________________________________________________________________________________________________________________

🛠️ Tecnologias Utilizadas
Frontend
Tecnologia	Versão	Finalidade
React	18.2.0	Biblioteca principal para construção da UI
Vite	5.0.8	Build tool e dev server rápido
React Router DOM	6.20.0	Gerenciamento de rotas e navegação
Tailwind CSS	3.3.6	Estilização e design system
JavaScript	ES2020+	Linguagem de programação
Backend & Infraestrutura
Tecnologia	Finalidade
Supabase	Backend como serviço (Auth + Banco de Dados)
Supabase Auth	Autenticação de usuários
Supabase Database	PostgreSQL com RLS (Row Level Security)
DevOps & Publicação
Tecnologia	Finalidade
GitHub	Controle de versão e repositório
Cloudflare Pages	Hospedagem e deploy contínuo
Whimsical	Planejamento e wireframes

_______________________________________________________________________________________________________________

📐 Decisões Técnicas
1. Por que React + JavaScript?
✅ Escolha: React com JavaScript (não TypeScript)

Motivação:

Curva de aprendizado: JavaScript puro é mais acessível para quem está começando

Menos complexidade: Sem configuração extra de tipos

Desenvolvimento mais rápido: Não requer compilação de tipos

Comunidade enorme: Milhares de bibliotecas e exemplos disponíveis

Foco no projeto: O objetivo é entregar valor, não aprender sintaxe de TypeScript

Decisão baseada no princípio "o que importa é como você conduz um projeto do zero, não se decorou sintaxe"

2. Por que Vite em vez de Create React App?
✅ Escolha: Vite

Motivação:

Build mais rápido: Hot Module Replacement (HMR) instantâneo

Menos dependências: Mais leve que CRA

Configuração moderna: Suporte nativo a ES Modules

Melhor experiência de desenvolvimento: Start do servidor em milissegundos


3. Por que Tailwind CSS?
✅ Escolha: Tailwind CSS

Motivação:

Desenvolvimento rápido: Classes utilitárias diretamente no HTML

Design consistente: Sistema de design padronizado

Menos arquivos CSS: Não precisamos criar e manter arquivos de estilo separados

Responsivo fácil: Classes como md:flex para mobile-first

Personalizável: Configuração centralizada no tailwind.config.js

___________________________________________________________________________________________________________


🚀 Como Executar o Projeto
Pré-requisitos
Node.js 18+

npm 10+

Conta no Supabase (gratuita)

Configuração
Clone o repositório
git clone https://github.com/bbigelli/DesafioAISolutionsEXP
cd desafio

Instale as dependências
npm install

Configure as variáveis de ambiente
Crie um arquivo .env na raiz:
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima

Execute o projeto
npm run dev

Acesse no navegador
http://localhost:5173