import React from 'react';
import { Users } from 'lucide-react';

export default function MobilizationCard() {
  return (
    <div className="glassmorphic-container p-8 min-h-[240px]">
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold text-white">Movilización</h3>
          <p className="text-gray-400 text-base">Próximamente</p>
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