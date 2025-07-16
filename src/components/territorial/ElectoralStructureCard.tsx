import React, { useState } from 'react';
import { Users, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import ElectoralStructureModal from './ElectoralStructureModal';
import { BOLIVIA_REGIONS } from '../../pages/TerritorialPage';
import { useDashboardStore } from '../../store/dashboardStore';

interface Defender {
  id: string;
  name: string;
  phone: string;
  email: string;
  pollingStation?: string;
}

export default function ElectoralStructureCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const { getTerritorialData, addDefender, updateElectionConfig } = useDashboardStore(state => ({
    getTerritorialData: state.getTerritorialData,
    addDefender: state.addDefender,
    updateElectionConfig: state.updateElectionConfig,
  }));

  // Calcular datos para todas las regiones
  const regionsData = BOLIVIA_REGIONS.map(region => {
    const data = getTerritorialData(region.id);
    const progress = ((data.defenders.length / data.targetDefenders) * 100);
    return {
      ...region,
      defenders: data.defenders.length,
      targetDefenders: data.targetDefenders,
      progress,
      data
    };
  }).sort((a, b) => b.progress - a.progress);

  // Mostrar top 3 por defecto, todas si está expandido
  const displayedRegions = isExpanded ? regionsData : regionsData.slice(0, 3);

  const handleRegionClick = (regionId: string) => {
    setSelectedRegion(regionId);
    setIsModalOpen(true);
  };

  const handleInitialConfig = (date: string, target: number) => {
    if (selectedRegion) {
      updateElectionConfig(selectedRegion, { electionDate: date, targetDefenders: target });
    }
  };

  const handleAddDefender = (defender: Omit<Defender, 'id'>) => {
    if (selectedRegion) {
      addDefender(selectedRegion, defender);
    }
  };

  const handleUpdateElectionDate = (date: string) => {
    if (selectedRegion) {
      const data = getTerritorialData(selectedRegion);
      updateElectionConfig(selectedRegion, { electionDate: date, targetDefenders: data.targetDefenders });
    }
  };

  const handleUpdateTargetDefenders = (target: number) => {
    if (selectedRegion) {
      const data = getTerritorialData(selectedRegion);
      updateElectionConfig(selectedRegion, { electionDate: data.electionDate, targetDefenders: target });
    }
  };

  const selectedRegionData = selectedRegion ? getTerritorialData(selectedRegion) : null;

  return (
    <>
      <div className="glassmorphic-container p-6 min-h-[400px]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-accent-teal/10 p-3 rounded-lg">
              <Users className="w-6 h-6 text-accent-teal" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Estructura Electoral</h3>
              <p className="text-gray-400 text-sm">Defensores por región</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-3 py-2 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300"
          >
            <span className="text-sm">{isExpanded ? 'Menos' : 'Ver todas'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        <div className="space-y-3">
          {displayedRegions.map((region, index) => {
            const isTop = index < 3;
            const rankColors = ['text-yellow-400', 'text-gray-300', 'text-orange-400'];
            const rankColor = isTop ? rankColors[index] : 'text-gray-400';
            
            return (
              <div
                key={region.id}
                onClick={() => handleRegionClick(region.id)}
                className="bg-card/50 border border-primary/20 rounded-lg p-4 hover:border-primary/40 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${rankColor} bg-current/10`}>
                      #{index + 1}
                    </div>
                    <div>
                      <h4 className="text-white font-medium group-hover:text-accent-teal transition-colors">
                        {region.name}
                      </h4>
                      <p className="text-xs text-gray-400">{region.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-accent-teal font-bold">
                      {region.defenders}/{region.targetDefenders}
                    </div>
                    <div className="text-xs text-gray-400">
                      {region.progress.toFixed(1)}%
                    </div>
                  </div>
                </div>
                
                {/* Barra de progreso */}
                <div className="h-2 bg-background/50 rounded-lg overflow-hidden">
                  <div 
                    className="h-full bg-accent-teal transition-all duration-300"
                    style={{ width: `${Math.min(region.progress, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {!isExpanded && regionsData.length > 3 && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsExpanded(true)}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              +{regionsData.length - 3} regiones más
            </button>
          </div>
        )}
      </div>

      {selectedRegion && selectedRegionData && (
        <ElectoralStructureModal 
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRegion(null);
          }}
          defenders={selectedRegionData.defenders}
          onAddDefender={handleAddDefender}
          electionDate={selectedRegionData.electionDate}
          onUpdateElectionDate={handleUpdateElectionDate}
          targetDefenders={selectedRegionData.targetDefenders}
          onUpdateTargetDefenders={handleUpdateTargetDefenders}
          hasInitialConfig={Object.keys(selectedRegionData).length > 0}
          onInitialConfig={handleInitialConfig}
        />
      )}
    </>
  );
}