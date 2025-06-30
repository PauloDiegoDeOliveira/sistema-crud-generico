// ============================================================================
// TIPOS DA ENTIDADE AGENT (AGENTE)
// ============================================================================
// Este arquivo define a estrutura de dados de um Agente
// Aqui você define quais campos um agente possui

import type { BaseEntity } from '../crud'; // Importa a interface base

// 📊 TIPOS POSSÍVEIS PARA STATUS DO AGENTE
export type AgentStatus = 'active' | 'inactive' | 'pending' | 'suspended';

// 🏷️ CONSTANTES PARA STATUS (evita erros de digitação)
export const AGENT_STATUS = {
  ACTIVE: 'active' as const,      // Agente ativo
  INACTIVE: 'inactive' as const,  // Agente inativo
  PENDING: 'pending' as const,    // Agente pendente de aprovação
  SUSPENDED: 'suspended' as const // Agente suspenso
} as const;

/**
 * 👤 INTERFACE DO AGENTE
 * Define todos os campos que um agente pode ter
 * Herda de BaseEntity (obrigatório: id, createdAt)
 */
export interface Agent extends BaseEntity {
  id: string;                          // ID único (herdado de BaseEntity)
  name: string;                        // Nome completo do agente
  email: string;                       // Email de contato
  phone?: string;                      // Telefone (opcional)
  document?: string;                   // CPF/CNPJ (opcional)
  status: AgentStatus;                 // Status do agente (ativo, inativo, etc.)
  company?: string;                    // Empresa onde trabalha (opcional)
  department?: string;                 // Departamento (vendas, TI, etc.)
  role?: string;                       // Cargo (gerente, agente, etc.)
  notes?: string;                      // Observações adicionais (opcional)
  lastLogin?: Date | string | null;    // Último login (pode ser nulo)
  createdAt: string;                   // Data de criação (herdado de BaseEntity)
  updatedAt: string;                   // Data da última atualização
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
