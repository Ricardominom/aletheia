import React, { useState } from 'react';
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
  const [selectedRegion, setSelectedRegion] = useState('cochabamba');
  const [regionData] = useState(generateRegionData());

  const currentRegion = BOLIVIA_REGIONS.find(r => r.id === selectedRegion);
  const currentData = regionData[selectedRegion];

  return (
    <div className="min-h-screen bg-background pt-24 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header con selector de región */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Territorial</h1>
            <p className="text-gray-400">Gestión territorial por regiones de Bolivia</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Selector de región */}
            <div className="flex items-center gap-3">
              <span className="text-gray-400">Región:</span>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="bg-card/80 border border-primary/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/40 transition-colors min-w-[200px]"
              >
                {BOLIVIA_REGIONS.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name} ({region.location})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Indicador de región actual */}
        <div className="glassmorphic-container p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-accent-teal rounded-full animate-pulse"></div>
              <span className="text-white font-medium">
                Mostrando datos de: <span className="text-accent-teal">{currentRegion?.name}</span>
              </span>
              <span className="text-gray-400">({currentRegion?.location})</span>
            </div>
            <div className="text-sm text-gray-400">
            </div>
          </div>
        </div>

        {/* Grid layout para las cards existentes */}
        <div className="grid grid-cols-12 gap-8">
          {/* Primera fila - cards más grandes */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <ElectoralStructureCard 
              selectedRegion={selectedRegion}
              regionData={currentData}
            />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <EventsCard 
              selectedRegion={selectedRegion}
              regionData={currentData}
            />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <PromotionCard 
              selectedRegion={selectedRegion}
              regionData={currentData}
            />
          </div>
          
          {/* Segunda fila - cards más pequeñas */}
          <div className="col-span-12 md:col-span-6">
            <SegmentCampaignCard 
              selectedRegion={selectedRegion}
              regionData={currentData}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <MobilizationCard 
              selectedRegion={selectedRegion}
              regionData={currentData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}