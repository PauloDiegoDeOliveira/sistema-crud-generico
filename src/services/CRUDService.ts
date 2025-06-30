// ============================================================================
// SERVIÇO CRUD GENÉRICO
// ============================================================================
// Esta classe é o "coração" do sistema genérico
// Ela funciona para QUALQUER entidade (Agent, Product, etc.)

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BaseEntity } from '../types/crud';

/**
 * 🔧 SERVIÇO CRUD GENÉRICO
 * Uma única classe que serve para TODOS os CRUDs
 * 
 * FUNCIONA ASSIM:
 * - Se useMock = true: trabalha com dados em memória (desenvolvimento)
 * - Se useMock = false: faz chamadas HTTP para API (produção)
 */
export class CRUDService<T extends BaseEntity> {
  private entity: string;     // Nome da entidade (ex: 'agents', 'products')
  private data: T[];         // Dados mockados (array em memória)
  private baseUrl?: string;  // URL da API (ex: 'https://api.empresa.com')
  private useMock: boolean;  // Flag: true = mock, false = API real

  constructor(
    entity: string,          // Nome da entidade (ex: 'agents')
    mockData: T[] = [],     // Dados mockados para desenvolvimento
    baseUrl?: string,       // URL da API (opcional)
    useMock = true          // true = desenvolvimento, false = produção
  ) {
    this.entity = entity;
    this.data = mockData;
    this.baseUrl = baseUrl;
    this.useMock = useMock;
  }

  /**
   * Obter todos os itens
   */
  async getAll(): Promise<T[]> {
    if (this.useMock) {
      // Simular delay de API
      await this.delay(300);
      return [...this.data];
    }
    
    // Implementação real da API
    const response = await fetch(`${this.baseUrl}/${this.entity}`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar ${this.entity}`);
    }
    return response.json();
  }

  /**
   * Obter item por ID
   */
  async getById(id: string): Promise<T | null> {
    if (this.useMock) {
      await this.delay(200);
      return this.data.find(item => item.id === id) || null;
    }
    
    const response = await fetch(`${this.baseUrl}/${this.entity}/${id}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Erro ao buscar ${this.entity} com ID ${id}`);
    }
    return response.json();
  }

  /**
   * Criar novo item
   */
  async create(data: Partial<T>): Promise<T> {
    if (this.useMock) {
      await this.delay(500);
      const newItem = {
        ...data,
        id: this.generateId(),
        createdAt: new Date().toISOString(),
      } as T;
      
      this.data.push(newItem);
      return newItem;
    }
    
    const response = await fetch(`${this.baseUrl}/${this.entity}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao criar ${this.entity}`);
    }
    
    return response.json();
  }

  /**
   * Atualizar item existente
   */
  async update(id: string, data: Partial<T>): Promise<T> {
    if (this.useMock) {
      await this.delay(400);
      const index = this.data.findIndex(item => item.id === id);
      if (index === -1) {
        throw new Error(`${this.entity} com ID ${id} não encontrado`);
      }
      
      this.data[index] = { ...this.data[index], ...data };
      return this.data[index];
    }
    
    const response = await fetch(`${this.baseUrl}/${this.entity}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao atualizar ${this.entity} com ID ${id}`);
    }
    
    return response.json();
  }

  /**
   * Deletar item
   */
  async delete(id: string): Promise<void> {
    if (this.useMock) {
      await this.delay(300);
      const index = this.data.findIndex(item => item.id === id);
      if (index === -1) {
        throw new Error(`${this.entity} com ID ${id} não encontrado`);
      }
      
      this.data.splice(index, 1);
      return;
    }
    
    const response = await fetch(`${this.baseUrl}/${this.entity}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao deletar ${this.entity} com ID ${id}`);
    }
  }

  /**
   * Buscar itens com filtros
   */
  async search(filters: Record<string, any>): Promise<T[]> {
    const allItems = await this.getAll();
    
    return allItems.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true; // Ignorar filtros vazios
        
        const itemValue = item[key as keyof T];
        
        if (typeof value === 'string') {
          return String(itemValue).toLowerCase().includes(value.toLowerCase());
        }
        
        if (typeof value === 'number') {
          return Number(itemValue) >= value;
        }
        
        return itemValue === value;
      });
    });
  }

  /**
   * Buscar itens por texto (busca em múltiplos campos)
   */
  async searchByText(query: string, fields: (keyof T)[]): Promise<T[]> {
    if (!query.trim()) {
      return this.getAll();
    }
    
    const allItems = await this.getAll();
    const searchTerm = query.toLowerCase();
    
    return allItems.filter(item =>
      fields.some(field => {
        const value = item[field];
        return String(value).toLowerCase().includes(searchTerm);
      })
    );
  }

  /**
   * Obter estatísticas básicas
   */
  async getStats(): Promise<Record<string, number>> {
    const items = await this.getAll();
    
    return {
      total: items.length,
      active: items.filter((item: any) => item.status === 'active').length,
      inactive: items.filter((item: any) => item.status === 'inactive').length,
    };
  }

  /**
   * Alterar entre mock e API real
   */
  setUseMock(useMock: boolean): void {
    this.useMock = useMock;
  }

  /**
   * Definir URL base da API
   */
  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  /**
   * Utilitários privados
   */
  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}
