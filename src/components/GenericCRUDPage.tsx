// ============================================================================
// COMPONENTE GENÉRICO DE CRUD
// ============================================================================

import { 
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import type { BaseEntity, GenericCRUDPageProps, UseGenericCRUD, TableColumn, FilterField, SelectOption } from '../types/crud';

/**
 * 🎯 COMPONENTE CRUD GENÉRICO
 * Este é o componente "mágico" que renderiza qualquer CRUD
 * Você só passa uma configuração e ele monta tudo automaticamente:
 * 
 * - Header com título e botão de criar
 * - Barra de busca
 * - Filtros configuráveis
 * - Tabela com colunas configuráveis  
 * - Paginação automática
 * - Botões de ação (editar, excluir, visualizar)
 * 
 * COMO USAR:
 * <GenericCRUDPage config={agentConfig} crud={agentCrud} />
 */
export function GenericCRUDPage<T extends BaseEntity>({ 
  config,          // Configuração do CRUD (colunas, filtros, título, etc.)
  crud,           // Hook com estado e ações do CRUD
  className = '',
  style 
}: GenericCRUDPageProps<T> & { crud: UseGenericCRUD<T> }) {
  
  const { state, actions } = crud; // Extrai estado e ações do hook

  // 📄 Calcular dados da página atual (paginação)
  const startIndex = (state.currentPage - 1) * state.pageSize;
  const paginatedItems = state.filteredItems.slice(startIndex, startIndex + state.pageSize);

  /**
   * Renderizar valor da célula com base na configuração
   */
  const renderCellValue = (value: unknown, row: T, column: TableColumn<T>) => {
    if (column.render) {
      return column.render(value, row);
    }

    // Renderização padrão por tipo
    if (typeof value === 'boolean') {
      return value ? '✓' : '✗';
    }

    if (value instanceof Date) {
      return value.toLocaleDateString('pt-BR');
    }

    if (typeof value === 'number' && column.key.toString().includes('sales')) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value);
    }

    return String(value || '');
  };

  /**
   * Renderizar badge de status
   */
  const renderStatusBadge = (status: string) => {
    const isActive = status === 'active';
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
        isActive 
          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800'
          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800'
      }`}>
        {isActive ? '✓ Ativo' : '✗ Inativo'}
      </span>
    );
  };

  /**
   * Renderizar filtro baseado no tipo
   */
  const renderFilter = (filter: FilterField<T>) => {
    const value = state.filters[String(filter.key)] || '';

    switch (filter.type) {
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => actions.setFilters({ ...state.filters, [filter.key]: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos</option>
            {filter.options?.map((option: SelectOption) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'number':
        return (
          <input
            type="number"
            placeholder={filter.placeholder}
            value={value}
            onChange={(e) => actions.setFilters({ ...state.filters, [filter.key]: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        );

      default:
        return (
          <input
            type="text"
            placeholder={filter.placeholder}
            value={value}
            onChange={(e) => actions.setFilters({ ...state.filters, [filter.key]: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        );
    }
  };

  /**
   * Lidar com ordenação
   */
  const handleSort = (field: keyof T) => {
    const column = config.table.columns.find(col => col.key === field);
    if (!column?.sortable) return;

    const newDirection = state.sortField === field && state.sortDirection === 'asc' ? 'desc' : 'asc';
    actions.setSorting(field, newDirection);
  };

  return (
    <div className={`p-3 sm:p-4 lg:p-6 xl:p-8 space-y-4 sm:space-y-6 ${className}`} style={style}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            {config.icon && <config.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />}
            {config.title}
          </h1>
          {config.description && (
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
              {config.description}
            </p>
          )}
        </div>

        {config.behavior?.enableCreate !== false && (
          <button className="btn-primary inline-flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start">
            <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">Novo {config.title.slice(0, -1)}</span>
            <span className="xs:hidden">Novo</span>
          </button>
        )}
      </div>

      {/* Busca e Filtros */}
      <div className="card p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {config.behavior?.enableSearch !== false && (
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder={`Buscar ${config.title.toLowerCase()}...`}
                value={state.searchTerm}
                onChange={(e) => actions.setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
          )}
          
          {config.filters && config.filters.length > 0 && (
            <button 
              onClick={actions.toggleFilters}
              className="btn-secondary inline-flex items-center gap-2 text-sm sm:text-base justify-center"
            >
              <FunnelIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden xs:inline">Filtros</span>
              <span className="xs:hidden">Filtrar</span>
            </button>
          )}
        </div>

        {/* Painel de Filtros Avançados */}
        {state.showFilters && config.filters && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
              {config.filters.map((filter) => (
                <div key={String(filter.key)}>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    {filter.label}
                  </label>
                  {renderFilter(filter)}
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
              <button
                onClick={actions.clearFilters}
                className="btn-secondary order-2 sm:order-1"
              >
                Limpar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="stats-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Total de {config.title}
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1">
                {state.totalItems}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela */}
      <div className="card overflow-hidden">
        {/* Header da Tabela */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
              Lista de {config.title}
            </h3>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
              <span className="font-semibold text-gray-900 dark:text-white">{state.totalItems}</span> {config.title.toLowerCase()} encontrados
            </p>
            
            <select
              value={state.pageSize}
              onChange={(e) => actions.setPageSize(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-xs sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[120px] sm:min-w-[140px]"
            >
              {(config.table.pageSizeOptions || [10, 25, 50]).map(size => (
                <option key={size} value={size}>{size} por página</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabela Desktop */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {config.table.columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${
                      column.sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600' : ''
                    }`}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center gap-1">
                      {column.label}
                      {column.sortable && (
                        <ChevronUpDownIcon className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  {config.table.columns.map((column) => (
                    <td key={String(column.key)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {column.key === 'status' ? 
                        renderStatusBadge(String(item[column.key])) : 
                        renderCellValue(item[column.key], item, column)
                      }
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      {config.behavior?.enableEdit !== false && (
                        <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                          <PencilIcon className="w-4 h-4" />
                        </button>
                      )}
                      {config.behavior?.enableDelete !== false && (
                        <button 
                          onClick={() => actions.delete(item.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards Mobile */}
        <div className="block sm:hidden">
          {paginatedItems.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              Nenhum item encontrado
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedItems.map((item) => (
                <div key={item.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  {config.table.columns.slice(0, 3).map((column) => (
                    <div key={String(column.key)} className="flex justify-between items-center py-1">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {column.label}:
                      </span>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {column.key === 'status' ? 
                          renderStatusBadge(String(item[column.key])) : 
                          renderCellValue(item[column.key], item, column)
                        }
                      </span>
                    </div>
                  ))}
                  
                  <div className="flex justify-end gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                      <EyeIcon className="w-4 h-4" />
                    </button>
                    {config.behavior?.enableEdit !== false && (
                      <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                    )}
                    {config.behavior?.enableDelete !== false && (
                      <button 
                        onClick={() => actions.delete(item.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Paginação */}
        {state.totalPages > 1 && (
          <div className="px-4 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => actions.setPage(Math.max(1, state.currentPage - 1))}
                  disabled={state.currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                <button
                  onClick={() => actions.setPage(Math.min(state.totalPages, state.currentPage + 1))}
                  disabled={state.currentPage === state.totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Próxima
                </button>
              </div>
              
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Mostrando <span className="font-medium">{startIndex + 1}</span> a{' '}
                    <span className="font-medium">
                      {Math.min(startIndex + state.pageSize, state.totalItems)}
                    </span>{' '}
                    de <span className="font-medium">{state.totalItems}</span> resultados
                  </p>
                </div>
                
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => actions.setPage(1)}
                      disabled={state.currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronDoubleLeftIcon className="h-5 w-5" />
                    </button>
                    
                    <button
                      onClick={() => actions.setPage(Math.max(1, state.currentPage - 1))}
                      disabled={state.currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeftIcon className="h-5 w-5" />
                    </button>
                    
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      {state.currentPage} de {state.totalPages}
                    </span>
                    
                    <button
                      onClick={() => actions.setPage(Math.min(state.totalPages, state.currentPage + 1))}
                      disabled={state.currentPage === state.totalPages}
                      className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRightIcon className="h-5 w-5" />
                    </button>
                    
                    <button
                      onClick={() => actions.setPage(state.totalPages)}
                      disabled={state.currentPage === state.totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronDoubleRightIcon className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Loading State */}
      {state.loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-gray-900 dark:text-white">Carregando...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {state.error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-2">
            <span>❌ {state.error}</span>
            <button
              onClick={() => actions.clearError()}
              className="ml-2 text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
