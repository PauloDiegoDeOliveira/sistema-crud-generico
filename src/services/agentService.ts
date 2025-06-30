import { CRUDService } from './CRUDService';
import type { Agent } from '../types/entities/agent';
import { mockAgents } from '../data/mockAgents';

// Serviço específico para agentes
export class AgentService extends CRUDService<Agent> {
  constructor(useMock = true) {
    super('agents', mockAgents, {
      baseUrl: process.env.REACT_APP_API_URL || '/api',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      }
    }, useMock);
  }

  // Métodos específicos para agentes podem ser adicionados aqui
  async getActiveAgents() {
    const response = await this.list({
      filters: { status: 'active' }
    });
    return response;
  }

  async getAgentsByDepartment(department: string) {
    const response = await this.list({
      filters: { department }
    });
    return response;
  }

  async searchAgents(query: string) {
    const response = await this.list({
      search: query
    });
    return response;
  }
}

// Instância singleton do serviço
export const agentService = new AgentService();
