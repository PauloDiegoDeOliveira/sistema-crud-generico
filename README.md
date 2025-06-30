# 🚀 Sistema CRUD Genérico

> **✨ Sistema REALMENTE genérico para criar CRUDs em segundos!**  
> Desenvolvido com React, TypeScript e Tailwind CSS para máxima produtividade

## 🎯 **Para Iniciantes em React**

### 📚 **O que você vai aprender:**
- Como funciona um sistema React moderno
- Como criar componentes reutilizáveis  
- Como usar TypeScript para tipagem
- Como aplicar boas práticas de desenvolvimento
- Como criar CRUDs genéricos e escaláveis

### � **Comentários Explicativos**
Todo o código possui comentários detalhados explicando:
- O que cada arquivo faz
- Como funciona o sistema genérico
- Como personalizar e criar novos CRUDs
- Conceitos de React, TypeScript e arquitetura

---

## �️ **Tecnologias Utilizadas**

### 🎨 **Frontend**
| Tecnologia | Versão | Função |
|------------|--------|---------|
| **React** | 19.1.0 | Biblioteca principal para interface |
| **TypeScript** | 5.8.3 | Tipagem estática para JavaScript |
| **Tailwind CSS** | 3.4.17 | Framework CSS utilitário |
| **Vite** | 7.0.0 | Build tool rápido e moderno |
| **React Router** | 7.6.3 | Roteamento SPA |

### 🎭 **UI e Animações**
| Tecnologia | Versão | Função |
|------------|--------|---------|
| **Framer Motion** | 12.19.2 | Animações e transições |
| **Heroicons** | 2.2.0 | Ícones SVG otimizados |
| **Headless UI** | 2.2.4 | Componentes acessíveis |
| **Recharts** | 3.0.2 | Gráficos interativos |

### 🔧 **Desenvolvimento**
| Tecnologia | Versão | Função |
|------------|--------|---------|
| **ESLint** | 9.29.0 | Linting e qualidade de código |
| **PostCSS** | 8.5.6 | Processamento CSS |
| **React Hook Form** | 7.59.0 | Gerenciamento de formulários |
| **Zod** | 3.25.67 | Validação de schemas |

---

## 🏗️ **Arquitetura do Sistema**

### 📁 **Estrutura Organizada**
```
src/
├── 📱 components/          # Componentes reutilizáveis
│   ├── GenericCRUDPage.tsx    # ⭐ Componente genérico principal
│   ├── layout/                # Layout da aplicação
│   └── ui/                    # Componentes de interface
│
├── 📄 pages/              # Páginas da aplicação
│   ├── Dashboard.tsx          # Página inicial com métricas
│   ├── ProductsPage.tsx       # ⭐ Exemplo perfeito de CRUD
│   └── AgentsPage.tsx         # CRUD de agentes
│
├── 🎣 hooks/              # Custom Hooks React
│   └── useGenericCRUD.ts      # ⭐ Hook genérico que faz a mágica
│
├── 🔧 services/           # Serviços e APIs
│   ├── CRUDService.ts         # ⭐ Classe genérica para qualquer CRUD
│   └── agentService.ts        # Serviço específico de agentes
│
├── 📝 types/              # Definições TypeScript
│   ├── crud.ts                # ⭐ Tipos que tornam tudo genérico
│   └── entities/              # Tipos específicos (Agent, Product)
│
├── ⚙️ configs/            # Configurações dos CRUDs
│   └── entities/              # ⭐ Configurações por entidade
│       └── agentConfig.tsx    # Exemplo de configuração completa
│
├── 📊 data/               # Dados mockados
│   └── mockAgents.ts          # Dados falsos para desenvolvimento
│
└── 🛠️ utils/              # Funções utilitárias (futuro)
```

### 🔄 **Fluxo de Dados**
```
1. 📄 Página (ProductsPage.tsx)
   ↓ usa
2. 🎣 Hook (useGenericCRUD)
   ↓ conecta com
3. 🔧 Serviço (CRUDService)
   ↓ busca dados em
4. 📊 Mock Data ou API Real
   ↓ retorna para
5. 📱 Componente Genérico (GenericCRUDPage)
   ↓ renderiza
6. 🎨 Interface Final
```

---

## ⚡ **Como o Sistema Funciona**

### 🎯 **Conceito Central: Genérico = Configuração**
```typescript
// Você define ISSO:
const config = {
  columns: [
    { key: 'name', label: 'Nome' },
    { key: 'price', label: 'Preço' }
  ],
  filters: [
    { key: 'category', type: 'select' }
  ]
}

// E ganha TODO um CRUD funcionando:
// ✅ Tabela responsiva
// ✅ Filtros dinâmicos  
// ✅ Busca global
// ✅ Paginação
// ✅ Ordenação
// ✅ CRUD completo
```

