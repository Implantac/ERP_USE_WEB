# 🏢 ERP USE WEB

Sistema ERP (Enterprise Resource Planning) completo e profissional desenvolvido especificamente para o mercado brasileiro, com foco em conformidade fiscal, gestão integrada e usabilidade moderna.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-22+-green)

## 🎯 Visão Geral

O **ERP USE WEB** é uma solução completa de gestão empresarial que integra todos os processos de negócio em uma única plataforma moderna, segura e escalável. Desenvolvido com as mais recentes tecnologias web, oferece uma experiência fluida tanto para pequenas empresas quanto para grandes corporações.

## ✨ Características Principais

- 🇧🇷 **100% Brasileiro** - Desenvolvido em português com foco nas necessidades do mercado nacional
- 💰 **Moeda Real (R$)** - Todos os valores em Real brasileiro
- 📋 **Conformidade Fiscal** - Preparado para NFe, NFCe, SPED e demais obrigações fiscais
- 🔐 **Segurança LGPD** - Totalmente adequado à Lei Geral de Proteção de Dados
- 📱 **Responsivo** - Interface adaptável para desktop, tablet e mobile
- ⚡ **Performance** - Arquitetura otimizada para alta performance
- 🎨 **UI/UX Moderna** - Interface intuitiva e agradável

## 🧩 Módulos do Sistema

### 📊 Dashboard
- Visão geral do negócio em tempo real
- KPIs e métricas principais
- Gráficos interativos e dashboards personalizáveis

### 👥 CRM (Gestão de Clientes)
- Cadastro completo de clientes
- Histórico de interações
- Gestão de leads e oportunidades
- Cálculo automático de comissões

### 📦 Gestão de Produtos
- Controle de estoque multinível
- Rastreabilidade e lote
- Alertas de estoque mínimo
- Gestão de categorias e unidades

### 💰 Vendas
- Emissão de pedidos de venda
- Gestão de orçamentos
- Controle de status e aprovações
- Integração com estoque e financeiro

### 💳 Financeiro
- Fluxo de caixa preditivo com IA
- Contas a pagar e receber
- Conciliação bancária
- Integração PIX e TEF
- Relatórios financeiros completos

### 🏪 PDV (Ponto de Venda)
- Interface otimizada para touch
- Emissão de NFC-e
- Suporte a múltiplos caixas
- Pagamentos via QR Code e PIX
- Impressão de cupons

### 🏭 Produção
- Planejamento e controle de produção (PCP)
- Ordem de produção
- Controle de consumo de materiais
- Cálculo de custos e produtividade

### 🏢 Ativos Fixos
- Cadastro de ativos
- Depreciação automática
- Controle de manutenções preventivas e corretivas

### 📋 Fiscal
- Emissão de NFe, NFCe, CTe, MDFe
- Integração com SEFAZ
- Cálculos tributários (ICMS, PIS, COFINS, ISS, IPI)
- Geração de SPED Fiscal e Contábil

### 📈 Relatórios e BI
- Business Intelligence integrado
- Relatórios customizáveis
- Exportação em múltiplos formatos
- Análises avançadas

### 👤 Gestão de Usuários
- Controle de acesso baseado em perfis (RBAC)
- Auditoria de ações
- Gestão de permissões

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca UI moderna
- **TypeScript** - Tipagem estática
- **Vite** - Build tool ultra-rápido
- **Tailwind CSS** - Framework CSS utility-first
- **shadcn/ui** - Componentes UI de alta qualidade
- **Radix UI** - Componentes acessíveis
- **TanStack Query** - Gerenciamento de estado servidor
- **Wouter** - Roteamento leve
- **Recharts** - Gráficos e visualizações

### Backend
- **Node.js 22** - Runtime JavaScript
- **Express** - Framework web minimalista
- **TypeScript** - Tipagem estática
- **Supabase** - Backend as a Service
- **PostgreSQL** - Banco de dados relacional

### Infraestrutura
- **Supabase Auth** - Autenticação segura
- **Row Level Security (RLS)** - Segurança em nível de linha
- **RESTful API** - APIs padronizadas

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js 22 ou superior
- Conta no Supabase (gratuita)
- npm ou yarn

### Instalação Rápida

```bash
# 1. Clone o repositório
git clone https://github.com/usesistemas/erp-use-web.git
cd erp-use-web

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas credenciais do Supabase

# 4. Execute o projeto
npm run dev
```

📖 **Para instruções detalhadas de configuração, consulte [SETUP.md](./SETUP.md)**

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Compila para produção
npm start        # Inicia servidor de produção
npm run check    # Verifica tipos TypeScript
npm run db:push  # Sincroniza schema com banco
```

## 📁 Estrutura do Projeto

```
erp-use-web/
├── client/                 # Aplicação Frontend
│   └── src/
│       ├── components/     # Componentes React
│       ├── contexts/       # Contextos (Auth, Theme, etc)
│       ├── hooks/          # Custom Hooks
│       ├── lib/            # Utilitários
│       └── pages/          # Páginas do sistema
├── server/                 # Aplicação Backend
│   ├── index.ts           # Servidor Express
│   ├── routes.ts          # Definição de rotas
│   ├── supabase.ts        # Cliente Supabase
│   └── storage-supabase.ts # Camada de dados
├── shared/                 # Código compartilhado
│   └── schema.ts          # Schemas e tipos
├── supabase/              # Configuração Supabase
│   └── migrations/        # Migrations do banco
└── attached_assets/       # Recursos anexados
```

## 🔐 Segurança

- ✅ Autenticação JWT via Supabase
- ✅ Row Level Security (RLS) habilitado
- ✅ Criptografia AES para dados sensíveis
- ✅ Conformidade com LGPD
- ✅ Proteção contra SQL Injection
- ✅ Validação de dados com Zod
- ✅ HTTPS obrigatório em produção

## 🌐 Integrações

- 🏦 Bancos (PIX, TEF, boletos)
- 🛒 Marketplaces (Mercado Livre, Amazon, Shopify)
- 💳 Gateways de pagamento
- 📧 E-mail (SMTP)
- 📱 SMS e WhatsApp
- 🧾 SEFAZ (NFe, NFCe, CTe, MDFe)
- 📊 APIs RESTful e GraphQL

## 📈 Roadmap

- [ ] Módulo de Recursos Humanos (RH)
- [ ] App Mobile nativo (iOS/Android)
- [ ] Integração com e-commerce
- [ ] IA para previsão de vendas
- [ ] Chatbot de atendimento
- [ ] Multi-empresa (holding)
- [ ] Internacionalização (i18n)

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia nosso guia de contribuição antes de submeter PRs.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato e Suporte

**USE Sistemas**  
📧 E-mail: comercial@usesistemas.com.br  
📱 WhatsApp: +55 (43) 99858-1400  
🌐 Website: [www.usesistemas.com.br](https://www.usesistemas.com.br)

---

<div align="center">
  <p>Desenvolvido com ❤️ pela equipe USE Sistemas</p>
  <p>© 2024 USE Sistemas - Todos os direitos reservados</p>
</div>
