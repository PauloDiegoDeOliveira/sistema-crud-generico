import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronUpIcon, 
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { Button, Input, Modal } from './Button';
import { clsx } from 'clsx';

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  title: string;
  sortable?: boolean;
  render?: (value: unknown, record: T) => React.ReactNode;
  width?: string;
}

export interface TableAction<T = Record<string, unknown>> {
  key: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick: (record: T) => void;
  variant?: 'primary' | 'secondary' | 'danger';
  show?: (record: T) => boolean;
}

interface TableProps<T = Record<string, unknown>> {
  data: T[];
  columns: TableColumn<T>[];
  actions?: TableAction<T>[];
  loading?: boolean;
  onAdd?: () => void;
  searchable?: boolean;
  filterable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  title?: string;
  className?: string;
}

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export const Table = <T extends Record<string, unknown>>({
  data,
  columns,
  actions = [],
  loading = false,
  onAdd,
  searchable = true,
  filterable = true,
  pagination = true,
  pageSize = 10,
  title,
  className
}: TableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Filter data based on search term
  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    // Converter para string para comparação segura
    const aStr = String(aValue || '');
    const bStr = String(bValue || '');
    
    if (aStr < bStr) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aStr > bStr) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = pagination 
    ? sortedData.slice(startIndex, startIndex + pageSize)
    : sortedData;

  const handleSort = (key: string) => {
    setSortConfig(current => {
      if (current?.key === key) {
        return current.direction === 'asc' 
          ? { key, direction: 'desc' }
          : null;
      }
      return { key, direction: 'asc' };
    });
  };

  const defaultActions: TableAction<T>[] = [
    {
      key: 'view',
      label: 'Visualizar',
      icon: EyeIcon,
      onClick: () => {},
      variant: 'secondary'
    },
    {
      key: 'edit',
      label: 'Editar',
      icon: PencilIcon,
      onClick: () => {},
      variant: 'primary'
    },
    {
      key: 'delete',
      label: 'Excluir',
      icon: TrashIcon,
      onClick: () => {},
      variant: 'danger'
    }
  ];

  const allActions = actions.length > 0 ? actions : defaultActions;

  return (
    <div className={clsx('space-y-4 sm:space-y-6', className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          {title && (
            <h2 className="text-xl sm:text-2xl font-bold gradient-text">
              {title}
            </h2>
          )}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {filteredData.length} {filteredData.length === 1 ? 'registro' : 'registros'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          {searchable && (
            <div className="relative flex-1 sm:flex-none">
              <Input
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<MagnifyingGlassIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                className="w-full sm:w-64"
              />
            </div>
          )}
          
          <div className="flex gap-2 sm:gap-3">
            {filterable && (
              <Button
                variant="secondary"
                size="md"
                onClick={() => setShowFilters(true)}
                className="flex items-center gap-2 flex-1 sm:flex-none justify-center"
              >
                <AdjustmentsHorizontalIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline">Filtros</span>
                <span className="xs:hidden">Filtrar</span>
              </Button>
            )}

            {onAdd && (
              <Button
                variant="primary"
                size="md"
                onClick={onAdd}
                className="flex items-center gap-2 flex-1 sm:flex-none justify-center"
              >
                <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline">Adicionar</span>
                <span className="xs:hidden">Novo</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        {/* Mobile Cards View */}
        <div className="block sm:hidden">
          {loading ? (
            <div className="p-6 text-center">
              <div className="flex items-center justify-center gap-3">
                <div className="loading-spinner w-6 h-6" />
                <span className="text-slate-500 dark:text-slate-400">Carregando...</span>
              </div>
            </div>
          ) : paginatedData.length === 0 ? (
            <div className="p-6 text-center">
              <div className="text-slate-500 dark:text-slate-400">
                {searchTerm ? 'Nenhum registro encontrado' : 'Nenhum registro para exibir'}
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {paginatedData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200"
                >
                  <div className="space-y-2">
                    {columns.slice(0, 3).map((column) => (
                      <div key={column.key} className="flex justify-between items-start">
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          {column.title}
                        </span>
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100 text-right">
                          {column.render ? column.render(item[column.key], item) : String(item[column.key] || '')}
                        </div>
                      </div>
                    ))}
                    {allActions.length > 0 && (
                      <div className="flex items-center justify-end gap-1 mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                        {allActions.map((action) => {
                          const Icon = action.icon;
                          const shouldShow = action.show ? action.show(item) : true;
                          
                          if (!shouldShow) return null;
                          
                          return (
                            <Button
                              key={action.key}
                              variant={action.variant || 'secondary'}
                              size="sm"
                              onClick={() => action.onClick(item)}
                              className="flex items-center gap-1"
                            >
                              <Icon className="w-4 h-4" />
                            </Button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="table-header">
              <tr>
                {columns.map((column, index) => (
                  <motion.th
                    key={column.key}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={clsx(
                      'px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium uppercase tracking-wider',
                      column.sortable && 'cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors duration-200',
                      column.width && `w-${column.width}`
                    )}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center gap-2">
                      <span>{column.title}</span>
                      {column.sortable && (
                        <div className="flex flex-col">
                          <ChevronUpIcon 
                            className={clsx(
                              'w-3 h-3 transition-colors duration-200',
                              sortConfig?.key === column.key && sortConfig.direction === 'asc'
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-slate-400 dark:text-slate-600'
                            )}
                          />
                          <ChevronDownIcon 
                            className={clsx(
                              'w-3 h-3 -mt-1 transition-colors duration-200',
                              sortConfig?.key === column.key && sortConfig.direction === 'desc'
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-slate-400 dark:text-slate-600'
                            )}
                          />
                        </div>
                      )}
                    </div>
                  </motion.th>
                ))}
                {allActions.length > 0 && (
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Ações
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={columns.length + (allActions.length > 0 ? 1 : 0)} className="px-4 sm:px-6 py-12 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <div className="loading-spinner w-6 h-6" />
                      <span className="text-slate-500 dark:text-slate-400">Carregando...</span>
                    </div>
                  </td>
                </tr>
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + (allActions.length > 0 ? 1 : 0)} className="px-4 sm:px-6 py-12 text-center">
                    <div className="text-slate-500 dark:text-slate-400">
                      {searchTerm ? 'Nenhum registro encontrado' : 'Nenhum registro para exibir'}
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedData.map((item, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="table-row"
                  >
                    {columns.map((column) => (
                      <td key={column.key} className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {column.render ? column.render(item[column.key], item) : String(item[column.key] || '')}
                        </div>
                      </td>
                    ))}
                    {allActions.length > 0 && (
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-1 sm:gap-2">
                          {allActions.map((action) => {
                            const Icon = action.icon;
                            const shouldShow = action.show ? action.show(item) : true;
                            
                            if (!shouldShow) return null;
                            
                            return (
                              <Button
                                key={action.key}
                                variant={action.variant || 'secondary'}
                                size="sm"
                                onClick={() => action.onClick(item)}
                                className="flex items-center gap-1"
                              >
                                <Icon className="w-4 h-4" />
                                <span className="hidden md:inline">{action.label}</span>
                              </Button>
                            );
                          })}
                        </div>
                      </td>
                    )}
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && totalPages > 1 && (
          <div className="px-3 sm:px-6 py-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 text-center sm:text-left">
                Mostrando {startIndex + 1} a {Math.min(startIndex + pageSize, sortedData.length)} de {sortedData.length} registros
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="px-2 sm:px-3"
                >
                  <span className="hidden sm:inline">Anterior</span>
                  <span className="sm:hidden">Ant</span>
                </Button>
                
                {/* Desktop pagination */}
                <div className="hidden sm:flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      size="sm"
                      variant={currentPage === page ? 'primary' : 'secondary'}
                      onClick={() => setCurrentPage(page)}
                      className="min-w-[2rem]"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                
                {/* Mobile pagination */}
                <div className="flex sm:hidden items-center gap-1">
                  <span className="text-xs text-slate-600 dark:text-slate-400 px-2">
                    {currentPage} / {totalPages}
                  </span>
                </div>
                
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="px-2 sm:px-3"
                >
                  <span className="hidden sm:inline">Próxima</span>
                  <span className="sm:hidden">Prox</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filters Modal */}
      <Modal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        title="Filtros Avançados"
        size="lg"
      >
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-400">
            Filtros avançados serão implementados aqui conforme necessário.
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setShowFilters(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={() => setShowFilters(false)}
            >
              Aplicar Filtros
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