### 🧩 **Componentes Principais**

#### 1. **CRUDService.ts** - O Motor
```typescript
// Uma classe que funciona para QUALQUER entidade
class CRUDService<T> {
  // Desenvolvimento: usa dados mockados
  // Produção: conecta com API real
}
```

#### 2. **useGenericCRUD.ts** - O Cérebro  
```typescript
// Hook que gerencia TODO o estado:
// - Lista de itens
// - Filtros aplicados
// - Paginação atual
// - Busca ativa
// - Loading states
```

#### 3. **GenericCRUDPage.tsx** - A Interface
```typescript
// Componente que renderiza automaticamente:
// - Header com título
// - Filtros configuráveis
// - Tabela responsiva
// - Paginação completa
```

### 🔧 **Tipos TypeScript**
```typescript
// BaseEntity: interface que TODA entidade deve ter
interface BaseEntity {
  id: string;
  createdAt: string;
}

// CRUDConfig: configuração que define o comportamento
interface CRUDConfig<T> {
  table: { columns: TableColumn<T>[] }
  filters: FilterField<T>[]
  behavior: { enableCreate: boolean }
}
```

---
┌─ BUSINESS LOGIC LAYER ─────┐
│  • Services (CRUD, API)       │
│  • Configs (Entity Setup)     │
│  • Types (Interfaces)         │
└───────────────────────────────┘
           ↕️ (Data Flow)
┌─ DATA LAYER ───────────────┐
│  • Mock Data (Development)    │
│  • API Integration (Future)   │
│  • State Management          │
└───────────────────────────────┘
```

### 📊 Fluxo de Dados (React)

```
1. COMPONENT monta na tela
   ↓
2. HOOK (useGenericCRUD) é chamado
   ↓
3. SERVICE (CRUDService) busca dados
   ↓ 
4. MOCK DATA é retornado (ou API futura)
   ↓
5. STATE é atualizado no componente
   ↓
