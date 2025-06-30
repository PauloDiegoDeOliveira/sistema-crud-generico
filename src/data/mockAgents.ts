// ============================================================================
// DADOS MOCKADOS DE AGENTES
// ============================================================================
// Este arquivo contém dados falsos (mock) para desenvolvimento
// Em produção, estes dados viriam de uma API real

import type { Agent } from '../types/entities/agent';  // Importa o tipo Agent
import { AGENT_STATUS } from '../types/entities/agent'; // Importa as constantes de status

/**
 * 📊 DADOS MOCKADOS PARA DESENVOLVIMENTO
 * Estes são dados falsos que simulam o que viria de uma API
 * Usado durante o desenvolvimento para testar a interface
 */
export const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'João Silva Santos',
    email: 'joao.silva@empresa.com',
    phone: '(11) 99999-1234',
    document: '123.456.789-00',
    status: AGENT_STATUS.ACTIVE,
    company: '3P EQUIPAMENTOS DE PROTEÇÃO',
    department: 'vendas',
    role: 'agent',
    notes: 'Agente responsável pela região Sul',
    lastLogin: '2024-06-29T08:30:00Z',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-06-29T08:30:00Z'
  },
  {
    id: '2',
    name: 'Maria Oliveira Costa',
    email: 'maria.oliveira@empresa.com',
    phone: '(11) 98888-5678',
    document: '987.654.321-00',
    status: AGENT_STATUS.ACTIVE,
    company: 'PARAFUSOS KLIDERA RAMOS LTDA',
    department: 'suporte',
    role: 'manager',
    notes: 'Gerente de suporte técnico',
    lastLogin: '2024-06-29T09:15:00Z',
    createdAt: '2024-02-10T14:30:00Z',
    updatedAt: '2024-06-29T09:15:00Z'
  },
  {
    id: '3',
    name: 'Pedro Almeida Ferreira',
    email: 'pedro.almeida@empresa.com',
    phone: '(11) 97777-9012',
    document: '456.789.123-00',
    status: AGENT_STATUS.PENDING,
    company: 'SUPRICOMP SUPRIMENTOS LTDA',
    department: 'vendas',
    role: 'agent',
    notes: 'Aguardando confirmação de documentos',
    lastLogin: null,
    createdAt: '2024-06-25T16:45:00Z',
    updatedAt: '2024-06-25T16:45:00Z'
  },
  {
    id: '4',
    name: 'Ana Carolina Ribeiro',
    email: 'ana.ribeiro@empresa.com',
    phone: '(11) 96666-3456',
    document: '789.123.456-00',
    status: AGENT_STATUS.ACTIVE,
    company: 'ANELANGULAR COMERCIO DE FERRAMENTAS',
    department: 'marketing',
    role: 'analyst',
    notes: 'Especialista em análise de mercado',
    lastLogin: '2024-06-28T17:20:00Z',
    createdAt: '2024-03-05T11:15:00Z',
    updatedAt: '2024-06-28T17:20:00Z'
  },
  {
    id: '5',
    name: 'Carlos Eduardo Mendes',
    email: 'carlos.mendes@empresa.com',
    phone: '(11) 95555-7890',
    document: '321.654.987-00',
    status: AGENT_STATUS.SUSPENDED,
    company: 'DIMENSIONAL BRASIL LTDA',
    department: 'financeiro',
    role: 'agent',
    notes: 'Suspenso por não conformidade',
    lastLogin: '2024-06-20T13:45:00Z',
    createdAt: '2024-04-12T09:30:00Z',
    updatedAt: '2024-06-22T10:00:00Z'
  },
  {
    id: '6',
    name: 'Fernanda Lima Souza',
    email: 'fernanda.lima@empresa.com',
    phone: '(11) 94444-2345',
    document: '654.321.098-00',
    status: AGENT_STATUS.ACTIVE,
    company: 'SUPRICOMP SUPRIMENTOS LTDA',
    department: 'rh',
    role: 'manager',
    notes: 'Gerente de recursos humanos',
    lastLogin: '2024-06-29T07:45:00Z',
    createdAt: '2024-01-20T15:20:00Z',
    updatedAt: '2024-06-29T07:45:00Z'
  },
  {
    id: '7',
    name: 'Roberto dos Santos Silva',
    email: 'roberto.santos@empresa.com',
    phone: '(11) 93333-6789',
    document: '147.258.369-00',
    status: AGENT_STATUS.ACTIVE,
    company: '3P EQUIPAMENTOS DE PROTEÇÃO',
    department: 'ti',
    role: 'admin',
    notes: 'Administrador do sistema',
    lastLogin: '2024-06-29T06:30:00Z',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-06-29T06:30:00Z'
  },
  {
    id: '8',
    name: 'Juliana Pereira Gomes',
    email: 'juliana.pereira@empresa.com',
    phone: '(11) 92222-4567',
    document: '258.369.147-00',
    status: AGENT_STATUS.INACTIVE,
    company: 'PARAFUSOS KLIDERA RAMOS LTDA',
    department: 'vendas',
    role: 'intern',
    notes: 'Estágio finalizado',
    lastLogin: '2024-05-15T18:00:00Z',
    createdAt: '2024-02-01T10:30:00Z',
    updatedAt: '2024-05-15T18:00:00Z'
  },
  {
    id: '9',
    name: 'Alexandre Costa Martins',
    email: 'alexandre.costa@empresa.com',
    phone: '(11) 91111-8901',
    document: '369.147.258-00',
    status: AGENT_STATUS.ACTIVE,
    company: 'DIMENSIONAL BRASIL LTDA',
    department: 'suporte',
    role: 'agent',
    notes: 'Especialista em suporte técnico avançado',
    lastLogin: '2024-06-29T10:20:00Z',
    createdAt: '2024-03-18T13:40:00Z',
    updatedAt: '2024-06-29T10:20:00Z'
  },
  {
    id: '10',
    name: 'Patrícia Rodrigues Ferraz',
    email: 'patricia.rodrigues@empresa.com',
    phone: '(11) 90000-1234',
    document: '852.741.963-00',
    status: AGENT_STATUS.PENDING,
    company: 'ANELANGULAR COMERCIO DE FERRAMENTAS',
    department: 'marketing',
    role: 'analyst',
    notes: 'Em processo de integração',
    lastLogin: null,
    createdAt: '2024-06-27T14:15:00Z',
    updatedAt: '2024-06-27T14:15:00Z'
  }
];

