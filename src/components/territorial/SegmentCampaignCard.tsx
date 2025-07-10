import React, { useState } from 'react';
import { Users } from 'lucide-react';
import SegmentCampaignModal from './SegmentCampaignModal';

interface Segment {
  id: string;
  name: string;
}

export default function SegmentCampaignCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [segments, setSegments] = useState<Segment[]>([
    { id: '1', name: 'Ambientalistas' },
    { id: '2', name: 'Mayores de edad' },
    { id: '3', name: 'Mujeres embarazadas' },
  ]);

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="glassmorphic-container p-8 cursor-pointer group hover:border-primary/40 transition-all duration-300 min-h-[240px] hover:shadow-2xl hover:-translate-y-1"
      >
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-white">Campaña por Segmento</h3>
            <p className="text-gray-400 text-base">Segmentos definidos</p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-colors duration-300"></div>
            <div className="relative bg-primary/10 p-5 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
              <Users className="w-12 h-12 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <div className="text-6xl font-bold text-primary text-neon animate-float">
            {segments.length}
          </div>
        </div>
      </div>

      <SegmentCampaignModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        segments={segments}
        onAddSegment={(segment) => setSegments([...segments, segment])}
      />
    </>
  );
}