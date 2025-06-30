import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin: string;
  sales: number;
}

// Dados mockados mais robustos
const generateMockAgents = (): Agent[] => {
  const names = [
    'João Silva', 'Maria Santos', 'Pedro Costa', 'Ana Oliveira', 'Carlos Lima',
    'Fernanda Alves', 'Ricardo Souza', 'Juliana Pereira', 'Roberto Ferreira',
    'Camila Rodrigues', 'Marcos Araújo', 'Luciana Martins', 'Eduardo Barbosa',
    'Patrícia Ribeiro', 'Alexandre Carvalho', 'Beatriz Nascimento', 'Felipe Gomes',
    'Adriana Silva', 'Rafael Torres', 'Mônica Costa', 'Diego Santos', 'Larissa Lima',
    'Bruno Oliveira', 'Gabriela Almeida', 'Thiago Moreira', 'Vanessa Cardoso',
    'Leonardo Dias', 'Cristina Rocha', 'Gustavo Pinto', 'Renata Fernandes'
  ];
  
  const departments = ['Vendas', 'Marketing', 'TI', 'RH', 'Financeiro', 'Operações'];
  
  return names.map((name, index) => ({
    id: (index + 1).toString(),
    name,
    email: `${name.toLowerCase().replace(' ', '.')}@empresa.com`,
    phone: `(11) ${String(Math.floor(Math.random() * 90000) + 10000).slice(0, 5)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
    department: departments[Math.floor(Math.random() * departments.length)],
    status: Math.random() > 0.3 ? 'active' : 'inactive',
    createdAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    sales: Math.floor(Math.random() * 100000)
  }));
};

type SortField = keyof Agent;
type SortDirection = 'asc' | 'desc';

interface FilterState {
  department: string;
  status: string;
  dateFrom: string;
  dateTo: string;
  salesMin: string;
  salesMax: string;
  lastLoginDays: string;
}

export const AgentsPage: React.FC = () => {
  const [agents] = useState<Agent[]>(generateMockAgents());
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<string>('');
  const [selectedEndDate, setSelectedEndDate] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const datePickerRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState<FilterState>({
    department: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    salesMin: '',
    salesMax: '',
    lastLoginDays: ''
  });

  // Fechar dropdown de data ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Função para aplicar filtros (mock)
  const applyFilters = () => {
    // Mock: aqui você implementaria a lógica de filtragem real
    console.log('Aplicando filtros:', filters);
    setShowFilters(false);
  };

  // Função para limpar filtros
  const clearFilters = () => {
    setFilters({
      department: '',
      status: '',
      dateFrom: '',
      dateTo: '',
      salesMin: '',
      salesMax: '',
      lastLoginDays: ''
    });
    setSelectedStartDate('');
    setSelectedEndDate('');
  };

  // Função para gerar os dias do calendário
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();
    
    const days = [];
    
    // Dias do mês anterior (para preencher o início)
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate.getDate(),
        month: 'prev',
        fullDate: prevDate.toISOString().split('T')[0]
      });
    }
    
    // Dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      days.push({
        date: day,
        month: 'current',
        fullDate: currentDate.toISOString().split('T')[0]
      });
    }
    
    // Dias do próximo mês (para preencher o final)
    const remainingDays = 42 - days.length; // 6 semanas x 7 dias
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({
        date: day,
        month: 'next',
        fullDate: nextDate.toISOString().split('T')[0]
      });
    }
    
    return days;
  };

  // Função para lidar com clique em um dia
  const handleDayClick = (fullDate: string) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      // Primeira seleção ou reset
      setSelectedStartDate(fullDate);
      setSelectedEndDate('');
      setFilters({ ...filters, dateFrom: fullDate, dateTo: '' });
    } else if (selectedStartDate && !selectedEndDate) {
      // Segunda seleção
      if (fullDate >= selectedStartDate) {
        setSelectedEndDate(fullDate);
        setFilters({ ...filters, dateFrom: selectedStartDate, dateTo: fullDate });
        setTimeout(() => setShowDatePicker(false), 200);
      } else {
        // Se selecionou uma data anterior, trocar
        setSelectedStartDate(fullDate);
        setSelectedEndDate('');
        setFilters({ ...filters, dateFrom: fullDate, dateTo: '' });
      }
    }
  };

  // Filtrar e ordenar agentes
  const filteredAndSortedAgents = useMemo(() => {
    const filtered = agents.filter(agent =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [agents, searchTerm, sortField, sortDirection]);

  // Paginação
  const totalPages = Math.ceil(filteredAndSortedAgents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAgents = filteredAndSortedAgents.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
        ✓ Ativo
      </span>
    ) : (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800">
        ✗ Inativo
      </span>
    );
  };

  return (
    <div className="p-3 sm:p-4 lg:p-6 xl:p-8 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Agentes</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
            Gerencie os agentes do sistema
          </p>
        </div>

        <button className="btn-primary inline-flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start">
          <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden xs:inline">Novo Agente</span>
          <span className="xs:hidden">Novo</span>
        </button>
      </div>

      {/* Filters */}
      <div className="card p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar agentes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary inline-flex items-center gap-2 text-sm sm:text-base justify-center"
          >
            <FunnelIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">Filtros</span>
            <span className="xs:hidden">Filtrar</span>
          </button>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="card p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
              Filtros Avançados
            </h3>
            <button
              onClick={() => setShowFilters(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                Departamento
              </label>
              <select
                value={filters.department}
                onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Todos</option>
                <option value="Vendas">Vendas</option>
                <option value="Marketing">Marketing</option>
                <option value="TI">TI</option>
                <option value="RH">RH</option>
                <option value="Financeiro">Financeiro</option>
                <option value="Operações">Operações</option>
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Todos</option>
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                Período
              </label>
              <div className="relative" ref={datePickerRef}>
                <input
                  type="text"
                  value={
                    filters.dateFrom && filters.dateTo 
                      ? `${filters.dateFrom} até ${filters.dateTo}`
                      : ''
                  }
                  placeholder="Selecionar período"
                  readOnly
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="w-full px-3 py-2 pr-8 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                  </svg>
                </div>
                
                {/* Calendário Visual - Responsivo */}
                {showDatePicker && (
                  <div className="absolute top-full left-0 right-0 sm:right-auto mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 p-3 sm:p-4 min-w-[280px] sm:min-w-[320px]">
                    {/* Header do Calendário */}
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <button
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                      </button>
                      <h3 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white">
                        {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                      </h3>
                      <button
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>

                    {/* Dias da Semana */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                        <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-1 sm:py-2">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Dias do Calendário */}
                    <div className="grid grid-cols-7 gap-1">
                      {generateCalendarDays().map((day, index) => {
                        const isSelected = day.fullDate === selectedStartDate || day.fullDate === selectedEndDate;
                        const isInRange = selectedStartDate && selectedEndDate && 
                          day.fullDate >= selectedStartDate && day.fullDate <= selectedEndDate;
                        const isCurrentMonth = day.month === 'current';
                        const isToday = day.fullDate === new Date().toISOString().split('T')[0];

                        return (
                          <button
                            key={index}
                            onClick={() => handleDayClick(day.fullDate)}
                            className={`
                              w-6 h-6 sm:w-8 sm:h-8 text-xs sm:text-sm rounded-lg transition-all duration-200 flex items-center justify-center
                              ${!isCurrentMonth 
                                ? 'text-gray-300 dark:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700' 
                                : 'text-gray-900 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/20'
                              }
                              ${isSelected 
                                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                                : ''
                              }
                              ${isInRange && !isSelected 
                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200' 
                                : ''
                              }
                              ${isToday && !isSelected 
                                ? 'ring-2 ring-blue-500 font-bold' 
                                : ''
                              }
                            `}
                          >
                            {day.date}
                          </button>
                        );
                      })}
                    </div>

                    {/* Footer do Calendário */}
                    <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {selectedStartDate && selectedEndDate 
                            ? `${selectedStartDate} até ${selectedEndDate}`
                            : selectedStartDate 
                              ? `Selecionado: ${selectedStartDate}`
                              : 'Selecione o período'
                          }
                        </span>
                        <button
                          onClick={() => {
                            setSelectedStartDate('');
                            setSelectedEndDate('');
                            setFilters({ ...filters, dateFrom: '', dateTo: '' });
                          }}
                          className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 ml-2 shrink-0"
                        >
                          Limpar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                Vendas Mínimas (R$)
              </label>
              <input
                type="number"
                placeholder="0"
                value={filters.salesMin}
                onChange={(e) => setFilters({ ...filters, salesMin: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                Vendas Máximas (R$)
              </label>
              <input
                type="number"
                placeholder="999999"
                value={filters.salesMax}
                onChange={(e) => setFilters({ ...filters, salesMax: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
            <button
              onClick={clearFilters}
              className="btn-secondary order-2 sm:order-1"
            >
              Limpar
            </button>
            <button
              onClick={applyFilters}
              className="btn-primary order-1 sm:order-2"
            >
              Aplicar
            </button>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="stats-card">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide truncate">Total de Agentes</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1 sm:mt-2">{filteredAndSortedAgents.length}</p>
            </div>
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shrink-0 ml-3">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                <path d="M16.5 12.5c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5-2.5 1.12-2.5 2.5 1.12 2.5 2.5 2.5zm0 1c-1.67 0-5 .84-5 2.5V17h10v-1.5c0-1.66-3.33-2.5-5-2.5z" opacity="0.6"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide truncate">Agentes Ativos</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-1 sm:mt-2">
                {filteredAndSortedAgents.filter(a => a.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shrink-0 ml-3">
              <CheckCircleIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="stats-card sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide truncate">Agentes Inativos</p>
              <p className="text-2xl sm:text-3xl font-bold text-red-600 mt-1 sm:mt-2">
                {filteredAndSortedAgents.filter(a => a.status === 'inactive').length}
              </p>
            </div>
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shrink-0 ml-3">
              <XCircleIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
              Lista de Agentes
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
              <span className="font-semibold text-gray-900 dark:text-white">{filteredAndSortedAgents.length}</span> agentes encontrados
            </p>
            <div className="flex items-center gap-3">
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-xs sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[120px] sm:min-w-[140px]"
              >
                <option value={10}>10 por página</option>
                <option value={25}>25 por página</option>
                <option value={50}>50 por página</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Cards View */}
        <div className="block sm:hidden">
          {paginatedAgents.length === 0 ? (
            <div className="p-6 text-center">
              <div className="text-gray-500 dark:text-gray-400 text-base">
                {searchTerm ? 'Nenhum agente encontrado' : 'Nenhum agente cadastrado'}
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedAgents.map((agent) => (
                <div key={agent.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        {agent.name.charAt(0)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {agent.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {agent.email}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {agent.phone} • {agent.department}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            {getStatusBadge(agent.status)}
                            <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                              R$ {agent.sales.toLocaleString('pt-BR')}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-200" title="Visualizar">
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/30 transition-all duration-200" title="Editar">
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-200" title="Excluir">
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th 
                  className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-2">
                    Nome
                    <ChevronUpDownIcon className="w-4 h-4" />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors hidden lg:table-cell"
                  onClick={() => handleSort('email')}
                >
                  <div className="flex items-center gap-2">
                    Email
                    <ChevronUpDownIcon className="w-4 h-4" />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => handleSort('department')}
                >
                  <div className="flex items-center gap-2">
                    Departamento
                    <ChevronUpDownIcon className="w-4 h-4" />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-2">
                    Status
                    <ChevronUpDownIcon className="w-4 h-4" />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors hidden md:table-cell"
                  onClick={() => handleSort('sales')}
                >
                  <div className="flex items-center gap-2">
                    Vendas
                    <ChevronUpDownIcon className="w-4 h-4" />
                  </div>
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedAgents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="text-gray-500 dark:text-gray-400 text-lg">
                      {searchTerm ? 'Nenhum agente encontrado' : 'Nenhum agente cadastrado'}
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedAgents.map((agent) => (
                  <tr key={agent.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 sm:h-12 sm:w-12">
                          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm sm:text-lg shadow-lg">
                            {agent.name.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">
                            {agent.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 lg:hidden">
                            {agent.email}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {agent.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 font-medium hidden lg:table-cell">{agent.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 font-medium">{agent.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(agent.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-100 hidden md:table-cell">
                      R$ {agent.sales.toLocaleString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-1 sm:gap-2">
                        <button className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-200" title="Visualizar">
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 sm:p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/30 transition-all duration-200" title="Editar">
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 sm:p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-200" title="Excluir">
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="px-3 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium text-center sm:text-left">
                Mostrando <span className="font-semibold text-gray-900 dark:text-white">{startIndex + 1}</span> a <span className="font-semibold text-gray-900 dark:text-white">{Math.min(startIndex + itemsPerPage, filteredAndSortedAgents.length)}</span> de <span className="font-semibold text-gray-900 dark:text-white">{filteredAndSortedAgents.length}</span> agentes
              </div>
              <div className="flex items-center justify-center gap-1">
                {/* Botão para primeira página */}
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 transition-colors"
                  title="Primeira página"
                >
                  <ChevronDoubleLeftIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>

                {/* Botão página anterior */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 transition-colors"
                  title="Página anterior"
                >
                  <ChevronLeftIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                
                {/* Páginas - diferentes quantidades para mobile/desktop */}
                <div className="hidden sm:flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                {/* Páginas mobile - menos páginas */}
                <div className="flex sm:hidden items-center gap-1">
                  {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(totalPages - 2, currentPage - 1)) + i;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-2 py-2 text-xs font-medium rounded-lg transition-colors ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                {/* Botão próxima página */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 transition-colors"
                  title="Próxima página"
                >
                  <ChevronRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>

                {/* Botão para última página */}
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 transition-colors"
                  title="Última página"
                >
                  <ChevronDoubleRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
