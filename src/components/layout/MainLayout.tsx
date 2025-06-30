import React, { useState, useEffect, useRef } from 'react';
import {
  Bars3Icon,
  HomeIcon,
  Cog6ToothIcon,
  MoonIcon,
  SunIcon,
  ChartBarIcon,
  BellIcon,
} from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

// Componente customizado para ícone de agentes
const AgentsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    <path d="M16.5 12.5c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5-2.5 1.12-2.5 2.5 1.12 2.5 2.5 2.5zm0 1c-1.67 0-5 .84-5 2.5V17h10v-1.5c0-1.66-3.33-2.5-5-2.5z" opacity="0.6"/>
  </svg>
);

interface SidebarProps {
  children: React.ReactNode;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  badge?: string;
}

const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Agentes', href: '/agents', icon: AgentsIcon },
  { name: 'Relatórios', href: '/reports', icon: ChartBarIcon },
  { name: 'Configurações', href: '/settings', icon: Cog6ToothIcon },
];

export const MainLayout: React.FC<SidebarProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Inicia fechado em mobile
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Detectar se é desktop para manter sidebar aberto por padrão
  useEffect(() => {
    const checkScreenSize = () => {
      setSidebarOpen(window.innerWidth >= 1024); // lg breakpoint
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  };

  // Inicializar modo escuro
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Fechar dropdown de notificações ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={{margin: 0, padding: 0, height: '100vh', display: 'flex'}} className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`${
          sidebarOpen ? 'w-64' : 'w-16'
        } bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out flex-shrink-0 fixed lg:relative z-30 h-full ${
          !sidebarOpen ? 'lg:w-16' : 'lg:w-64'
        } ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{margin: 0, padding: 0}}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                <span className="text-white font-bold text-xs sm:text-sm">C</span>
              </div>
              {sidebarOpen && (
                <div className="min-w-0">
                  <h1 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white truncate">CRUD System</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Admin Panel</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 sm:px-3 py-3 sm:py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center ${sidebarOpen ? 'gap-2 sm:gap-3 px-2 sm:px-3' : 'justify-center px-1 sm:px-2'} py-2 sm:py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shadow-sm' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  title={!sidebarOpen ? item.name : undefined}
                >
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'} flex-shrink-0`} />
                  {sidebarOpen && (
                    <>
                      <span className="flex-1 text-sm">{item.name}</span>
                      {item.badge && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-0' : 'lg:ml-0'
        } ml-0`}
        style={{margin: 0, padding: 0, height: '100vh'}}
      >
        {/* Header */}
        <header 
          className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 flex-shrink-0"
          style={{margin: 0, padding: 0}}
        >
          <div className="px-3 sm:px-4 lg:px-6">
            <div className="flex items-center justify-between h-14 sm:h-16">
              <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Bars3Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400" />
                </button>
                <div className="flex flex-col min-w-0">
                  <h2 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white leading-tight truncate">
                    Sistema CRUD Genérico
                  </h2>
                  <p className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">
                    Gerenciamento moderno e intuitivo
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                {/* Sino de notificações */}
                <div className="relative" ref={notificationsRef}>
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group relative"
                    title="Notificações"
                  >
                    <BellIcon className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 ${notificationsOpen ? 'animate-pulse' : ''}`} />
                    {/* Badge de notificações */}
                    <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold animate-pulse">
                      3
                    </span>
                  </button>
                  
                  {/* Dropdown de notificações */}
                  {notificationsOpen && (
                    <div className="absolute right-0 top-10 sm:top-12 w-72 sm:w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Notificações</h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400">3 novas</span>
                        </div>
                      </div>
                      <div className="max-h-48 sm:max-h-64 overflow-y-auto">
                        <div className="p-2 sm:p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors">
                          <div className="flex items-start gap-2 sm:gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                            <div className="min-w-0">
                              <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">Novo agente cadastrado</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Maria Silva foi adicionada ao sistema</p>
                              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">2 min atrás</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-2 sm:p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors">
                          <div className="flex items-start gap-2 sm:gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                            <div className="min-w-0">
                              <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">Meta de vendas atingida</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Parabéns! Meta mensal foi superada</p>
                              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">1 hora atrás</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-2 sm:p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors">
                          <div className="flex items-start gap-2 sm:gap-3">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                            <div className="min-w-0">
                              <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">Relatório semanal disponível</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Novo relatório de performance pronto</p>
                              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">3 horas atrás</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 sm:p-3 border-t border-gray-200 dark:border-gray-700">
                        <button className="w-full text-center text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                          Ver todas as notificações
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Toggle de modo escuro movido para o header */}
                <button
                  onClick={toggleDarkMode}
                  className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group"
                  title={darkMode ? 'Modo Claro' : 'Modo Escuro'}
                >
                  {darkMode ? (
                    <SunIcon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 group-hover:text-yellow-600" />
                  ) : (
                    <MoonIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
                  )}
                </button>
                
                {/* Avatar do usuário */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center cursor-pointer hover:from-blue-700 hover:to-blue-800 hover:scale-105 transition-all duration-200 shadow-md">
                  <span className="text-white font-bold text-xs sm:text-sm">AD</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main 
          className="flex-1 overflow-y-auto"
          style={{margin: 0, padding: 0}}
        >
          {children}
        </main>
      </div>
    </div>
  );
};
