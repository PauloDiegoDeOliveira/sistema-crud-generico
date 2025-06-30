// Tipos genéricos para o sistema CRUD
export interface BaseEntity {
  id: string | number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

// Configuração de campo da tabela
export interface TableColumn<T = Record<string, unknown>> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: 'text' | 'date' | 'badge' | 'currency' | 'boolean' | 'custom';
  renderFunction?: (value: unknown, item: T) => React.ReactNode;
  className?: string;
}

// Configuração da tabela
export interface TableConfig<T> {
  columns: TableColumn<T>[];
  actions?: ('view' | 'edit' | 'delete' | 'custom')[];
  customActions?: {
    key: string;
    label: string;
    icon?: React.ReactNode;
    onClick: (item: T) => void;
    className?: string;
  }[];
  pagination?: {
    enabled: boolean;
    pageSize: number;
    pageSizeOptions?: number[];
  };
  sorting?: {
    enabled: boolean;
    defaultSort?: {
      key: keyof T;
      direction: 'asc' | 'desc';
    };
  };
}

// Configuração de campo do formulário
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'password' | 'number' | 'select' | 'multiselect' | 'textarea' | 'date' | 'datetime' | 'checkbox' | 'radio';
  required?: boolean;
  placeholder?: string;
  options?: { value: string | number | boolean; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: RegExp;
    custom?: (value: unknown) => string | null;
  };
  grid?: {
    cols?: number; // quantas colunas ocupa (1-12)
    break?: 'sm' | 'md' | 'lg' | 'xl';
  };
  conditional?: {
    field: string;
    value: unknown;
    operator?: '=' | '!=' | 'in' | 'not-in';
  };
}

// Configuração do formulário
export interface FormConfig {
  fields: FormField[];
  layout?: 'single' | 'two-column' | 'grid';
  submitText?: string;
  cancelText?: string;
  validation?: 'onChange' | 'onBlur' | 'onSubmit';
}

// Configuração dos filtros
export interface FilterConfig {
  fields: FormField[];
  layout?: 'horizontal' | 'vertical' | 'grid';
  searchPlaceholder?: string;
  resetText?: string;
  applyText?: string;
}

// Configuração completa do CRUD
export interface CRUDConfig<T extends BaseEntity> {
  entity: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  
  // Configurações dos componentes
  table: TableConfig<T>;
  form: FormConfig;
  filters?: FilterConfig;
  
  // Configurações de comportamento
  permissions?: {
    create?: boolean;
    read?: boolean;
    update?: boolean;
    delete?: boolean;
  };
  
  // Configurações de API
  api?: {
    baseUrl?: string;
    endpoints?: {
      list?: string;
      create?: string;
      update?: string;
      delete?: string;
      show?: string;
    };
    headers?: Record<string, string>;
  };
  
  // Configurações de UI
  ui?: {
    showSearch?: boolean;
    showFilters?: boolean;
    showExport?: boolean;
    showImport?: boolean;
    compactMode?: boolean;
  };
}

// Estado do CRUD
export interface CRUDState<T> {
  items: T[];
  loading: boolean;
  error: string | null;
  selectedItems: T[];
  currentItem: T | null;
  filters: Record<string, unknown>;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  sorting: {
    key: keyof T | null;
    direction: 'asc' | 'desc';
  };
}

// Ações do CRUD
export interface CRUDActions<T> {
  // CRUD básico
  loadItems: (params?: ListParams) => Promise<void>;
  createItem: (item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateItem: (id: string | number, item: Partial<T>) => Promise<void>;
  deleteItem: (id: string | number) => Promise<void>;
  deleteItems: (ids: (string | number)[]) => Promise<void>;
  
  // Seleção
  selectItem: (item: T) => void;
  selectItems: (items: T[]) => void;
  clearSelection: () => void;
  
  // Filtros e busca
  setFilters: (filters: Record<string, unknown>) => void;
  clearFilters: () => void;
  search: (query: string) => void;
  
  // Paginação
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  
  // Ordenação
  setSorting: (key: keyof T, direction: 'asc' | 'desc') => void;
  
  // Estado
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Hook genérico do CRUD
export interface UseCRUD<T extends BaseEntity> {
  state: CRUDState<T>;
  actions: CRUDActions<T>;
}

// Configuração do serviço
export interface ServiceConfig {
  baseUrl: string;
  timeout?: number;
  headers?: Record<string, string>;
  interceptors?: {
    request?: (config: Record<string, unknown>) => Record<string, unknown>;
    response?: (response: Record<string, unknown>) => Record<string, unknown>;
    error?: (error: unknown) => Promise<unknown>;
  };
}

// Resposta da API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  errors?: string[];
}

// Resposta de listagem
export interface ListResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  message?: string;
  success: boolean;
}

// Parâmetros de listagem
export interface ListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  filters?: Record<string, unknown>;
  sort?: string;
  order?: 'asc' | 'desc';
}
