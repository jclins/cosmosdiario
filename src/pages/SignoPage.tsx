
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Heart, Briefcase, Leaf, Star } from "lucide-react";

interface PrevisaoHistorica {
  data: string;
  previsao: string;
  amor: string;
  trabalho: string;
  saude: string;
}

interface SignoInfo {
  nome: string;
  emoji: string;
  cor: string;
  elemento: string;
  regente: string;
  caracteristicas: string[];
  previsaoAtual: string;
  historico: PrevisaoHistorica[];
}

const signosData: { [key: string]: SignoInfo } = {
  'áries': {
    nome: 'Áries',
    emoji: '♈',
    cor: 'text-red-500',
    elemento: 'Fogo',
    regente: 'Marte',
    caracteristicas: ['Determinado', 'Corajoso', 'Impulsivo', 'Líder natural'],
    previsaoAtual: 'As energias marcianas estão fortes hoje, favorecendo iniciativas e novos projetos.',
    historico: [
      {
        data: '2024-01-24',
        previsao: 'Dia favorável para tomada de decisões importantes.',
        amor: 'Relacionamentos em destaque com energia renovada.',
        trabalho: 'Oportunidades de liderança surgem no ambiente profissional.',
        saude: 'Energia em alta, ideal para atividades físicas.'
      },
      {
        data: '2024-01-23',
        previsao: 'Momento de reflexão e planejamento estratégico.',
        amor: 'Comunicação clara fortalece vínculos afetivos.',
        trabalho: 'Colaboração em equipe traz resultados positivos.',
        saude: 'Atenção especial à alimentação e hidratação.'
      }
    ]
  },
  'touro': {
    nome: 'Touro',
    emoji: '♉',
    cor: 'text-green-500',
    elemento: 'Terra',
    regente: 'Vênus',
    caracteristicas: ['Estável', 'Determinado', 'Sensual', 'Prático'],
    previsaoAtual: 'Vênus favorece questões materiais e relacionamentos duradouros.',
    historico: [
      {
        data: '2024-01-24',
        previsao: 'Estabilidade e segurança em foco hoje.',
        amor: 'Momentos de carinho e demonstrações afetivas.',
        trabalho: 'Perseverança leva ao sucesso nos projetos.',
        saude: 'Bem-estar através de prazeres simples.'
      }
    ]
  }
  // Adicione os outros signos aqui...
};

const SignoPage = () => {
  const { nome } = useParams<{ nome: string }>();
  const [signoInfo, setSignoInfo] = useState<SignoInfo | null>(null);

  useEffect(() => {
    if (nome) {
      const info = signosData[nome.toLowerCase()];
      setSignoInfo(info || null);
    }
  }, [nome]);

  if (!signoInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Star className="w-16 h-16 text-purple-300 mx-auto mb-4 animate-pulse" />
          <h1 className="text-2xl text-white mb-4">Signo não encontrado</h1>
          <Link to="/">
            <Button variant="outline" className="border-purple-600 text-purple-300">
              Voltar ao início
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-800/30 backdrop-blur-sm bg-black/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-purple-300 hover:text-purple-200">
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </Link>
            <h1 className="text-xl font-bold text-white">Cosmos Diário</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Cabeçalho do Signo */}
        <div className="text-center mb-8">
          <div className={`text-6xl mb-4 ${signoInfo.cor}`}>
            {signoInfo.emoji}
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">{signoInfo.nome}</h1>
          <div className="flex items-center justify-center space-x-4 text-purple-300">
            <span>Elemento: {signoInfo.elemento}</span>
            <span>•</span>
            <span>Regente: {signoInfo.regente}</span>
          </div>
        </div>

        {/* Características */}
        <Card className="bg-black/30 border-purple-700/30 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-300" />
              Características
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {signoInfo.caracteristicas.map((caracteristica, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-800/30 text-purple-200 rounded-full text-sm"
                >
                  {caracteristica}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Previsão Atual */}
        <Card className="bg-black/30 border-purple-700/30 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-300" />
              Previsão de Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-purple-100 text-lg">{signoInfo.previsaoAtual}</p>
          </CardContent>
        </Card>

        {/* Histórico de Previsões */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Previsões Anteriores</h2>
          <div className="space-y-6">
            {signoInfo.historico.map((previsao, index) => (
              <Card key={index} className="bg-black/30 border-purple-700/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-lg">
                    {new Date(previsao.data).toLocaleDateString('pt-BR')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-purple-300 font-semibold mb-2">Previsão Geral</h4>
                      <p className="text-purple-100 text-sm mb-4">{previsao.previsao}</p>
                      
                      <div className="flex items-start space-x-2 mb-3">
                        <Heart className="w-4 h-4 text-pink-400 mt-0.5" />
                        <div>
                          <span className="text-pink-300 font-semibold text-sm">Amor: </span>
                          <span className="text-purple-100 text-sm">{previsao.amor}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-start space-x-2 mb-3">
                        <Briefcase className="w-4 h-4 text-yellow-400 mt-0.5" />
                        <div>
                          <span className="text-yellow-300 font-semibold text-sm">Trabalho: </span>
                          <span className="text-purple-100 text-sm">{previsao.trabalho}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Leaf className="w-4 h-4 text-green-400 mt-0.5" />
                        <div>
                          <span className="text-green-300 font-semibold text-sm">Saúde: </span>
                          <span className="text-purple-100 text-sm">{previsao.saude}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignoPage;
