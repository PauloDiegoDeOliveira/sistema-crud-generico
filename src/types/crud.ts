/* eslint-disable @typescript-eslint/no-explicit-any */
// ============================================================================
// TIPOS GENÉRICOS PARA SISTEMA CRUD
// ============================================================================
// Este arquivo define todos os tipos TypeScript que tornam o sistema genérico
// Aqui você entende COMO o sistema funciona por baixo dos panos

import React from 'react';

/**
 * 🔥 INTERFACE BASE - O CORAÇÃO DO SISTEMA GENÉRICO
 * Todas as entidades (Agent, Product, etc.) DEVEM ter pelo menos estes campos
 */
export interface BaseEntity {
  id: string;           // ID único obrigatório
  createdAt: string;    // Data de criação obrigatória
  [key: string]: any;   // Permite campos personalizados (name, email, etc.)
}

/**
 * 🎛️ TIPOS DE CAMPOS PARA FILTROS E FORMULÁRIOS
 * Define que tipos de input podem ser usados
 */
export type FieldType = 
  | 'text'        // Campo de texto simples
  | 'email'       // Campo de email
  | 'password'    // Campo de senha
  | 'number'      // Campo numérico
  | 'select'      // Dropdown de seleção
  | 'multiselect' // Seleção múltipla
  | 'date'        // Seletor de data
  | 'daterange'   // Intervalo de datas
  | 'boolean'     // Checkbox verdadeiro/falso
  | 'textarea'    // Área de texto grande
  | 'tel'         // Campo de telefone
  | 'url';        // Campo de URL

/**
 * 📋 OPÇÕES PARA CAMPOS SELECT
 * Usado nos dropdowns de filtros e formulários
 */
export interface SelectOption {
  value: string;    // Valor interno
  label: string;    // Texto mostrado ao usuário
  disabled?: boolean; // Se a opção está desabilitada
}

/**
 * 📊 CONFIGURAÇÃO DE COLUNA DA TABELA
 * Define como cada coluna da tabela deve aparecer e se comportar
 */
export interface TableColumn<T extends BaseEntity> {
  key: keyof T;                                          // Campo da entidade (ex: 'name', 'email')
  label: string;                                         // Título da coluna mostrado na tabela
  sortable?: boolean;                                    // Se pode ordenar por esta coluna
  searchable?: boolean;                                  // Se pode buscar por esta coluna
  filterable?: boolean;                                  // Se pode filtrar por esta coluna
  width?: string;                                        // Largura da coluna (ex: '200px', '20%')
  render?: (value: any, row: T) => React.ReactNode;     // Função personalizada para mostrar o valor
  className?: string;                                    // Classes CSS personalizadas
}

/**
 * 🔍 CONFIGURAÇÃO DE CAMPO DE FILTRO
 * Define os filtros que aparecem acima da tabela
 */
export interface FilterField<T extends BaseEntity> {
  key: keyof T | string;                                 // Campo para filtrar (ex: 'department')
  label: string;                                         // Rótulo do filtro (ex: 'Departamento')
  type: FieldType;                                       // Tipo do input (text, select, etc.)
  placeholder?: string;                                  // Texto de exemplo no input
  options?: SelectOption[];                              // Opções para select/multiselect
  defaultValue?: any;                                       // Valor padrão para o filtro
}

/**
 * 🎯 CONFIGURAÇÃO COMPLETA DE UM CRUD
 * Esta é a "receita" que você cria para cada CRUD novo
 * EXEMPLO: agentConfig, productConfig, etc.
 */
export interface CRUDConfig<T extends BaseEntity> {
  // 📋 Identificação do CRUD
  entity: string;                                        // Nome da entidade (ex: 'agents', 'products')
  title: string;                                         // Título mostrado na página (ex: 'Agentes')
  description?: string;                                  // Descrição opcional
  icon?: React.ComponentType<any>;                       // Ícone para o menu

  // 📊 Configuração da tabela
  table: {
    columns: TableColumn<T>[];                           // Quais colunas mostrar
    defaultSort?: {                                      // Ordenação padrão
      field: keyof T;                                    // Campo para ordenar (ex: 'name')
      direction: 'asc' | 'desc';                         // Crescente ou decrescente
    };
    pageSize?: number;                                   // Quantos itens por página (padrão: 10)
    pageSizeOptions?: number[];                          // Opções de itens por página [10, 25, 50]
  };

  // 🔍 Configuração de filtros (opcional)
  filters?: FilterField<T>[];                            // Quais filtros mostrar acima da tabela

  // ⚙️ Configurações de comportamento
  behavior?: {
    enableCreate?: boolean;
    enableEdit?: boolean;
    enableDelete?: boolean;
    enableSearch?: boolean;
    searchFields?: (keyof T)[];
  };
}

/**
 * Estado do CRUD genérico
 */
export interface CRUDState<T extends BaseEntity> {
  // Dados
  items: T[];
  filteredItems: T[];
  selectedItems: T[];
  currentItem: T | null;
  
  // Estados de loading
  loading: boolean;
  
  // Paginação
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  
  // Filtros e busca
  filters: Record<string, any>;
  searchTerm: string;
  sortField: keyof T | null;
  sortDirection: 'asc' | 'desc';
  
  // UI
  showFilters: boolean;
  
  // Erros
  error: string | null;
}

/**
 * Ações do CRUD genérico
 */
export interface CRUDActions<T extends BaseEntity> {
  // Operações CRUD
  create: (data: Partial<T>) => Promise<T>;
  update: (id: string, data: Partial<T>) => Promise<T>;
  delete: (id: string) => Promise<void>;
  
  // Carregamento de dados
  loadItems: () => Promise<void>;
  refreshItems: () => Promise<void>;
  
  // Seleção
  selectItem: (item: T) => void;
  selectItems: (items: T[]) => void;
  clearSelection: () => void;
  
  // Filtros e busca
  setFilters: (filters: Record<string, any>) => void;
  clearFilters: () => void;
  setSearchTerm: (term: string) => void;
  setSorting: (field: keyof T, direction: 'asc' | 'desc') => void;
  
  // Paginação
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  
  // UI
  toggleFilters: () => void;
  
  // Utilitários
  clearError: () => void;
}

/**
 * Hook do CRUD genérico - retorna estado + ações
 */
export interface UseGenericCRUD<T extends BaseEntity> {
  state: CRUDState<T>;
  actions: CRUDActions<T>;
}

/**
 * Props do componente GenericCRUDPage
 */
export interface GenericCRUDPageProps<T extends BaseEntity> {
  config: CRUDConfig<T>;
  className?: string;
  style?: React.CSSProperties;
}