6. UI re-renderiza com novos dados
```

---

## 🛠️ Tecnologias

### 🎨 **Frontend Framework**
- **React 19** - Biblioteca JavaScript para interfaces
- **TypeScript** - JavaScript com tipagem estática
- **Vite** - Build tool super rápido

### 🎨 **Estilos Visuais**
- **Tailwind CSS** - Framework CSS utility-first
- **@tailwindcss/forms** - Estilos para formulários
- **clsx** - Utilitário para classes condicionais
- **tailwind-merge** - Merge inteligente de classes

### 🚀 **UI e Experiência**
- **@heroicons/react** - Ícones SVG modernos
- **@headlessui/react** - Componentes acessíveis
- **framer-motion** - Animações fluidas
- **react-router-dom** - Roteamento SPA

### 📊 **Data e Formulários**
- **react-hook-form** - Formulários performáticos
- **@hookform/resolvers** - Validações
- **zod** - Schema de validação
- **recharts** - Gráficos responsivos
- **date-fns** - Manipulação de datas

---

## 📁 Estrutura do Projeto

```
sistema-crud-generico/
├── 📁 public/                    # Arquivos estáticos
├── 📁 src/
│   ├── 📁 components/           # Componentes reutilizáveis
│   │   ├── 📁 layout/          # Layout da aplicação
│   │   │   └── MainLayout.tsx   # Layout principal com menu
│   │   ├── 📁 ui/              # Componentes básicos de UI
│   │   │   ├── Button.tsx       # Botão customizado
│   │   │   ├── Table.tsx        # Tabela genérica
│   │   │   └── index.tsx        # Exports dos componentes
│   │   └── 📁 forms/           # ⚠️ VAZIO - Para formulários futuros
│   │
│   ├── 📁 pages/               # Páginas da aplicação
│   │   ├── Dashboard.tsx        # Página inicial com métricas
│   │   └── AgentsPage.tsx       # CRUD de agentes (exemplo)
│   │
│   ├── 📁 hooks/               # Custom Hooks React
│   │   └── useGenericCRUD.ts    # Hook genérico para CRUDs
│   │
│   ├── 📁 services/            # Serviços e APIs
│   │   ├── CRUDService.ts       # Classe genérica para CRUD
│   │   └── agentService.ts      # Serviço específico de agentes
│   │
│   ├── 📁 types/               # Definições TypeScript
│   │   ├── crud.ts              # Types genéricos do CRUD
│   │   └── 📁 entities/        # Types específicos por entidade
│   │       └── agent.ts         # Interface do Agente
│   │
│   ├── 📁 configs/             # Configurações dos CRUDs
│   │   └── 📁 entities/        # Configs por entidade
│   │       └── agentConfig.tsx   # Config completa de agentes
│   │
│   ├── 📁 data/                # Dados mockados
│   │   └── mockAgents.ts        # Dados de exemplo dos agentes
│   │
│   ├── 📁 utils/               # ⚠️ VAZIO - Para utilitários futuros
│   ├── 📁 assets/              # Imagens, ícones, etc.
│   │
│   ├── App.tsx                 # Componente raiz
│   ├── main.tsx                # Entry point da aplicação
│   ├── index.css               # Estilos globais + Tailwind
│   └── reset.css               # Reset CSS
│
├── package.json                # Dependências e scripts
├── tailwind.config.js         # Configuração do Tailwind
├── vite.config.ts             # Configuração do Vite
├── tsconfig.json              # Configuração TypeScript
├── EXECUTAR.md                # Guia de execução
├── executar.ps1               # Script PowerShell
└── README.md                  # Esta documentação
```

### 📂 **Pastas Vazias (Para Uso Futuro)**

- **`components/forms/`** - Para componentes de formulários reutilizáveis
- **`utils/`** - Para funções utilitárias (validações, formatações, etc.)

---

## 📂 Pastas Vazias e Finalidades

### 🎯 **Por que Algumas Pastas Estão Vazias?**

Este projeto segue uma **arquitetura preparada para crescimento**. As pastas vazias são **marcadores estruturais** que indicam onde novos componentes serão adicionados conforme o sistema evolui.

### 📁 `src/components/forms/` - **VAZIA**

#### 🎯 **Finalidade:**
Componentes de formulários reutilizáveis que serão usados em diferentes CRUDs.

#### 📝 **Exemplos de Futuros Componentes:**

```typescript
// FormField.tsx - Campo genérico de formulário
export const FormField: React.FC<FormFieldProps> = ({ 
  label, type, value, onChange, error, placeholder 
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input 
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded-lg"
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

// DatePicker.tsx - Seletor de data avançado
export const DatePicker: React.FC<DatePickerProps> = ({ 
  value, onChange, placeholder 
}) => {
  // Componente de calendário visual
};

// SelectField.tsx - Campo de seleção com busca
export const SelectField: React.FC<SelectProps> = ({ 
  options, value, onChange, searchable 
}) => {
  // Select com funcionalidade de busca
};

// FileUpload.tsx - Upload de arquivos
export const FileUpload: React.FC<UploadProps> = ({ 
  onUpload, accept, maxSize 
}) => {
  // Drag & drop para upload de arquivos
};
```

#### 🚀 **Quando Usar:**
- Quando criar formulários de criação/edição de entidades
- Para campos específicos como upload de imagem, autocomplete, etc.
- Formulários de configuração do sistema

### 📁 `src/utils/` - **VAZIA**

#### 🎯 **Finalidade:**
Funções utilitárias que ajudam em diversas partes do sistema.

#### 📝 **Exemplos de Futuras Funções:**

```typescript
// formatters.ts - Formatação de dados
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const formatPhone = (phone: string): string => {
  return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
};

export const formatCNPJ = (cnpj: string): string => {
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

// validators.ts - Validações
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidCNPJ = (cnpj: string): boolean => {
  // Lógica de validação de CNPJ
  return cnpj.length === 14; // Simplificado
};

// dates.ts - Manipulação de datas
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('pt-BR');
};

export const getDateRange = (days: number): { start: Date, end: Date } => {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - days);
  return { start, end };
};

// api.ts - Helpers para API
export const buildQueryString = (params: Record<string, any>): string => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      query.append(key, String(value));
    }
  });
  return query.toString();
};

// storage.ts - LocalStorage helpers
export const storage = {
  get: (key: string) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  
  set: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }
  },
  
  remove: (key: string) => {
    localStorage.removeItem(key);
  }
};
```

#### 🚀 **Quando Usar:**
- Para formatação de dados (moeda, telefone, CPF/CNPJ)
- Validações de formulários
- Manipulação de datas
- Helpers para localStorage/sessionStorage
- Funções de parsing e transformação de dados

### 🏗️ **Como as Pastas se Relacionam na Arquitetura**

```
📁 components/
├── 📁 forms/          ← Componentes de formulário reutilizáveis
│   ├── FormField.tsx      (Input genérico)
│   ├── DatePicker.tsx     (Calendário)
│   ├── SelectField.tsx    (Select com busca)
│   └── FileUpload.tsx     (Upload de arquivos)
│
├── 📁 layout/         ← Layout da aplicação
│   └── MainLayout.tsx     (Menu + Header)
│
└── 📁 ui/             ← Componentes básicos
    ├── Button.tsx         (Botão customizado)
    └── Table.tsx          (Tabela genérica)

