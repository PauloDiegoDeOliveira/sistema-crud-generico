// ============================================================================
// AGENTE PAGE USANDO CRUD GENÉRICO
// ============================================================================

import React from 'react';
import { GenericCRUDPage } from '../components/GenericCRUDPage';
import { useGenericCRUD } from '../hooks/useGenericCRUD';
import { CRUDService } from '../services/CRUDService';
import { agentConfig, type Agent } from '../configs/entities/agentConfig';
import { mockAgents } from '../data/mockAgents';

// Criar instância do serviço para agentes
const agentService = new CRUDService<Agent>('agents', mockAgents, '/api', true);

/**
 * Página de Agentes usando o sistema CRUD genérico
 * Todo o comportamento vem da configuração agentConfig
 */
export const AgentsPage: React.FC = () => {
  // Hook genérico que gerencia todo o estado e ações
  const crud = useGenericCRUD(agentService, agentConfig.behavior?.searchFields || []);

  // Simplesmente renderiza o componente genérico com a configuração
  return (
    <GenericCRUDPage
      config={agentConfig}
      crud={crud}
    />
  );
};
