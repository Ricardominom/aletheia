import React, { useState } from 'react';
import { Award } from 'lucide-react';
import EarnedMediaModal from './EarnedMediaModal';

interface EarnedMedia {
  id: string;
  title: string;
  url: string;
  media: string;
}

export default function EarnedMediaCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [earnedMedia, setEarnedMedia] = useState<EarnedMedia[]>([]);

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="glassmorphic-container p-8 cursor-pointer group hover:border-primary/40 transition-all duration-300 min-h-[240px] hover:shadow-2xl hover:-translate-y-1"
      >
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-white">Earned Media</h3>
            <p className="text-gray-400 text-base">Total de notas generadas</p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-accent-teal/20 rounded-full blur-xl group-hover:bg-accent-teal/30 transition-colors duration-300"></div>
            <div className="relative bg-accent-teal/10 p-5 rounded-full group-hover:bg-accent-teal/20 transition-colors duration-300">
              <Award className="w-12 h-12 text-accent-teal" />
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <div className="text-6xl font-bold text-accent-teal text-neon animate-float">
            {earnedMedia.length}
          </div>
        </div>
      </div>

      <EarnedMediaModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        earnedMedia={earnedMedia}
        onAddMedia={(newMedia) => setEarnedMedia([...earnedMedia, newMedia])}
      />
    </>
  );
}