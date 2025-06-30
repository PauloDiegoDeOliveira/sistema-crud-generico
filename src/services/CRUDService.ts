// 🔧 SERVIÇO GENÉRICO PARA OPERAÇÕES CRUD
// Esta classe centraliza todas operações de dados (Create, Read, Update, Delete)
// Funciona tanto com dados mockados (desenvolvimento) quanto com APIs reais

import type { 
  BaseEntity,      // Interface base para entidades
  ListResponse,    // Resposta de listagem com paginação
  ApiResponse,     // Resposta padrão da API
  ListParams,      // Parâmetros para buscar dados
  ServiceConfig    // Configurações do serviço
} from '../types/crud';

// Configuração padrão do serviço
const DEFAULT_CONFIG: ServiceConfig = {
  baseUrl: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
};

// 🏭 CLASSE GENÉRICA PARA SERVIÇOS CRUD
// T = tipo da entidade (Agent, Supplier, Product, etc.)
export class CRUDService<T extends BaseEntity> {
  private config: ServiceConfig;
  private entity: string;         // Nome da entidade (ex: 'agents', 'suppliers')
  private mockData: T[];          // Dados mockados para desenvolvimento
  private useMock: boolean;       // Se deve usar mock ou API real

  constructor(
    entity: string,                          // Nome da entidade
    mockData: T[] = [],                      // Dados mockados
    config: Partial<ServiceConfig> = {},     // Configurações extras
    useMock = true                           // Usar mock por padrão
  ) {
    this.entity = entity;
    this.mockData = [...mockData];
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.useMock = useMock;
  }

  // Método para alternar entre mock e API real
  setUseMock(useMock: boolean): void {
    this.useMock = useMock;
  }

  // Simular delay de rede
  private delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Gerar ID único
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Filtrar dados mock
  private filterMockData(data: T[], params: ListParams): T[] {
    let filtered = [...data];

    // Busca por texto
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter(item => 
        Object.values(item).some(value => 
          String(value).toLowerCase().includes(searchLower)
        )
      );
    }

