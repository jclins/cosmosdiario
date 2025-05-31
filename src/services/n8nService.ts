
import { config } from '../config/env';

interface N8NWebhookResponse {
  success: boolean;
  message?: string;
  data?: any;
}

class N8NService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = config.n8n.webhookUrl;
  }

  async triggerDailyPredictions(): Promise<N8NWebhookResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/daily-predictions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: new Date().toISOString().split('T')[0],
          trigger: 'manual',
          source: 'cosmos-diario'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Erro ao acionar N8N:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Erro desconhecido' 
      };
    }
  }

  async updatePredictions(predictions: any[]): Promise<N8NWebhookResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/update-predictions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          predictions,
          timestamp: new Date().toISOString()
        })
      });

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Erro ao atualizar previsões:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Erro desconhecido' 
      };
    }
  }
}

export const n8nService = new N8NService();
