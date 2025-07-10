import React, { useState } from 'react';
import { Users, Calendar, Settings } from 'lucide-react';
import ElectoralStructureModal from './ElectoralStructureModal';

interface Defender {
  id: string;
  name: string;
  phone: string;
  email: string;
  pollingStation?: string;
}

export default function ElectoralStructureCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defenders, setDefenders] = useState<Defender[]>([]);
  const [electionDate, setElectionDate] = useState<string>('2025-05-01');
  const [targetDefenders, setTargetDefenders] = useState<number>(1000);
  const [hasInitialConfig, setHasInitialConfig] = useState(false);

  // Calculate days until election
  const daysUntilElection = Math.ceil(
    (new Date(electionDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleInitialConfig = (date: string, target: number) => {
    setElectionDate(date);
    setTargetDefenders(target);
    setHasInitialConfig(true);
  };

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="glassmorphic-container p-8 cursor-pointer group hover:border-primary/40 transition-all duration-300 min-h-[240px] hover:shadow-2xl hover:-translate-y-1"
      >
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-white">Estructura Electoral</h3>
            <p className="text-gray-400 text-base">Defensores capacitados</p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-accent-teal/20 rounded-full blur-xl group-hover:bg-accent-teal/30 transition-colors duration-300"></div>
            <div className="relative bg-accent-teal/10 p-5 rounded-full group-hover:bg-accent-teal/20 transition-colors duration-300">
              <Users className="w-12 h-12 text-accent-teal" />
            </div>
          </div>
        </div>
        
        <div className="mt-8 space-y-4">
          <div className="text-6xl font-bold text-accent-teal text-neon animate-float">
            {defenders.length}/{targetDefenders}
          </div>
          
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>Faltan {daysUntilElection} días para la elección</span>
          </div>
        </div>
      </div>

      <ElectoralStructureModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defenders={defenders}
        onAddDefender={(defender) => setDefenders([...defenders, defender])}
        electionDate={electionDate}
        onUpdateElectionDate={setElectionDate}
        targetDefenders={targetDefenders}
        onUpdateTargetDefenders={setTargetDefenders}
        hasInitialConfig={hasInitialConfig}
        onInitialConfig={handleInitialConfig}
      />
    </>
  );
}