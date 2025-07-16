import React, { useState } from 'react';
import { Users } from 'lucide-react';
import PromotionModal from './PromotionModal';
import { BOLIVIA_REGIONS } from '../../pages/TerritorialPage';

interface PromotionCardProps {
  selectedRegion?: string;
  regionData?: any;
}

export default function PromotionCard({ selectedRegion, regionData }: PromotionCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promotedCount, setPromotedCount] = useState(0);
  const [targetPromoters, setTargetPromoters] = useState<number>(500);

  // Usar datos de la región si están disponibles
  const currentPromoted = regionData?.promotedCount || promotedCount;
  const currentTarget = regionData?.targetPromoters || targetPromoters;
  const currentRegion = BOLIVIA_REGIONS.find(r => r.id === selectedRegion);

  const progress = ((currentPromoted / currentTarget) * 100).toFixed(1);

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="glassmorphic-container p-8 cursor-pointer group hover:border-primary/40 transition-all duration-300 min-h-[240px] hover:shadow-2xl hover:-translate-y-1"
      >
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-white">Promoción</h3>
            <p className="text-gray-400 text-base">
              Personas promovidas
              {currentRegion && (
                <span className="block text-sm text-accent-pink">
                  {currentRegion.name} ({currentRegion.location})
                </span>
              )}
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-accent-pink/20 rounded-full blur-xl group-hover:bg-accent-pink/30 transition-colors duration-300"></div>
            <div className="relative bg-accent-pink/10 p-5 rounded-full group-hover:bg-accent-pink/20 transition-colors duration-300">
              <Users className="w-12 h-12 text-accent-pink" />
            </div>
          </div>
        </div>
        
        <div className="mt-8 space-y-4">
          <div className="text-6xl font-bold text-accent-pink text-neon animate-float">
            {currentPromoted}/{currentTarget}
          </div>
          <div className="text-sm text-gray-400">
            Progreso: {progress}%
          </div>
          
          {/* Barra de progreso */}
          <div className="h-2 bg-background/50 rounded-lg overflow-hidden">
            <div 
              className="h-full bg-accent-pink transition-all duration-300 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>
      </div>

      <PromotionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        promotedCount={promotedCount}
        onUpdatePromotedCount={setPromotedCount}
        targetPromoters={targetPromoters}
        onUpdateTargetPromoters={setTargetPromoters}
      />
    </>
  );
}