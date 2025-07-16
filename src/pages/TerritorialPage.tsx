import React, { useState } from 'react';
import { Trophy, Target, TrendingUp, TrendingDown } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';
import ElectoralStructureCard from '../components/territorial/ElectoralStructureCard';
import EventsCard from '../components/territorial/EventsCard';
import PromotionCard from '../components/territorial/PromotionCard';
import SegmentCampaignCard from '../components/territorial/SegmentCampaignCard';
import MobilizationCard from '../components/territorial/MobilizationCard';

// Definición de regiones de Bolivia
export const BOLIVIA_REGIONS = [
  { id: 'pando', name: 'Pando', location: 'Norte' },
  { id: 'beni', name: 'Beni', location: 'Norte-Centro' },
  { id: 'la-paz', name: 'La Paz', location: 'Oeste' },
  { id: 'oruro', name: 'Oruro', location: 'Oeste-Centro' },
  { id: 'cochabamba', name: 'Cochabamba', location: 'Centro' },
  { id: 'potosi', name: 'Potosí', location: 'Suroeste' },
  { id: 'chuquisaca', name: 'Chuquisaca', location: 'Sur-Centro' },
  { id: 'tarija', name: 'Tarija', location: 'Sur' },
  { id: 'santa-cruz', name: 'Santa Cruz', location: 'Este' },
];

// Datos mock por región para demostración
const generateRegionData = () => {
  const data: Record<string, any> = {};
  BOLIVIA_REGIONS.forEach(region => {
    data[region.id] = {
      defenders: Math.floor(Math.random() * 150) + 50,
      targetDefenders: 200,
      events: Math.floor(Math.random() * 8) + 2,
      promotedCount: Math.floor(Math.random() * 80) + 20,
      targetPromoters: 100,
      segments: Math.floor(Math.random() * 5) + 3,
    };
  });
  return data;
};

export default function TerritorialPage() {
  const [showCompetition, setShowCompetition] = useState(false);

  const getTerritorialData = useDashboardStore(state => state.getTerritorialData);

  // Calcular progreso por región para la competencia
  const getRegionProgress = (regionId: string) => {
    const data = getTerritorialData(regionId);
    const defenderProgress = (data.defenders.length / data.targetDefenders) * 100;
    const promotionProgress = (data.promotedCount / data.targetPromoters) * 100;
    return (defenderProgress + promotionProgress) / 2;
  };

  // Ordenar regiones por progreso
  const rankedRegions = BOLIVIA_REGIONS
    .map(region => ({
      ...region,
      progress: getRegionProgress(region.id),
      data: getTerritorialData(region.id)
    }))
    .sort((a, b) => b.progress - a.progress);

  return (
    <div className="min-h-screen bg-background pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header con selector de región y toggle de competencia */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Territorial</h1>
            <p className="text-gray-400">Gestión territorial por regiones de Bolivia</p>
          </div>
        </div>

        {/* Panel de competencia regional */}
        {showCompetition && (
          <div className="glassmorphic-container p-6 animate-scale-in">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="w-6 h-6 text-accent-teal" />
              <h2 className="text-xl font-semibold text-white">Competencia Regional en Tiempo Real</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {rankedRegions.map((region, index) => {
                const isLeader = index === 0;
                const isLast = index === rankedRegions.length - 1;
                
                return (
                  <div
                    key={region.id}
                    className="relative p-4 rounded-lg border transition-all duration-300 border-primary/20 bg-card/50 hover:border-primary/40"
                  >
                    {/* Posición */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          isLeader 
                            ? 'bg-yellow-500/20 text-yellow-400' 
                            : isLast 
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-primary/20 text-primary'
                        }`}>
                          #{index + 1}
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{region.name}</h3>
                          <p className="text-xs text-gray-400">{region.location}</p>
                        </div>
                      </div>
                      
                      {/* Indicador de tendencia */}
                      <div className={`flex items-center gap-1 ${
                        region.progress > 50 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {region.progress > 50 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span className="text-sm font-medium">
                          {region.progress.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    {/* Barra de progreso */}
                    <div className="mb-3">
                      <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            isLeader 
                              ? 'bg-yellow-400' 
                              : isLast 
                                ? 'bg-red-400'
                                : 'bg-accent-teal'
                          }`}
                          style={{ width: `${region.progress}%` }}
                        >
                        </div>
                      </div>
                    </div>

                    {/* Métricas rápidas */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <Target className="w-3 h-3 text-accent-teal" />
                        <span className="text-gray-400">Defensores:</span>
                        <span className="text-white">{region.data.defenders.length}/{region.data.targetDefenders}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy className="w-3 h-3 text-accent-pink" />
                        <span className="text-gray-400">Promovidos:</span>
                        <span className="text-white">{region.data.promotedCount}/{region.data.targetPromoters}</span>
                      </div>
                    </div>

                    {/* Badge de líder */}
                    {isLeader && (
                      <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                        LÍDER
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Grid layout para las cards existentes */}
        <div className="grid grid-cols-12 gap-8">
          {/* Primera fila - cards más grandes */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <ElectoralStructureCard />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <EventsCard />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <PromotionCard />
          </div>
          
          {/* Segunda fila - cards más pequeñas */}
          <div className="col-span-12 md:col-span-6">
            <SegmentCampaignCard />
          </div>
          <div className="col-span-12 md:col-span-6">
            <MobilizationCard />
          </div>
        </div>
      </div>
    </div>
  );
}