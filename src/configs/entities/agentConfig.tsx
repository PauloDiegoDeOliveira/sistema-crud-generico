// ============================================================================
// CONFIGURAÇÃO DO CRUD DE AGENTES
// ============================================================================
// Este arquivo é um EXEMPLO de como configurar um CRUD
// Aqui você define: colunas da tabela, filtros, comportamentos, etc.

// Importa os tipos necessários para criar a configuração
import type { CRUDConfig } from '../../types/crud';           // Tipo base para configuração
import type { Agent } from '../../types/entities/agent';       // Tipo da entidade Agent
import { 
  AGENT_STATUS_OPTIONS,    // Opções de status (ativo, inativo, etc.)
  DEPARTMENT_OPTIONS,      // Opções de departamento (vendas, TI, etc.)
  ROLE_OPTIONS            // Opções de cargo (gerente, agente, etc.)
} from '../../types/entities/agent';
import { formatDate, formatStatus } from '../../data/mockAgents'; // Funções para formatar dados

// Re-exporta o tipo Agent para outros arquivos poderem usar
export type { Agent } from '../../types/entities/agent';

/**
 * 🎯 CONFIGURAÇÃO COMPLETA DO CRUD DE AGENTES
 * Esta configuração diz ao sistema genérico:
 * - Quais colunas mostrar na tabela
 * - Quais filtros disponibilizar
 * - Como formatar os dados
 * - Quais ações permitir (criar, editar, excluir)
 */
export const agentConfig: CRUDConfig<Agent> = {
  // 📋 Informações básicas do CRUD
  entity: 'agents',                                    // Nome da entidade (usado para URLs, etc.)
  title: 'Agentes',                                   // Título mostrado na página
  description: 'Gerenciamento de agentes do sistema', // Descrição opcional
  
  // 📊 CONFIGURAÇÃO DA TABELA
  table: {
    // 📋 Definição das colunas da tabela
    columns: [
      { 
        key: 'id',          // Campo da entidade que será mostrado
        label: 'ID',        // Texto do cabeçalho da coluna
        sortable: true,     // Se pode ordenar por esta coluna
        width: '80px'       // Largura fixa da coluna
      },
      { 
        key: 'name',        // Campo 'name' da entidade Agent
        label: 'Nome',      // Cabeçalho será "Nome"
        sortable: true      // Permite ordenação por nome
      },
      { 
        key: 'email', 
        label: 'Email', 
        sortable: true
      },
      { 
        key: 'company', 
        label: 'Empresa', 
        sortable: true
      },
      { 
        key: 'department', 
        label: 'Departamento', 
        sortable: true
      },
      { 
        key: 'status', 
        label: 'Status', 
        sortable: true,
        // 🎨 PERSONALIZAÇÃO: como mostrar o status com cores
        render: (value: unknown) => {
          // Usa a função formatStatus para pegar label e cor
          const { label, color } = formatStatus(String(value || ''));
          
          // Define classes CSS para cada cor
          const colorClasses = {
            green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
            red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
            yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
            gray: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
          };
          
          // Retorna um badge colorido com o status
          return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses[color as keyof typeof colorClasses]}`}>
              {label}
            </span>
          );
        }
      },
      { 
        key: 'lastLogin', 
        label: 'Último Login', 
        sortable: true,
        // 🎨 PERSONALIZAÇÃO: como mostrar a data do último login
        render: (value: unknown) => {
          const dateValue = value as string | null;
          // Se nunca fez login, mostra "Nunca"
          if (!dateValue) return <span className="text-gray-400">Nunca</span>;
          // Se tem data, formata e mostra
          return <span>{formatDate(dateValue)}</span>;
        }
      },
      { 
        key: 'createdAt', 
        label: 'Criado em', 
        sortable: true,
        // 🎨 PERSONALIZAÇÃO: formata a data de criação
        render: (value: unknown) => formatDate(String(value || ''))
      }
    ],
    
    // 📈 Configurações padrão da tabela
    defaultSort: {
      field: 'createdAt',  // Ordenar por data de criação por padrão
      direction: 'desc'    // Do mais recente para o mais antigo
    },
    pageSize: 10,                    // Mostrar 10 itens por página
    pageSizeOptions: [5, 10, 25, 50] // Opções de itens por página
  },
  
  // 🔍 CONFIGURAÇÃO DOS FILTROS
  // Estes filtros aparecerão acima da tabela para o usuário filtrar os dados
  filters: [
    { 
      key: 'name',                    // Filtrar pelo campo 'name'
      label: 'Nome',                  // Rótulo do filtro
      type: 'text',                   // Tipo: campo de texto
      placeholder: 'Filtrar por nome' // Texto de exemplo no input
    },
    { 
      key: 'email', 
      label: 'Email', 
      type: 'text',
      placeholder: 'Filtrar por email'
    },
    { 
      key: 'status', 
      label: 'Status', 
      type: 'select',                 // Tipo: dropdown de seleção
      options: AGENT_STATUS_OPTIONS   // Opções vêm de agent.ts
    },
    { 
      key: 'company', 
      label: 'Empresa', 
      type: 'text',
      placeholder: 'Filtrar por empresa'
    },
    { 
      key: 'department', 
      label: 'Departamento', 
      type: 'select',
      options: [
        { value: '', label: 'Todos os departamentos' }, // Opção para "todos"
        ...DEPARTMENT_OPTIONS                           // Spread das opções de departamento
      ]
    },
    { 
      key: 'role', 
      label: 'Cargo', 
      type: 'select',
      options: [
        { value: '', label: 'Todos os cargos' },
        ...ROLE_OPTIONS
      ]
    },
    { 
      key: 'createdAt', 
      label: 'Período de Criação', 
      type: 'date'              // Tipo: seletor de data
    }
  ],
  
  // ⚙️ CONFIGURAÇÕES DE COMPORTAMENTO
  // Define o que o usuário pode fazer neste CRUD
  behavior: {
    enableCreate: true,                    // Permitir criar novos agentes
    enableEdit: true,                      // Permitir editar agentes existentes
    enableDelete: true,                    // Permitir excluir agentes
    enableSearch: true,                    // Permitir busca global
    searchFields: ['name', 'email', 'company'] // Campos onde a busca funciona
  }
};
