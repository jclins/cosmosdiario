import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Moon, Star, Sparkles, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { usePredictions } from '../hooks/usePredictions';
import AdSense from '../components/AdSense';
import { toast } from "sonner";

interface DailyPrediction {
  signo: string;
  data: string;
  previsao: string;
  amor: string;
  trabalho: string;
  saude: string;
  elemento: string;
  regente: string;
}

const signos = [
  { nome: "Áries", emoji: "♈", cor: "text-red-500", elemento: "Fogo" },
  { nome: "Touro", emoji: "♉", cor: "text-green-500", elemento: "Terra" },
  { nome: "Gêmeos", emoji: "♊", cor: "text-yellow-500", elemento: "Ar" },
  { nome: "Câncer", emoji: "♋", cor: "text-blue-400", elemento: "Água" },
  { nome: "Leão", emoji: "♌", cor: "text-orange-500", elemento: "Fogo" },
  { nome: "Virgem", emoji: "♍", cor: "text-green-600", elemento: "Terra" },
  { nome: "Libra", emoji: "♎", cor: "text-pink-400", elemento: "Ar" },
  { nome: "Escorpião", emoji: "♏", cor: "text-red-700", elemento: "Água" },
  { nome: "Sagitário", emoji: "♐", cor: "text-purple-500", elemento: "Fogo" },
  { nome: "Capricórnio", emoji: "♑", cor: "text-gray-600", elemento: "Terra" },
  { nome: "Aquário", emoji: "♒", cor: "text-cyan-500", elemento: "Ar" },
  { nome: "Peixes", emoji: "♓", cor: "text-blue-500", elemento: "Água" }
];

const Index = () => {
  const { predictions, loading, error, refetch, triggerN8NUpdate } = usePredictions();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdatePredictions = async () => {
    setIsUpdating(true);
    const success = await triggerN8NUpdate();
    
    if (success) {
      toast.success("Atualização das previsões iniciada! Aguarde alguns minutos.");
    } else {
      toast.error("Erro ao solicitar atualização das previsões.");
    }
    
    setIsUpdating(false);
  };

  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-800/30 backdrop-blur-sm bg-black/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Moon className="w-8 h-8 text-purple-300" />
                <Star className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                Cosmos Diário
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleUpdatePredictions}
                disabled={isUpdating}
                variant="outline" 
                className="border-purple-600 text-purple-300"
              >
                {isUpdating ? (
                  <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Atualizar Previsões
              </Button>
              <Sparkles className="w-6 h-6 text-purple-300 animate-pulse" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Anúncio do topo */}
        <div className="mb-8">
          <AdSense 
            adSlot="1234567890" 
            adFormat="rectangle"
            className="flex justify-center"
          />
        </div>

        {/* Introdução */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Bem-vindo ao Universo Astrológico
          </h2>
          <p className="text-purple-200 text-lg max-w-2xl mx-auto mb-2">
            Descubra o que os astros reservam para você hoje. Navegue pelas energias cósmicas 
            e encontre orientação para sua jornada.
          </p>
          <p className="text-purple-300 text-sm">
            {today}
          </p>
        </div>

        {/* Previsões Diárias */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">
            Previsões Diárias dos Signos
          </h3>
          
          {loading ? (
            <div className="text-center text-purple-200">
              <Sparkles className="w-8 h-8 animate-spin mx-auto mb-2" />
              Consultando os astros...
            </div>
          ) : error ? (
            <div className="text-center text-red-300">
              <p>Erro ao carregar previsões: {error}</p>
              <Button onClick={refetch} className="mt-4">Tentar Novamente</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {signos.map((signo, index) => {
                const previsao = predictions?.previsoes?.find(p => p.signo === signo.nome);
                return (
                  <Card key={signo.nome} className="bg-black/30 border-purple-700/30 backdrop-blur-sm hover:bg-black/40 transition-all duration-300">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between">
                        <span className="text-white">{signo.nome}</span>
                        <span className={`text-2xl ${signo.cor}`}>{signo.emoji}</span>
                      </CardTitle>
                      <p className="text-sm text-purple-300">Elemento: {signo.elemento}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-purple-100 text-sm mb-4">
                        {previsao?.previsaoGeral || `Hoje é um dia especial para ${signo.nome}. As energias estão alinhadas para trazer mudanças positivas.`}
                      </p>
                      <Link to={`/signo/${signo.nome.toLowerCase()}`}>
                        <Button variant="outline" className="w-full border-purple-600 text-purple-300 hover:bg-purple-800/20">
                          Ver Detalhes
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Anúncio do meio */}
        <div className="mb-12">
          <AdSense 
            adSlot="0987654321" 
            adFormat="banner"
            className="flex justify-center"
          />
        </div>

        {/* Seções por Categoria */}
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="amor" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-black/30 border border-purple-700/30">
              <TabsTrigger value="amor" className="text-purple-200 data-[state=active]:bg-purple-800/50 data-[state=active]:text-white">
                💜 Amor
              </TabsTrigger>
              <TabsTrigger value="trabalho" className="text-purple-200 data-[state=active]:bg-purple-800/50 data-[state=active]:text-white">
                💼 Trabalho
              </TabsTrigger>
              <TabsTrigger value="saude" className="text-purple-200 data-[state=active]:bg-purple-800/50 data-[state=active]:text-white">
                🌿 Saúde
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="amor" className="mt-6">
              <Card className="bg-black/30 border-purple-700/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-pink-300">Previsões do Amor</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-100">
                    As energias do amor estão intensas hoje. Vênus favorece novos encontros e 
                    o fortalecimento de relacionamentos existentes. É um momento propício para 
                    expressar sentimentos e abrir o coração para novas possibilidades.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="trabalho" className="mt-6">
              <Card className="bg-black/30 border-purple-700/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-yellow-300">Previsões Profissionais</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-100">
                    Mercúrio em aspecto favorável traz clareza mental e comunicação eficaz. 
                    É um excelente momento para negociações, apresentações e tomada de decisões 
                    importantes na carreira.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="saude" className="mt-6">
              <Card className="bg-black/30 border-purple-700/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-300">Previsões de Saúde</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-100">
                    A Lua em posição harmoniosa favorece o equilíbrio emocional e físico. 
                    Dedique tempo ao autocuidado, práticas de relaxamento e alimentação 
                    saudável. Seu corpo e mente agradecem.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Anúncio do rodapé */}
      <div className="container mx-auto px-6 mb-8">
        <AdSense 
          adSlot="1122334455" 
          adFormat="banner"
          className="flex justify-center"
        />
      </div>

      {/* Footer */}
      <footer className="border-t border-purple-800/30 mt-16 py-8 bg-black/20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-purple-300 text-sm">
            © 2024 Cosmos Diário - Conectando você com as energias do universo
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