📁 utils/              ← Funções utilitárias
├── formatters.ts          (Formatação de dados)
├── validators.ts          (Validações)
├── dates.ts              (Manipulação de datas)
├── api.ts               (Helpers para API)
└── storage.ts           (LocalStorage helpers)
```

### 🎯 **Fluxo de Desenvolvimento**

#### **1. Desenvolvimento Atual (Mocks)**
```
Pages → Hooks → Services → MockData
```

#### **2. Futuro (Com APIs)**
```
Pages → Hooks → Services → Utils → API
                    ↓
              Forms Components
```

### 🚀 **Próximos Passos para Popular as Pastas**

#### **Phase 1: Formulários**
1. Criar `FormField.tsx` para inputs genéricos
2. Criar `SelectField.tsx` para selects com busca
3. Criar `DatePicker.tsx` para seleção de datas

#### **Phase 2: Utilitários**
1. Criar `formatters.ts` para formatação de dados
2. Criar `validators.ts` para validações
3. Criar `api.ts` para helpers de API

#### **Phase 3: Integração**
1. Integrar formulários com validações
2. Conectar utils com services
3. Migrar de mocks para APIs reais

### 🎨 **Benefícios da Estrutura Preparada**

✅ **Organização Clara**: Cada tipo de código tem seu lugar  
✅ **Escalabilidade**: Fácil adicionar novos componentes  
✅ **Reutilização**: Componentes são naturalmente reutilizáveis  
✅ **Manutenção**: Mudanças ficam isoladas em suas responsabilidades  
✅ **Time**: Novos desenvolvedores sabem onde adicionar código  

> **💡 Lembre-se:** Pastas vazias não são "código morto" - são **preparação inteligente** para o crescimento do projeto!

---

## ⚡ Como Executar

### 🚀 **Execução Rápida**

```bash
# Opção 1: Comando personalizado
npm run test

# Opção 2: Script PowerShell (Windows)
.\executar.ps1

# Opção 3: Comandos tradicionais
npm install    # Primeira vez
npm run dev    # Iniciar servidor
```

### 🌐 **URLs da Aplicação**

- **Dashboard:** http://localhost:5173/
- **Agentes:** http://localhost:5173/agents
- **Relatórios:** http://localhost:5173/reports
- **Configurações:** http://localhost:5173/settings

---

## 🆕 Como Criar um Novo CRUD

> **✨ Sistema REALMENTE genérico!** Você só precisa definir colunas, filtros e está pronto!

### 🎯 **O que você precisa fazer:**
1. **Definir interface** da sua entidade (30 segundos) 
2. **Criar dados mock** (1 minuto)
3. **Configurar colunas e filtros** (2 minutos)
4. **Usar o componente genérico** (30 segundos)

### 🎊 **O que o sistema faz automaticamente:**
- 📊 **Tabela responsiva** com suas colunas
- 🔍 **Busca automática** pelos campos que você escolher
- 🎛️ **Filtros dinâmicos** (text, select, date, etc.)
- 📄 **Paginação completa** com navegação
- ⚡ **Ordenação** por qualquer coluna clicável
- 🎨 **Modo escuro/claro** automático
- 📱 **100% responsivo** (mobile + desktop)

---

### **📋 Exemplo Prático: CRUD de Fornecedores**

#### **1️⃣ Criar Interface (30 segundos)**
```typescript
// src/types/entities/supplier.ts
import type { BaseEntity } from '../crud';

export interface Supplier extends BaseEntity {
  name: string;        // Nome da empresa
  cnpj: string;        // CNPJ
  contact: string;     // Pessoa de contato
  email: string;       // Email
  phone: string;       // Telefone
  category: string;    // Categoria (serviços, produtos, etc.)
  status: 'active' | 'inactive';
}
```

#### **2️⃣ Criar Dados Mock (1 minuto)**
```typescript
// src/data/mockSuppliers.ts
import type { Supplier } from '../types/entities/supplier';

export const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'TechCorp Soluções',
    cnpj: '12.345.678/0001-90',
    contact: 'João Silva',
    email: 'contato@techcorp.com',
    phone: '(11) 99999-0000',
    category: 'tecnologia',
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'ServiCorp Ltda',
    cnpj: '98.765.432/0001-10',
    contact: 'Maria Santos',
    email: 'maria@servicorp.com',
    phone: '(11) 88888-1111',
    category: 'servicos',
    status: 'active',
    createdAt: '2024-02-20T14:30:00Z'
  }
  // ... mais fornecedores
];
```

#### **3️⃣ Configurar CRUD (2 minutos)**
```typescript
// src/configs/entities/supplierConfig.tsx
import type { CRUDConfig } from '../../types/crud';
import type { Supplier } from '../../types/entities/supplier';

