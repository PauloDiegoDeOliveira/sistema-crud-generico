import { CRUDService } from './CRUDService';
import type { Agent } from '../types/entities/agent';
import { mockAgents } from '../data/mockAgents';

// Serviço específico para agentes
export class AgentService extends CRUDService<Agent> {
  constructor(useMock = true) {
    super(
      'agents', 
      mockAgents, 
      process.env.REACT_APP_API_URL || '/api', 
      useMock
    );
  }

  // Métodos específicos para agentes podem ser adicionados aqui
  async getActiveAgents() {
    const response = await this.search({
      status: 'active'
    });
    return response;
  }

  async getAgentsByDepartment(department: string) {
    const response = await this.search({
      department
    });
    return response;
  }

  async searchAgents(query: string) {
    const response = await this.searchByText(query, ['name', 'email', 'company']);
    return response;
  }
}

// Instância singleton do serviço
export const agentService = new AgentService();
