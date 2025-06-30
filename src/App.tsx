// 🌐 CONFIGURAÇÃO DE ROTEAMENTO DA APLICAÇÃO
// Define quais páginas existem e suas URLs

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { AgentsPage } from './pages/AgentsPage';
import { ProductsPage } from './pages/ProductsPage';

function App() {
  return (
    // Router = ativa o sistema de roteamento SPA (Single Page Application)
    <Router>
      {/* MainLayout = layout principal com menu lateral + header */}
      <MainLayout>
        {/* Routes = container das rotas/páginas */}
        <Routes>
          {/* Cada Route define uma URL e qual componente mostrar */}
          <Route path="/" element={<Dashboard />} />                    {/* Página inicial */}
          <Route path="/agents" element={<AgentsPage />} />             {/* CRUD de agentes */}
          <Route path="/products" element={<ProductsPage />} />         {/* CRUD genérico de produtos (EXEMPLO) */}
          <Route path="/reports" element={<div className="card p-8 text-center"><h2 className="text-2xl font-bold gradient-text">Relatórios</h2><p className="text-slate-600 dark:text-slate-400 mt-2">Página em desenvolvimento</p></div>} />
          <Route path="/settings" element={<div className="card p-8 text-center"><h2 className="text-2xl font-bold gradient-text">Configurações</h2><p className="text-slate-600 dark:text-slate-400 mt-2">Página em desenvolvimento</p></div>} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