export const supplierConfig: CRUDConfig<Supplier> = {
  entity: 'suppliers',
  title: 'Fornecedores',
  
  // 📊 Definir colunas da tabela
  table: {
    columns: [
      { key: 'name', label: 'Empresa', sortable: true },
      { key: 'cnpj', label: 'CNPJ' },
      { key: 'contact', label: 'Contato' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Telefone' },
      { key: 'category', label: 'Categoria' },
      { 
        key: 'status', 
        label: 'Status',
        render: (value) => (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            value === 'active' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {value === 'active' ? '✓ Ativo' : '✗ Inativo'}
          </span>
        )
      }
    ],
    defaultSort: { field: 'name', direction: 'asc' },
    pageSize: 10
  },
  
  // 🔍 Definir filtros
  filters: [
    {
      key: 'category',
      label: 'Categoria',
      type: 'select',
      options: [
        { value: 'tecnologia', label: 'Tecnologia' },
        { value: 'servicos', label: 'Serviços' },
        { value: 'produtos', label: 'Produtos' },
        { value: 'consultoria', label: 'Consultoria' }
      ]
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'active', label: 'Ativo' },
        { value: 'inactive', label: 'Inativo' }
      ]
    }
  ]
};
```

#### **4️⃣ Criar Página (30 segundos)**
```typescript
// src/pages/SuppliersPage.tsx
import { GenericCRUDPage } from '../components/GenericCRUDPage';
import { useGenericCRUD } from '../hooks/useGenericCRUD';
import { CRUDService } from '../services/CRUDService';
import { supplierConfig } from '../configs/entities/supplierConfig';
import { mockSuppliers } from '../data/mockSuppliers';
import type { Supplier } from '../types/entities/supplier';

// Criar serviço (dados mock em desenvolvimento)
const supplierService = new CRUDService<Supplier>('suppliers', mockSuppliers, '', true);

export function SuppliersPage() {
  // Hook genérico que faz toda a mágica
  const crud = useGenericCRUD(supplierService, ['name', 'contact', 'email']);
  
  return (
    <div className="p-6">
      <GenericCRUDPage config={supplierConfig} crud={crud} />
    </div>
  );
}
```

#### **5️⃣ Adicionar ao Menu (15 segundos)**
```typescript
// src/components/layout/MainLayout.tsx
import { BuildingOfficeIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Agentes', href: '/agents', icon: AgentsIcon },
  { name: 'Produtos', href: '/products', icon: ShoppingBagIcon },
  { name: 'Fornecedores', href: '/suppliers', icon: BuildingOfficeIcon }, // ← Adicionar
  { name: 'Relatórios', href: '/reports', icon: ChartBarIcon },
  { name: 'Configurações', href: '/settings', icon: Cog6ToothIcon },
];
```

#### **6️⃣ Adicionar Rota (15 segundos)**
```typescript
// src/App.tsx
import { SuppliersPage } from './pages/SuppliersPage';

<Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/agents" element={<AgentsPage />} />
  <Route path="/products" element={<ProductsPage />} />
  <Route path="/suppliers" element={<SuppliersPage />} /> {/* ← Adicionar */}
  <Route path="/reports" element={<div>Relatórios</div>} />
  <Route path="/settings" element={<div>Configurações</div>} />
</Routes>
```

## 🎊 **Pronto! CRUD Completo em Menos de 5 Minutos!**

**Você acabou de criar um CRUD completo com:**
- ✅ Tabela com todas as colunas definidas
- ✅ Busca automática por nome, contato e email
- ✅ Filtros por categoria e status
- ✅ Paginação automática
- ✅ Ordenação por qualquer coluna
- ✅ Modo escuro/claro automático
- ✅ 100% responsivo (mobile + desktop)
- ✅ Animações suaves
- ✅ Sistema de notificações

### 🔄 **Para Produção: Trocar Mock por API**
```typescript
// src/pages/SuppliersPage.tsx
// Troca apenas uma linha:
const supplierService = new CRUDService<Supplier>('suppliers', [], 'https://api.empresa.com', false);
//                                                            ↑ array vazio    ↑ URL da API    ↑ false = usar API
```

---

### 🎯 **Exemplos Práticos de Outros CRUDs**

#### **CRUD de Clientes**
- Interface: `{ name, email, phone, address, segment, status }`
- Filtros: `segment` (pessoa física/jurídica), `status`
- Busca: `name`, `email`, `phone`

#### **CRUD de Funcionários**
- Interface: `{ name, email, department, role, salary, status }`
- Filtros: `department`, `role`, `status`
- Busca: `name`, `email`, `department`

#### **CRUD de Pedidos**
- Interface: `{ customer, product, quantity, total, status, date }`
- Filtros: `status`, `date` (range), `customer`
- Busca: `customer`, `product`

### 💡 **Dicas para Personalizar**

#### **Colunas com Renderização Personalizada**
```typescript
{
  key: 'price',
  label: 'Preço',
  render: (value) => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}
