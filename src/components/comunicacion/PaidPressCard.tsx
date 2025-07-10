import React, { useState } from 'react';
import { Newspaper } from 'lucide-react';
import PaidPressModal from './PaidPressModal';

interface PaidPress {
  id: string;
  title: string;
  url: string;
  media: string;
  imageUrl: string;
}

export default function PaidPressCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paidPress, setPaidPress] = useState<PaidPress[]>([
    {
      id: '1',
      title: 'Entrevista exclusiva con el candidato',
      url: 'https://ejemplo.com/entrevista',
      media: 'El Diario',
      imageUrl: 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg',
    },
    {
      id: '2',
      title: 'Análisis de propuestas económicas',
      url: 'https://ejemplo.com/analisis',
      media: 'La Razón',
      imageUrl: 'https://images.pexels.com/photos/6953867/pexels-photo-6953867.jpeg',
    },
  ]);

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="glassmorphic-container p-8 cursor-pointer group hover:border-primary/40 transition-all duration-300 min-h-[240px] hover:shadow-2xl hover:-translate-y-1"
      >
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-white">Prensa Pagada</h3>
            <p className="text-gray-400 text-base">Total de notas colocadas</p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-colors duration-300"></div>
            <div className="relative bg-primary/10 p-5 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
              <Newspaper className="w-12 h-12 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <div className="text-6xl font-bold text-primary text-neon animate-float">
            {paidPress.length}
          </div>
        </div>
      </div>

      <PaidPressModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        paidPress={paidPress}
        onAddPress={(newPress) => setPaidPress([...paidPress, newPress])}
      />
    </>
  );
}