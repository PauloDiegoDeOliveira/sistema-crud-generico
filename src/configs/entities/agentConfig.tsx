import type { CRUDConfig } from '../../types/crud';
import type { Agent } from '../../types/entities/agent';
import { 
  AGENT_STATUS_OPTIONS, 
  DEPARTMENT_OPTIONS, 
  ROLE_OPTIONS 
} from '../../types/entities/agent';
import { formatDate, formatStatus } from '../../data/mockAgents';

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
        width: '80px',
        render: 'text'
      },
      { 
        key: 'name', 
        label: 'Nome', 
        sortable: true,
        render: 'text'
      },
      { 
        key: 'email', 
        label: 'Email', 
        sortable: true,
        render: 'text'
      },
      { 
        key: 'company', 
        label: 'Empresa', 
        sortable: true,
        render: 'text'
      },
      { 
        key: 'department', 
        label: 'Departamento', 
        sortable: true,
        render: 'text'
      },
      { 
        key: 'status', 
        label: 'Status', 
        sortable: true,
        render: 'custom',
        renderFunction: (value: unknown) => {
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
        render: 'custom',
        renderFunction: (value: unknown) => {
          const dateValue = value as string | null;
          if (!dateValue) return <span className="text-gray-400">Nunca</span>;
          return <span>{formatDate(dateValue)}</span>;
        }
      },
      { 
        key: 'createdAt', 
        label: 'Criado em', 
        sortable: true,
        render: 'custom',
        renderFunction: (value: unknown) => formatDate(String(value || ''))
      }
    ],
    actions: ['view', 'edit', 'delete'],
    pagination: {
      enabled: true,
      pageSize: 10,
      pageSizeOptions: [5, 10, 25, 50]
    },
    sorting: {
      enabled: true,
      defaultSort: {
        key: 'createdAt',
        direction: 'desc'
      }
    }
  },
  
  // Configuração do formulário
  form: {
    fields: [
      { 
        name: 'name', 
        label: 'Nome Completo', 
        type: 'text', 
        required: true,
        placeholder: 'Digite o nome completo',
        grid: { cols: 6 }
      },
      { 
        name: 'email', 
        label: 'Email', 
        type: 'email', 
        required: true,
        placeholder: 'email@empresa.com',
        grid: { cols: 6 }
      },
      { 
        name: 'phone', 
        label: 'Telefone', 
        type: 'tel',
        placeholder: '(11) 99999-9999',
        grid: { cols: 4 }
      },
      { 
        name: 'document', 
        label: 'CPF/CNPJ', 
        type: 'text',
        placeholder: '000.000.000-00',
        grid: { cols: 4 }
      },
      { 
        name: 'status', 
        label: 'Status', 
        type: 'select', 
        required: true,
        options: AGENT_STATUS_OPTIONS,
        grid: { cols: 4 }
      },
      { 
        name: 'company', 
        label: 'Empresa', 
        type: 'text',
        placeholder: 'Nome da empresa',
        grid: { cols: 6 }
      },
      { 
        name: 'department', 
        label: 'Departamento', 
        type: 'select',
        options: DEPARTMENT_OPTIONS,
        grid: { cols: 3 }
      },
      { 
        name: 'role', 
        label: 'Cargo', 
        type: 'select',
        options: ROLE_OPTIONS,
        grid: { cols: 3 }
      },
      { 
        name: 'notes', 
        label: 'Observações', 
        type: 'textarea',
        placeholder: 'Observações adicionais sobre o agente...',
        grid: { cols: 12 }
      }
    ],
    layout: 'grid',
    submitText: 'Salvar Agente',
    cancelText: 'Cancelar',
    validation: 'onBlur'
  },
  
  // Configuração dos filtros
  filters: {
    fields: [
      { 
        name: 'name', 
        label: 'Nome', 
        type: 'text',
        placeholder: 'Filtrar por nome'
      },
      { 
        name: 'email', 
        label: 'Email', 
        type: 'text',
        placeholder: 'Filtrar por email'
      },
      { 
        name: 'status', 
        label: 'Status', 
        type: 'multiselect',
        options: AGENT_STATUS_OPTIONS
      },
      { 
        name: 'company', 
        label: 'Empresa', 
        type: 'text',
        placeholder: 'Filtrar por empresa'
      },
      { 
        name: 'department', 
        label: 'Departamento', 
        type: 'select',
        options: [
          { value: '', label: 'Todos os departamentos' },
          ...DEPARTMENT_OPTIONS
        ]
      },
      { 
        name: 'role', 
        label: 'Cargo', 
        type: 'select',
        options: [
          { value: '', label: 'Todos os cargos' },
          ...ROLE_OPTIONS
        ]
      },
      { 
        name: 'dateRange', 
        label: 'Período de Criação', 
        type: 'date'
      }
    ],
    layout: 'grid',
    searchPlaceholder: 'Buscar agentes...',
    resetText: 'Limpar Filtros',
    applyText: 'Aplicar Filtros'
  },
  
  // Configurações de comportamento
  permissions: {
    create: true,
    read: true,
    update: true,
    delete: true
  },
  
  // Configurações de API
  api: {
    baseUrl: '/api',
    endpoints: {
      list: '/agents',
      create: '/agents',
      update: '/agents/:id',
      delete: '/agents/:id',
      show: '/agents/:id'
    }
  },
  
  // Configurações de UI
  ui: {
    showSearch: true,
    showFilters: true,
    showExport: true,
    showImport: false,
    compactMode: false
  }
};
