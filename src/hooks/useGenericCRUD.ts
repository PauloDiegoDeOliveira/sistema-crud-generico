/* eslint-disable @typescript-eslint/no-explicit-any */
// ============================================================================
// HOOK GENÉRICO PARA CRUD
// ============================================================================
// Este hook é a "ponte" entre seus componentes React e o CRUDService
// Ele gerencia TODO o estado do CRUD (dados, filtros, paginação, etc.)

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { BaseEntity, CRUDState, CRUDActions, UseGenericCRUD } from '../types/crud';
import { CRUDService } from '../services/CRUDService';

/**
 * 🎣 HOOK GENÉRICO PARA CRUD
 * Este hook faz TODA a lógica do CRUD funcionar
 * 
 * VOCÊ USA ASSIM:
 * const crud = useGenericCRUD(agentService, ['name', 'email']);
 * 
 * E ELE TE DÁ:
 * - crud.state.items (lista de itens)
 * - crud.actions.create() (criar item)
 * - crud.actions.update() (atualizar item)
 * - crud.actions.delete() (deletar item)
 * - etc.
 */
export function useGenericCRUD<T extends BaseEntity>(
  service: CRUDService<T>,     // Serviço que faz as operações (mock ou API)
  searchFields: (keyof T)[] = [] // Campos onde pode buscar (ex: ['name', 'email'])
): UseGenericCRUD<T> {
  
  // Estado inicial
  const [state, setState] = useState<CRUDState<T>>({
    items: [],
    filteredItems: [],
    selectedItems: [],
    currentItem: null,
    loading: false,
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
    filters: {},
    searchTerm: '',
    sortField: null,
    sortDirection: 'asc',
    showFilters: false,
    error: null,
  });

  // Carregamento inicial
  useEffect(() => {
    loadItems();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Aplicar filtros e busca sempre que mudarem
  useEffect(() => {
    applyFiltersAndSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.items, state.filters, state.searchTerm, state.sortField, state.sortDirection]);

  // Recalcular paginação quando filtros mudarem
  useEffect(() => {
    const totalPages = Math.ceil(state.filteredItems.length / state.pageSize);
    setState(prev => ({
      ...prev,
      totalItems: state.filteredItems.length,
      totalPages,
      currentPage: Math.min(prev.currentPage, totalPages || 1)
    }));
  }, [state.filteredItems, state.pageSize]);

  /**
   * Aplicar filtros, busca e ordenação
   */
  const applyFiltersAndSearch = useCallback(() => {
    let filtered = [...state.items];

    // Aplicar busca por texto
    if (state.searchTerm && searchFields.length > 0) {
      const searchTerm = state.searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        searchFields.some(field => {
          const value = item[field];
          return String(value).toLowerCase().includes(searchTerm);
        })
      );
    }

    // Aplicar filtros específicos
    Object.entries(state.filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        filtered = filtered.filter(item => {
          const itemValue = item[key as keyof T];
          
          if (typeof value === 'string') {
            return String(itemValue).toLowerCase().includes(value.toLowerCase());
          }
          
          if (typeof value === 'number') {
            return Number(itemValue) >= value;
          }
          
          return itemValue === value;
        });
      }
    });

    // Aplicar ordenação
    if (state.sortField) {
      filtered.sort((a, b) => {
        const aValue = a[state.sortField!];
        const bValue = b[state.sortField!];
        
        let comparison = 0;
        if (aValue < bValue) comparison = -1;
        else if (aValue > bValue) comparison = 1;
        
        return state.sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    setState(prev => ({ ...prev, filteredItems: filtered }));
  }, [state.items, state.filters, state.searchTerm, state.sortField, state.sortDirection, searchFields]);

  /**
   * Ações do CRUD
   */
  const actions: CRUDActions<T> = useMemo(() => ({
    // Operações CRUD
    create: async (data: Partial<T>) => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const newItem = await service.create(data);
        setState(prev => ({
          ...prev,
          items: [...prev.items, newItem],
          loading: false
        }));
        return newItem;
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Erro ao criar item'
        }));
        throw error;
      }
    },

    update: async (id: string, data: Partial<T>) => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const updatedItem = await service.update(id, data);
        setState(prev => ({
          ...prev,
          items: prev.items.map(item => item.id === id ? updatedItem : item),
          loading: false
        }));
        return updatedItem;
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Erro ao atualizar item'
        }));
        throw error;
      }
    },

    delete: async (id: string) => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        await service.delete(id);
        setState(prev => ({
          ...prev,
          items: prev.items.filter(item => item.id !== id),
          selectedItems: prev.selectedItems.filter(item => item.id !== id),
          loading: false
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Erro ao deletar item'
        }));
        throw error;
      }
    },

    // Carregamento de dados
    loadItems: async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const items = await service.getAll();
        setState(prev => ({
          ...prev,
          items,
          loading: false
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Erro ao carregar dados'
        }));
      }
    },

    refreshItems: async () => {
      await actions.loadItems();
    },

    // Seleção
    selectItem: (item: T) => {
      setState(prev => ({ ...prev, selectedItems: [item] }));
    },

    selectItems: (items: T[]) => {
      setState(prev => ({ ...prev, selectedItems: items }));
    },

    clearSelection: () => {
      setState(prev => ({ ...prev, selectedItems: [] }));
    },

    // Filtros e busca
    setFilters: (filters: Record<string, any>) => {
      setState(prev => ({ ...prev, filters, currentPage: 1 }));
    },

    clearFilters: () => {
      setState(prev => ({ ...prev, filters: {}, currentPage: 1 }));
    },

    setSearchTerm: (term: string) => {
      setState(prev => ({ ...prev, searchTerm: term, currentPage: 1 }));
    },

    setSorting: (field: keyof T, direction: 'asc' | 'desc') => {
      setState(prev => ({ ...prev, sortField: field, sortDirection: direction }));
    },

    // Paginação
    setPage: (page: number) => {
      setState(prev => ({ ...prev, currentPage: page }));
    },

    setPageSize: (size: number) => {
      setState(prev => ({ ...prev, pageSize: size, currentPage: 1 }));
    },

    // UI
    toggleFilters: () => {
      setState(prev => ({ ...prev, showFilters: !prev.showFilters }));
    },

    // Utilitários
    clearError: () => {
      setState(prev => ({ ...prev, error: null }));
    },
  }), [service]);

  // Função para carregar dados (usar no useCallback)
  const loadItems = useCallback(async () => {
    await actions.loadItems();
  }, [actions]);

  return {
    state,
    actions,
  };
}
