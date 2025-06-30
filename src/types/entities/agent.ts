import type { BaseEntity } from '../crud';

// Tipos para status do agente
export type AgentStatus = 'active' | 'inactive' | 'pending' | 'suspended';

// Constantes para status
export const AGENT_STATUS = {
  ACTIVE: 'active' as const,
  INACTIVE: 'inactive' as const,
  PENDING: 'pending' as const,
  SUSPENDED: 'suspended' as const
} as const;

// Interface do Agente
export interface Agent extends BaseEntity {
  id: string;
  name: string;
  email: string;
  phone?: string;
  document?: string; // CPF/CNPJ
  status: AgentStatus;
  company?: string;
  department?: string;
  role?: string;
  notes?: string;
  lastLogin?: Date | string | null;
  createdAt: string;
  updatedAt: string;
}

// DTO para criação de agente
export interface CreateAgentDto {
  name: string;
  email: string;
  phone?: string;
  document?: string;
  status: AgentStatus;
  company?: string;
  department?: string;
  role?: string;
  notes?: string;
}

// DTO para atualização de agente
export interface UpdateAgentDto {
  name?: string;
  email?: string;
  phone?: string;
  document?: string;
  status?: AgentStatus;
  company?: string;
  department?: string;
  role?: string;
  notes?: string;
}

// Filtros para agentes
export interface AgentFilters {
  name?: string;
  email?: string;
  status?: AgentStatus[];
  company?: string;
  department?: string;
  role?: string;
  dateRange?: {
    start: Date | string;
    end: Date | string;
  };
}

// Opções para selects
export const AGENT_STATUS_OPTIONS = [
  { value: AGENT_STATUS.ACTIVE, label: 'Ativo' },
  { value: AGENT_STATUS.INACTIVE, label: 'Inativo' },
  { value: AGENT_STATUS.PENDING, label: 'Pendente' },
  { value: AGENT_STATUS.SUSPENDED, label: 'Suspenso' }
];

export const DEPARTMENT_OPTIONS = [
  { value: 'vendas', label: 'Vendas' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'suporte', label: 'Suporte' },
  { value: 'financeiro', label: 'Financeiro' },
  { value: 'rh', label: 'Recursos Humanos' },
  { value: 'ti', label: 'Tecnologia da Informação' }
];

export const ROLE_OPTIONS = [
  { value: 'admin', label: 'Administrador' },
  { value: 'manager', label: 'Gerente' },
  { value: 'agent', label: 'Agente' },
  { value: 'analyst', label: 'Analista' },
  { value: 'intern', label: 'Estagiário' }
];