```

#### **Filtros Avançados**
```typescript
{
  key: 'created_at',
  label: 'Data de Criação',
  type: 'daterange',
  placeholder: 'Selecione o período'
}
```

#### **Busca Personalizada**
```typescript
// No useGenericCRUD, defina os campos de busca
const crud = useGenericCRUD(service, ['name', 'email', 'phone', 'address']);
```

---

export const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'TechCorp Ltda',
    email: 'contato@techcorp.com',
    phone: '(11) 98765-4321',
    cnpj: '12.345.678/0001-90',
    category: 'eletrônicos',
    status: 'active',
    createdAt: '2024-01-15',
    contract_value: 150000
  },
  // ... mais fornecedores
];
```

### 3️⃣ **Criar Configuração do CRUD**

```typescript
// src/configs/entities/supplierConfig.tsx
import type { CRUDConfig } from '../../types/crud';
import type { Supplier } from '../../types/entities/supplier';

export const supplierConfig: CRUDConfig<Supplier> = {
  entity: 'suppliers',           // Nome da entidade
  title: 'Fornecedores',         // Título exibido
  description: 'Gerenciamento de fornecedores',
  
  // 📊 CONFIGURAÇÃO DA TABELA
  table: {
    columns: [
      { key: 'name', label: 'Nome', sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'cnpj', label: 'CNPJ', sortable: false },
      { key: 'category', label: 'Categoria', sortable: true },
      { key: 'status', label: 'Status', sortable: true },
      { key: 'contract_value', label: 'Valor Contrato', sortable: true }
    ]
  },
  
  // 🔍 CONFIGURAÇÃO DOS FILTROS
  filters: [
    {
      key: 'category',
      label: 'Categoria',
      type: 'select',
      options: SUPPLIER_CATEGORIES.map(cat => ({ 
        value: cat, 
        label: cat.charAt(0).toUpperCase() + cat.slice(1) 
      }))
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'active', label: 'Ativo' },
        { value: 'inactive', label: 'Inativo' }
      ]
    },
    {
      key: 'contract_value',
      label: 'Valor Mínimo',
      type: 'number',
      placeholder: 'Ex: 50000'
    },
    {
      key: 'createdAt',
      label: 'Período de Cadastro',
      type: 'daterange'
    }
  ]
};
```

### 4️⃣ **Criar Serviço**

```typescript
// src/services/supplierService.ts
import { CRUDService } from './CRUDService';
import type { Supplier } from '../types/entities/supplier';
import { mockSuppliers } from '../data/mockSuppliers';

// Criar instância do serviço para fornecedores
export const supplierService = new CRUDService<Supplier>(
  'suppliers',      // Nome da entidade
  mockSuppliers,    // Dados mockados
  {},              // Config adicional (opcional)
  true             // Usar mock (true) ou API (false)
);
```

### 5️⃣ **Criar Página do CRUD**

```typescript
// src/pages/SuppliersPage.tsx
import React from 'react';
import { useGenericCRUD } from '../hooks/useGenericCRUD';
import { supplierService } from '../services/supplierService';
import { supplierConfig } from '../configs/entities/supplierConfig';

export const SuppliersPage: React.FC = () => {
  // 🎣 Hook genérico que gerencia todo o CRUD
  const crud = useGenericCRUD(supplierService);
  
  return (
    <GenericCRUDPage 
      config={supplierConfig}  // Configuração da entidade
      crud={crud}              // Estado e ações do CRUD
    />
  );
};
```

### 6️⃣ **Adicionar Rota**

```typescript
// src/App.tsx
import { SuppliersPage } from './pages/SuppliersPage';

// Adicionar no roteamento
<Route path="/suppliers" element={<SuppliersPage />} />
```

### 7️⃣ **Adicionar ao Menu**

