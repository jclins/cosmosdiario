
import { useState, useEffect } from 'react';
import { n8nService } from '../services/n8nService';

interface Prediction {
  signo: string;
  previsaoGeral: string;
  amor: string;
  trabalho: string;
  saude: string;
  numeroSorte: number;
  corSorte: string;
}

interface PredictionsData {
  data: string;
  previsoes: Prediction[];
}

export const usePredictions = () => {
  const [predictions, setPredictions] = useState<PredictionsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPredictions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Primeiro tenta carregar do arquivo local
      const response = await fetch('/previsoes-exemplo.json');
      if (response.ok) {
        const data = await response.json();
        setPredictions(data);
      } else {
        throw new Error('Arquivo de previsões não encontrado');
      }
    } catch (err) {
      console.error('Erro ao carregar previsões:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const triggerN8NUpdate = async () => {
    try {
      const result = await n8nService.triggerDailyPredictions();
      if (result.success) {
        console.log('N8N workflow acionado com sucesso');
        // Recarrega as previsões após alguns segundos
        setTimeout(() => {
          loadPredictions();
        }, 5000);
        return true;
      } else {
        console.error('Erro ao acionar N8N:', result.message);
        return false;
      }
    } catch (error) {
      console.error('Erro ao acionar N8N:', error);
      return false;
    }
  };

  useEffect(() => {
    loadPredictions();
  }, []);

  return {
    predictions,
    loading,
    error,
    refetch: loadPredictions,
    triggerN8NUpdate
  };
};
