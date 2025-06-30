// ============================================================================
// EXEMPLO: CRUD DE PRODUTOS USANDO SISTEMA GENÉRICO
// ============================================================================

import React from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { GenericCRUDPage } from '../components/GenericCRUDPage';
import { useGenericCRUD } from '../hooks/useGenericCRUD';
import { CRUDService } from '../services/CRUDService';
import type { CRUDConfig } from '../types/crud';

// ============================================================================
// 1. DEFINIR A INTERFACE DA ENTIDADE
// ============================================================================
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

// ============================================================================
// 2. CRIAR DADOS MOCKADOS
// ============================================================================
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
// 3. CONFIGURAR O CRUD
// ============================================================================
const productConfig: CRUDConfig<Product> = {
  entity: 'products',
  title: 'Produtos',
  description: 'Gerencie o catálogo de produtos',
  icon: ShoppingBagIcon,

  table: {
    columns: [
      { key: 'name', label: 'Nome', sortable: true },
      { key: 'category', label: 'Categoria', sortable: true },
      { 
        key: 'price', 
        label: 'Preço', 
        sortable: true,
        render: (value: number) => new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(value)
      },
      { key: 'stock', label: 'Estoque', sortable: true },
      { key: 'status', label: 'Status', sortable: true }
    ],
    pageSize: 10,
    pageSizeOptions: [10, 25, 50]
  },

  filters: [
    {
      key: 'category',
      label: 'Categoria',
      type: 'select',
      options: [
        { value: 'Eletrônicos', label: 'Eletrônicos' },
        { value: 'Acessórios', label: 'Acessórios' },
        { value: 'Móveis', label: 'Móveis' }
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
    },
    {
      key: 'price',
      label: 'Preço Mínimo',
      type: 'number',
      placeholder: 'Ex: 100'
    }
  ],

  behavior: {
    enableCreate: true,
    enableEdit: true,
    enableDelete: true,
    enableSearch: true,
    searchFields: ['name', 'category']
  }
};

// ============================================================================
// 4. CRIAR SERVIÇO
// ============================================================================
const productService = new CRUDService<Product>('products', mockProducts, '/api', true);

// ============================================================================
// 5. COMPONENTE DA PÁGINA (APENAS 3 LINHAS!)
// ============================================================================
export const ProductsPage: React.FC = () => {
  const crud = useGenericCRUD(productService, productConfig.behavior?.searchFields || []);
  
  return <GenericCRUDPage config={productConfig} crud={crud} />;
};

// ============================================================================
// PRONTO! CRUD COMPLETO EM 5 PASSOS!
// ============================================================================
// 
// Para adicionar à aplicação:
// 1. Adicionar rota no App.tsx: <Route path="/products" element={<ProductsPage />} />
// 2. Adicionar no menu lateral
// 
// RESULTADO: CRUD completo com:
// ✅ Tabela responsiva
// ✅ Filtros avançados
// ✅ Busca em tempo real
// ✅ Paginação
// ✅ Ordenação
// ✅ Modo escuro/claro
// ✅ Design consistente
// ============================================================================