```typescript
// src/components/layout/MainLayout.tsx
const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Agentes', href: '/agents', icon: AgentsIcon },
  { name: 'Fornecedores', href: '/suppliers', icon: TruckIcon }, // 👈 NOVO
  { name: 'Relatórios', href: '/reports', icon: ChartBarIcon },
];
```

### ✅ **Resultado Final**

Com esses passos, você terá um CRUD completo de Fornecedores com:

- ✅ Tabela com colunas configuráveis
- ✅ Filtros dinâmicos (categoria, status, valor, data)
- ✅ Busca em tempo real
- ✅ Paginação automática
- ✅ Ordenação por colunas
- ✅ Design responsivo
- ✅ Modo escuro/claro
- ✅ Animações suaves

---

## 🏫 **EXEMPLO RÁPIDO: CRUD de Escolas**

> **Quer ver como é fácil?** Aqui está um exemplo super rápido de como criar um CRUD de **Escolas**:

### 📝 **1. Interface (30 segundos)**
```typescript
// src/types/entities/school.ts
export interface School {
  id: string;
  name: string;           // Nome da escola
  type: string;           // Tipo: pública, privada, técnica
  students: number;       // Número de alunos
  address: string;        // Endereço
  principal: string;      // Nome do diretor
  status: 'active' | 'inactive';
  createdAt: string;
}
```

### 📊 **2. Configuração (2 minutos)**
```typescript
// src/configs/entities/schoolConfig.tsx
export const schoolConfig: CRUDConfig<School> = {
  entity: 'schools',
  title: 'Escolas',
  description: 'Gerenciamento de escolas',
  
  table: {
    columns: [
      { key: 'name', label: 'Nome da Escola', sortable: true },
      { key: 'type', label: 'Tipo', sortable: true },
      { key: 'students', label: 'Alunos', sortable: true },
      { key: 'principal', label: 'Diretor', sortable: true },
      { key: 'status', label: 'Status', sortable: true }
    ]
  },
  
  filters: [
    {
      key: 'type',
      label: 'Tipo de Escola',
      type: 'select',
      options: [
        { value: 'publica', label: 'Pública' },
        { value: 'privada', label: 'Privada' },
        { value: 'tecnica', label: 'Técnica' }
      ]
    },
    {
      key: 'students',
      label: 'Mínimo de Alunos',
      type: 'number',
      placeholder: 'Ex: 100'
    }
  ]
};
```

### 🚀 **3. Serviço + Mock (1 minuto)**
```typescript
// src/data/mockSchools.ts + src/services/schoolService.ts
const mockSchools: School[] = [
  {
    id: '1',
    name: 'Escola Municipal João Silva',
    type: 'publica',
    students: 450,
    address: 'Rua das Flores, 123',
    principal: 'Maria Santos',
    status: 'active',
    createdAt: '2024-01-10'
  }
];

export const schoolService = new CRUDService<School>('schools', mockSchools, {}, true);
```

### ⚡ **4. Página + Rota (30 segundos)**
```typescript
// src/pages/SchoolsPage.tsx
export const SchoolsPage: React.FC = () => {
  const crud = useGenericCRUD(schoolService);
  return <GenericCRUDPage config={schoolConfig} crud={crud} />;
};

// src/App.tsx - Adicionar rota
<Route path="/schools" element={<SchoolsPage />} />
```

### 5️⃣ **Adicionar ao Menu (15 segundos)**
```typescript
// src/components/layout/MainLayout.tsx
const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Agentes', href: '/agents', icon: AgentsIcon },
  { name: 'Fornecedores', href: '/suppliers', icon: TruckIcon },
  { name: 'Escolas', href: '/schools', icon: SchoolIcon }, // 👈 NOVO
  { name: 'Relatórios', href: '/reports', icon: ChartBarIcon },
];
```

### 6️⃣ **Comentários Explicativos no Código**

> **🎓 Para iniciantes:** Todo o código possui comentários detalhados explicando como funciona o sistema React + TypeScript

### 📋 **Arquivos Principais com Comentários Explicativos:**

#### **🚀 Entrada da Aplicação**
- `src/main.tsx` - Como o React inicia no navegador
- `src/App.tsx` - Como funciona o roteamento SPA
- `src/index.css` - Estilos globais e Tailwind CSS

#### **🎯 Núcleo do Sistema Genérico**
- `src/types/crud.ts` - **⭐ Como os tipos tornam tudo genérico**
- `src/services/CRUDService.ts` - **⭐ Como um serviço funciona para qualquer entidade**
- `src/hooks/useGenericCRUD.ts` - **⭐ Como o hook gerencia todo o estado**
- `src/components/GenericCRUDPage.tsx` - **⭐ Como renderizar qualquer CRUD**