    // Aplicar filtros específicos
    if (params.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (Array.isArray(value) && value.length > 0) {
            filtered = filtered.filter(item => 
              value.includes((item as Record<string, unknown>)[key])
            );
          } else {
            filtered = filtered.filter(item => 
              (item as Record<string, unknown>)[key] === value
            );
          }
        }
      });
    }

    // Ordenação
    if (params.sort) {
      const direction = params.order === 'desc' ? -1 : 1;
      filtered.sort((a, b) => {
        const aVal = (a as Record<string, unknown>)[params.sort!];
        const bVal = (b as Record<string, unknown>)[params.sort!];
        
        // Converter para string para comparação segura
        const aStr = String(aVal || '');
        const bStr = String(bVal || '');
        
        if (aStr < bStr) return -1 * direction;
        if (aStr > bStr) return 1 * direction;
        return 0;
      });
    }

    return filtered;
  }

  // Paginar dados
  private paginateData<TData>(data: TData[], page = 1, pageSize = 10): {
    data: TData[];
    pagination: {
      page: number;
      pageSize: number;
      total: number;
      totalPages: number;
    };
  } {
    const total = data.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    return {
      data: data.slice(startIndex, endIndex),
      pagination: {
        page,
        pageSize,
        total,
        totalPages
      }
    };
  }

  // Fazer requisição HTTP
  private async makeRequest<TResponse>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<TResponse> {
    const url = `${this.config.baseUrl}${endpoint}`;
    const controller = new AbortController();
    
    // Timeout
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.config.headers,
          ...options.headers
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      
      throw error;
    }
  }

  // LISTAR itens
  async list(params: ListParams = {}): Promise<ListResponse<T>> {
    if (this.useMock) {
      await this.delay(300);
      
      const filtered = this.filterMockData(this.mockData, params);
      const paginated = this.paginateData(
        filtered, 
        params.page || 1, 
        params.pageSize || 10
      );
      
      return {
        ...paginated,
        success: true,
        message: 'Dados carregados com sucesso'
      };
    }

    // API real
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (typeof value === 'object') {
          queryParams.append(key, JSON.stringify(value));
        } else {
          queryParams.append(key, String(value));
        }
      }
    });

    return this.makeRequest<ListResponse<T>>(
      `/${this.entity}?${queryParams.toString()}`
    );
  }

  // OBTER item por ID
  async getById(id: string | number): Promise<ApiResponse<T>> {
    if (this.useMock) {
      await this.delay(200);
      
      const item = this.mockData.find(item => item.id === id);
      if (!item) {
        throw new Error(`${this.entity} com ID ${id} não encontrado`);
      }
      
      return {
        data: item,
        success: true,
        message: 'Item encontrado'
      };
    }

    return this.makeRequest<ApiResponse<T>>(`/${this.entity}/${id}`);
  }

  // CRIAR item
  async create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<T>> {
    if (this.useMock) {
      await this.delay(400);
      
      const newItem: T = {
        ...data,
        id: this.generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as T;
      
      this.mockData.push(newItem);
      
      return {
        data: newItem,
        success: true,
        message: `${this.entity} criado com sucesso`
      };
    }

    return this.makeRequest<ApiResponse<T>>(`/${this.entity}`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // ATUALIZAR item
  async update(id: string | number, data: Partial<T>): Promise<ApiResponse<T>> {
    if (this.useMock) {
      await this.delay(400);
      
      const index = this.mockData.findIndex(item => item.id === id);
      if (index === -1) {
        throw new Error(`${this.entity} com ID ${id} não encontrado`);
      }
      
      const updatedItem: T = {
        ...this.mockData[index],
        ...data,
        updatedAt: new Date().toISOString()
      };
      
      this.mockData[index] = updatedItem;
      
      return {
        data: updatedItem,
        success: true,
        message: `${this.entity} atualizado com sucesso`
      };
    }

    return this.makeRequest<ApiResponse<T>>(`/${this.entity}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // DELETAR item
  async delete(id: string | number): Promise<ApiResponse<void>> {
    if (this.useMock) {
      await this.delay(300);
      
      const index = this.mockData.findIndex(item => item.id === id);
      if (index === -1) {
        throw new Error(`${this.entity} com ID ${id} não encontrado`);
      }
      
      this.mockData.splice(index, 1);
      
      return {
        data: undefined as void,
        success: true,
        message: `${this.entity} deletado com sucesso`
      };
    }

    return this.makeRequest<ApiResponse<void>>(`/${this.entity}/${id}`, {
      method: 'DELETE'
    });
  }

  // DELETAR múltiplos itens
  async deleteMany(ids: (string | number)[]): Promise<ApiResponse<void>> {
    if (this.useMock) {
      await this.delay(500);
      
      ids.forEach(id => {
        const index = this.mockData.findIndex(item => item.id === id);
        if (index !== -1) {
          this.mockData.splice(index, 1);
        }
      });
      
      return {
        data: undefined as void,
        success: true,
        message: `${ids.length} itens deletados com sucesso`
      };
    }

    return this.makeRequest<ApiResponse<void>>(`/${this.entity}/bulk-delete`, {
      method: 'DELETE',
      body: JSON.stringify({ ids })
    });
  }

  // Obter dados mock (para debug/desenvolvimento)
  getMockData(): T[] {
    return [...this.mockData];
  }

  // Resetar dados mock
  resetMockData(data: T[]): void {
    this.mockData = [...data];
  }

  // Configurar interceptors (para API real)
  setInterceptors(interceptors: ServiceConfig['interceptors']): void {
    this.config.interceptors = interceptors;
  }
}

// Factory para criar serviços específicos
export function createCRUDService<T extends BaseEntity>(
  entity: string,
  mockData: T[] = [],
  config: Partial<ServiceConfig> = {}
): CRUDService<T> {
  return new CRUDService<T>(entity, mockData, config);
}
