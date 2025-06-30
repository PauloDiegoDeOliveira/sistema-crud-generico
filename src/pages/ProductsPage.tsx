// ============================================================================
// EXEMPLO PERFEITO DE CRUD GENÉRICO - PRODUTOS
// ============================================================================
// Este arquivo é um EXEMPLO de como criar um CRUD completo em 5 minutos
// Copie este padrão para criar qualquer CRUD novo (Fornecedores, Clientes, etc.)

import React from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';  // Ícone para o CRUD
import { GenericCRUDPage } from '../components/GenericCRUDPage'; // Componente genérico que faz a mágica
import { useGenericCRUD } from '../hooks/useGenericCRUD';        // Hook que gerencia o estado
import { CRUDService } from '../services/CRUDService';           // Serviço que conecta com dados
import type { CRUDConfig } from '../types/crud';                // Tipo para configuração

// ============================================================================
// 1️⃣ DEFINIR A INTERFACE DA ENTIDADE
// ============================================================================
// Aqui você define quais campos o seu produto terá
interface Product {
  id: string;           // ID único (obrigatório)
  name: string;         // Nome do produto
  category: string;     // Categoria (eletrônicos, roupas, etc.)
  price: number;        // Preço em reais
  stock: number;        // Quantidade em estoque
  status: 'active' | 'inactive'; // Status ativo/inativo
  createdAt: string;    // Data de criação (obrigatório)
}

// ============================================================================
// 2️⃣ CRIAR DADOS MOCKADOS (FAKE)
// ============================================================================
// Em desenvolvimento, usamos dados falsos para testar
// Em produção, estes dados viriam de uma API real
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Notebook Dell Inspiron',
    category: 'Eletrônicos',
    price: 2500,
    stock: 10,
    status: 'active',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Mouse Logitech MX',
    category: 'Acessórios',
    price: 150,
    stock: 25,
    status: 'active',
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    name: 'Teclado Mecânico RGB',
    category: 'Acessórios',
    price: 300,
    stock: 0,
    status: 'inactive',
    createdAt: '2024-02-01'
  }
];

// ============================================================================
// 3️⃣ CONFIGURAR O CRUD (A PARTE MAIS IMPORTANTE!)
// ============================================================================
// Aqui você define como o CRUD vai se comportar
const productConfig: CRUDConfig<Product> = {
  entity: 'products',                    // Nome da entidade (para URLs, etc.)
  title: 'Produtos',                     // Título da página
  description: 'Gerencie o catálogo de produtos', // Descrição
  icon: ShoppingBagIcon,                 // Ícone do menu

  // 📊 Configuração da tabela (quais colunas mostrar)
  table: {
    columns: [
      { 
        key: 'name',        // Campo da entidade
        label: 'Nome',      // Cabeçalho da coluna
        sortable: true      // Permite ordenação
      },
      { 
        key: 'category', 
        label: 'Categoria', 
        sortable: true 
      },
      { 
        key: 'price', 
        label: 'Preço', 
        sortable: true,
        // 💰 PERSONALIZAÇÃO: formatar preço em reais
        render: (value: number) => new Intl.NumberFormat('pt-BR', {
          style: 'currency',    // Formato de moeda
          currency: 'BRL'      // Real brasileiro
        }).format(value)       // Formata o número
      },
      { 
        key: 'stock', 
        label: 'Estoque', 
        sortable: true 
      },
      { 
        key: 'status', 
        label: 'Status', 
        sortable: true 
      }
    ],
    pageSize: 10,                    // Mostrar 10 itens por página
    pageSizeOptions: [10, 25, 50]   // Opções de paginação
  },

  // 🔍 Configuração dos filtros (aparecem acima da tabela)
  filters: [
    {
      key: 'category',        // Filtrar por categoria
      label: 'Categoria',
      type: 'select',         // Tipo dropdown
      options: [              // Opções do dropdown
        { value: 'Eletrônicos', label: 'Eletrônicos' },
        { value: 'Acessórios', label: 'Acessórios' },
        { value: 'Móveis', label: 'Móveis' }
      ]
    },
    {
      key: 'status',          // Filtrar por status
      label: 'Status',
      type: 'select',
      options: [
        { value: 'active', label: 'Ativo' },
        { value: 'inactive', label: 'Inativo' }
      ]
    },
    {
      key: 'price',               // Filtrar por preço
      label: 'Preço Mínimo',
      type: 'number',             // Tipo numérico
      placeholder: 'Ex: 100'
    }
  ],

  // ⚙️ Configurações de comportamento (o que é permitido fazer)
  behavior: {
    enableCreate: true,                     // Permitir criar produtos
    enableEdit: true,                       // Permitir editar produtos
    enableDelete: true,                     // Permitir excluir produtos
    enableSearch: true,                     // Permitir busca global
    searchFields: ['name', 'category']      // Campos onde a busca funciona
  }
};

// ============================================================================
// 4️⃣ CRIAR SERVIÇO (CONECTA COM OS DADOS)
// ============================================================================
// Este serviço faz a ligação entre o componente e os dados
// Parâmetros: (nome, dados-mock, url-api, usar-mock?)
const productService = new CRUDService<Product>(
  'products',        // Nome da entidade
  mockProducts,      // Dados mockados (desenvolvimento)
  '/api',           // URL da API (produção)
  true              // true = usar mock, false = usar API
);

// ============================================================================
// 5️⃣ COMPONENTE DA PÁGINA (SÓ 3 LINHAS DE CÓDIGO!)
// ============================================================================
export const ProductsPage: React.FC = () => {
  // Hook que gerencia todo o estado do CRUD (dados, filtros, paginação, etc.)
  const crud = useGenericCRUD(productService, productConfig.behavior?.searchFields || []);
  
  // Componente genérico que renderiza todo o CRUD automaticamente
  return <GenericCRUDPage config={productConfig} crud={crud} />;
};

// ============================================================================
// 🎊 PRONTO! CRUD COMPLETO EM 5 PASSOS!
// ============================================================================
// 
// 📋 PARA ADICIONAR À APLICAÇÃO:
// 1. Adicionar rota no App.tsx: <Route path="/products" element={<ProductsPage />} />
// 2. Adicionar no menu lateral (MainLayout.tsx)
// 
// 🎯 RESULTADO: CRUD COMPLETO COM:
// ✅ Tabela responsiva com colunas configuráveis
// ✅ Filtros dinâmicos (categoria, status, preço)
// ✅ Busca global por nome e categoria
// ✅ Paginação automática
// ✅ Ordenação por qualquer coluna
// ✅ Formatação automática de preços
// ✅ Modo escuro/claro
// ✅ 100% responsivo (mobile + desktop)
// 
// 💡 PARA CRIAR OUTRO CRUD:
// Copie este arquivo, mude interface + dados + configuração = NOVO CRUD PRONTO!
// ✅ Tabela responsiva
// ✅ Filtros avançados
// ✅ Busca em tempo real
// ✅ Paginação
// ✅ Ordenação
// ✅ Modo escuro/claro
// ✅ Design consistente
// ============================================================================