// ============================================================================
// FUNÇÕES UTILITÁRIAS
// ============================================================================
// Funções auxiliares para trabalhar com os dados

/**
 * ⏱️ SIMULAR DELAY DE API
 * Simula o tempo que uma API real levaria para responder
 * Usado para tornar o desenvolvimento mais realista
 */
export const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * 🆔 GERAR ID ÚNICO
 * Cria um ID único para novos registros
 * Em produção, o ID seria gerado pelo banco de dados
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * 📅 FORMATAR DATA PARA EXIBIÇÃO
 * Converte datas em formato legível para o usuário brasileiro
 * Exemplo: "2024-01-15T10:00:00Z" vira "15/01/2024, 10:00"
 */
export const formatDate = (date: Date | string): string => {
  if (!date) return '';                    // Se não tem data, retorna vazio
  const d = new Date(date);               // Converte para objeto Date
  return d.toLocaleDateString('pt-BR', {  // Formata no padrão brasileiro
    year: 'numeric',    // Ano com 4 dígitos
    month: '2-digit',   // Mês com 2 dígitos
    day: '2-digit',     // Dia com 2 dígitos
    hour: '2-digit',    // Hora com 2 dígitos
    minute: '2-digit'   // Minuto com 2 dígitos
  });
};

/**
 * 🏷️ FORMATAR STATUS PARA EXIBIÇÃO
 * Converte o status do agente em label e cor para a interface
 * Retorna: { label: "Ativo", color: "green" }
 */
export const formatStatus = (status: string): { label: string; color: string } => {
  // Mapa que relaciona cada status com sua apresentação visual
  const statusMap: Record<string, { label: string; color: string }> = {
    [AGENT_STATUS.ACTIVE]: { label: 'Ativo', color: 'green' },      // Verde para ativo
    [AGENT_STATUS.INACTIVE]: { label: 'Inativo', color: 'gray' },   // Cinza para inativo
    [AGENT_STATUS.PENDING]: { label: 'Pendente', color: 'yellow' }, // Amarelo para pendente
    [AGENT_STATUS.SUSPENDED]: { label: 'Suspenso', color: 'red' }   // Vermelho para suspenso
  };
  
  // Retorna a configuração do status ou um padrão se não encontrar
  return statusMap[status] || { label: status, color: 'gray' };
};
