import type { CRUDConfig } from '../../types/crud';
import type { Agent } from '../../types/entities/agent';
import { 
  AGENT_STATUS_OPTIONS, 
  DEPARTMENT_OPTIONS, 
  ROLE_OPTIONS 
} from '../../types/entities/agent';
import { formatDate, formatStatus } from '../../data/mockAgents';

// Re-exportar o tipo Agent para uso externo
export type { Agent } from '../../types/entities/agent';

// Configuração completa do CRUD de agentes
export const agentConfig: CRUDConfig<Agent> = {
  entity: 'agents',
  title: 'Agentes',
  description: 'Gerenciamento de agentes do sistema',
  
  // Configuração da tabela
  table: {
    columns: [
      { 
        key: 'id', 
        label: 'ID', 
        sortable: true, 
        width: '80px'
      },
      { 
        key: 'name', 
        label: 'Nome', 
        sortable: true
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
        render: (value: unknown) => {
          const { label, color } = formatStatus(String(value || ''));
          const colorClasses = {
            green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
            red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
            yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
            gray: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
          };
          
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
        render: (value: unknown) => {
          const dateValue = value as string | null;
          if (!dateValue) return <span className="text-gray-400">Nunca</span>;
          return <span>{formatDate(dateValue)}</span>;
        }
      },
      { 
        key: 'createdAt', 
        label: 'Criado em', 
        sortable: true,
        render: (value: unknown) => formatDate(String(value || ''))
      }
    ],
    defaultSort: {
      field: 'createdAt',
      direction: 'desc'
    },
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 50]
  },
  
  // Configuração dos filtros
  filters: [
    { 
      key: 'name', 
      label: 'Nome', 
      type: 'text',
      placeholder: 'Filtrar por nome'
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
      type: 'select',
      options: AGENT_STATUS_OPTIONS
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
        { value: '', label: 'Todos os departamentos' },
        ...DEPARTMENT_OPTIONS
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
        type: 'date'
      }
    ],
  
  // Configurações de comportamento
  behavior: {
    enableCreate: true,
    enableEdit: true,
    enableDelete: true,
    enableSearch: true,
    searchFields: ['name', 'email', 'company']
  }
};
