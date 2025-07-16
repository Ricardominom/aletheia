import React from 'react';
import { Users, ChevronDown } from 'lucide-react';
import { BOLIVIA_REGIONS } from '../../pages/TerritorialPage';

export default function MobilizationCard() {
  return (
    <div className="glassmorphic-container p-4 min-h-[300px]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Movilización</h3>
            <p className="text-gray-400 text-sm">Próximamente</p>
          </div>
        </div>
        
        <button
          disabled
          className="flex items-center gap-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-500 cursor-not-allowed"
        >
          <span className="text-sm">Próximamente</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {BOLIVIA_REGIONS.slice(0, 3).map((region, index) => (
          <div
            key={region.id}
            className="bg-card/30 border border-gray-700 rounded-lg p-4 opacity-50"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-gray-500 bg-gray-500/10">
                  #{index + 1}
                </div>
                <div>
                  <h4 className="text-gray-400 font-medium">
                    {region.name}
                  </h4>
                  <p className="text-xs text-gray-500">{region.location}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-gray-500 font-bold text-2xl">
                  --
                </div>
                <div className="text-xs text-gray-500">próximamente</div>
              </div>
            </div>
            
            <div className="h-2 bg-background/30 rounded-lg overflow-hidden">
              <div className="h-full bg-gray-600/30 w-0" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <span className="text-sm text-gray-500">
          Funcionalidad en desarrollo
        </span>
      </div>
    </div>
  );
}