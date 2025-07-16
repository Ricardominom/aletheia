import React from 'react';
import { Users } from 'lucide-react';
import { BOLIVIA_REGIONS } from '../../pages/TerritorialPage';

interface MobilizationCardProps {
  selectedRegion?: string;
  regionData?: any;
}

export default function MobilizationCard({ selectedRegion, regionData }: MobilizationCardProps) {
  const currentRegion = BOLIVIA_REGIONS.find(r => r.id === selectedRegion);

  return (
    <div className="glassmorphic-container p-8 min-h-[240px]">
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold text-white">Movilización</h3>
          <p className="text-gray-400 text-base">
            Próximamente
            {currentRegion && (
              <span className="block text-sm text-primary">
                {currentRegion.name} ({currentRegion.location})
              </span>
            )}
          </p>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl"></div>
          <div className="relative bg-primary/10 p-5 rounded-full">
            <Users className="w-12 h-12 text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}