#### **📊 Exemplos Práticos Comentados**
- `src/pages/ProductsPage.tsx` - **🏆 EXEMPLO PERFEITO de CRUD em 5 passos**
- `src/configs/entities/agentConfig.tsx` - **Como configurar colunas e filtros**
- `src/types/entities/agent.ts` - **Como definir uma entidade TypeScript**
- `src/data/mockAgents.ts` - **Como criar dados mockados para desenvolvimento**

### 🔍 **Tipos de Comentários Encontrados:**

#### **📝 Comentários de Cabeçalho**
```typescript
// ============================================================================
// TÍTULO DO ARQUIVO
// ============================================================================
// Explicação geral do que este arquivo faz
```

#### **💡 Comentários Explicativos**
```typescript
/**
 * 🎯 FUNÇÃO/COMPONENTE PRINCIPAL
 * Explicação detalhada de como funciona
 * 
 * COMO USAR:
 * Exemplo prático de uso
 */
```

#### **📖 Comentários Inline**
```typescript
const data = mockAgents;        // Dados mockados para desenvolvimento
const [loading, setLoading] = useState(false); // Estado de carregamento
```

### 📚 **Conceitos Explicados nos Comentários:**

1. **🔧 Sistema Genérico**: Como uma configuração vira um CRUD completo
2. **🎣 React Hooks**: Como gerenciar estado e efeitos colaterais
3. **📝 TypeScript**: Como tipagem ajuda a evitar erros
4. **🎨 Tailwind CSS**: Como usar classes utilitárias
5. **📊 Configurações**: Como definir colunas, filtros e comportamentos
6. **🔄 Mock vs API**: Como trocar dados falsos por API real
7. **🎭 Componentes**: Como criar interfaces reutilizáveis

### 🎯 **Como Usar os Comentários para Aprender:**

1. **Comece por `ProductsPage.tsx`** - exemplo mais simples e completo
2. **Veja `agentConfig.tsx`** - entenda como configurar CRUDs
3. **Explore `useGenericCRUD.ts`** - aprenda como funciona o estado
4. **Analise `GenericCRUDPage.tsx`** - veja como renderizar interfaces
5. **Estude `CRUDService.ts`** - entenda como conectar com dados

💡 **Dica**: Leia os comentários antes do código para entender o contexto!

#### **📊 Exemplos Práticos**
- `src/pages/ProductsPage.tsx` - **Exemplo perfeito de CRUD genérico**
- `src/configs/entities/agentConfig.tsx` - **Configuração de CRUD**
- `src/data/mockAgents.ts` - **Dados mockados para desenvolvimento**

### 🔍 **Entendendo os Comentários:**
```typescript
// ============================================================================
// TÍTULO DA SEÇÃO
// ============================================================================
// Explicação do que este arquivo/função faz

/**
 * 🎯 FUNÇÃO/COMPONENTE PRINCIPAL
 * Explicação detalhada de como funciona
 * 
 * COMO USAR:
 * Exemplo prático de uso
 */
```

### 📚 **Conceitos Explicados nos Comentários:**
1. **Como funciona o sistema genérico**
2. **O que cada interface TypeScript faz**
3. **Como o hook gerencia o estado**
4. **Como criar configurações de CRUD**
5. **Como trocar mock por API real**
6. **Como personalizar colunas e filtros**

---

## 🎊 **Resumo Final**

### ✅ **O que foi implementado:**
- ✅ **Sistema REALMENTE genérico** - crie CRUDs apenas com configuração
- ✅ **Comentários explicativos** em todo o código para iniciantes
- ✅ **Zero imports não utilizados** - código limpo
- ✅ **Zero erros de lint** - seguindo boas práticas
- ✅ **Build funcionando** - pronto para produção
- ✅ **100% responsivo** - mobile e desktop
- ✅ **Modo escuro/claro** - alternância automática
- ✅ **Documentação completa** - passo a passo para criar CRUDs

### 🚀 **Como usar:**
1. **Clone o projeto**
2. **Execute `npm install && npm run dev`**
3. **Acesse http://localhost:5173**
4. **Veja o exemplo de Produtos funcionando**
5. **Siga a documentação para criar seus próprios CRUDs**

### 🎯 **Para criar um novo CRUD:**
1. **Copie o padrão de `ProductsPage.tsx`**
2. **Defina sua interface (30 segundos)**
3. **Crie dados mock (1 minuto)**
4. **Configure colunas e filtros (2 minutos)**
5. **Adicione rota e menu (30 segundos)**
6. **CRUD pronto em menos de 5 minutos!**

---

**🎉 Sistema CRUD Genérico - Desenvolvido para facilitar sua vida!**
