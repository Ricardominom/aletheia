import React, { useState } from 'react';
import { Trophy, Target, TrendingUp, TrendingDown, MapPin, Users, Calendar, Megaphone, FileBox } from 'lucide-react';

interface DepartmentData {
  id: string;
  name: string;
  region: string;
  color: string;
  estructuraElectoral: {
    current: number;
    target: number;
  };
  eventos: {
    current: number;
    target: number;
  };
  promocion: {
    current: number;
    target: number;
  };
  segmentos: {
    current: number;
    target: number;
  };
  movilizacion: {
    current: number;
    target: number;
  };
}

const DEPARTMENTS: DepartmentData[] = [
  {
    id: 'pando',
    name: 'Pando',
    region: 'Norte',
    color: '#10B981',
    estructuraElectoral: { current: 45, target: 100 },
    eventos: { current: 3, target: 8 },
    promocion: { current: 120, target: 300 },
    segmentos: { current: 2, target: 5 },
    movilizacion: { current: 80, target: 200 }
  },
  {
    id: 'beni',
    name: 'Beni',
    region: 'Norte-Centro',
    color: '#3B82F6',
    estructuraElectoral: { current: 67, target: 150 },
    eventos: { current: 5, target: 12 },
    promocion: { current: 180, target: 400 },
    segmentos: { current: 3, target: 6 },
    movilizacion: { current: 110, target: 250 }
  },
  {
    id: 'lapaz',
    name: 'La Paz',
    region: 'Oeste',
    color: '#8B5CF6',
    estructuraElectoral: { current: 234, target: 400 },
    eventos: { current: 12, target: 25 },
    promocion: { current: 450, target: 800 },
    segmentos: { current: 8, target: 12 },
    movilizacion: { current: 320, target: 600 }
  },
  {
    id: 'oruro',
    name: 'Oruro',
    region: 'Oeste-Centro',
    color: '#F59E0B',
    estructuraElectoral: { current: 89, target: 180 },
    eventos: { current: 6, target: 15 },
    promocion: { current: 210, target: 450 },
    segmentos: { current: 4, target: 8 },
    movilizacion: { current: 140, target: 300 }
  },
  {
    id: 'cochabamba',
    name: 'Cochabamba',
    region: 'Centro',
    color: '#EF4444',
    estructuraElectoral: { current: 198, target: 350 },
    eventos: { current: 10, target: 20 },
    promocion: { current: 380, target: 700 },
    segmentos: { current: 7, target: 10 },
    movilizacion: { current: 280, target: 500 }
  },
  {
    id: 'potosi',
    name: 'Potosí',
    region: 'Suroeste',
    color: '#6366F1',
    estructuraElectoral: { current: 76, target: 160 },
    eventos: { current: 4, target: 12 },
    promocion: { current: 165, target: 400 },
    segmentos: { current: 3, target: 7 },
    movilizacion: { current: 95, target: 280 }
  },
  {
    id: 'chuquisaca',
    name: 'Chuquisaca',
    region: 'Sur-Centro',
    color: '#EC4899',
    estructuraElectoral: { current: 54, target: 120 },
    eventos: { current: 3, target: 10 },
    promocion: { current: 135, target: 320 },
    segmentos: { current: 2, target: 6 },
    movilizacion: { current: 75, target: 220 }
  },
  {
    id: 'tarija',
    name: 'Tarija',
    region: 'Sur',
    color: '#14B8A6',
    estructuraElectoral: { current: 43, target: 100 },
    eventos: { current: 2, target: 8 },
    promocion: { current: 98, target: 250 },
    segmentos: { current: 2, target: 5 },
    movilizacion: { current: 60, target: 180 }
  },
  {
    id: 'santacruz',
    name: 'Santa Cruz',
    region: 'Este',
    color: '#F97316',
    estructuraElectoral: { current: 312, target: 500 },
    eventos: { current: 15, target: 30 },
    promocion: { current: 520, target: 900 },
    segmentos: { current: 9, target: 15 },
    movilizacion: { current: 380, target: 700 }
  }
];

interface MetricCardProps {
  title: string;
  icon: React.ReactNode;
  departments: DepartmentData[];
  metricKey: keyof Omit<DepartmentData, 'id' | 'name' | 'region' | 'color'>;
}

function MetricCard({ title, icon, departments, metricKey }: MetricCardProps) {
  // Calcular progreso para cada departamento
  const departmentsWithProgress = departments.map(dept => {
    const metric = dept[metricKey] as { current: number; target: number };
    const progress = (metric.current / metric.target) * 100;
    return {
      ...dept,
      progress,
      metric
    };
  }).sort((a, b) => b.progress - a.progress); // Ordenar por progreso descendente

  const leader = departmentsWithProgress[0];
  const laggard = departmentsWithProgress[departmentsWithProgress.length - 1];

  return (
    <div className="glassmorphic-container p-6 animate-scale-in">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent-teal/5 rounded-xl -z-10"></div>
      <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 p-3 rounded-lg">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white text-neon">{title}</h3>
          <p className="text-gray-400 text-sm">Competencia por departamentos</p>
        </div>
      </div>

      {/* Ranking */}
      <div className="space-y-3">
        {departmentsWithProgress.map((dept, index) => {
          const isLeader = index === 0;
          const isLaggard = index === departmentsWithProgress.length - 1;
          
          return (
            <div
              key={dept.id}
              className={`relative p-4 rounded-lg border transition-all duration-300 ${
                isLeader 
                  ? 'bg-green-500/10 border-green-500/30 shadow-lg' 
                  : isLaggard 
                    ? 'bg-red-500/10 border-red-500/30' 
                    : 'bg-card/50 border-primary/20'
              }`}
            >
              {/* Ranking badge */}
              <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{
                backgroundColor: dept.color,
                color: 'white'
              }}>
                {index + 1}
              </div>

              {/* Leader/Laggard badges */}
              {isLeader && (
                <div className="absolute -top-2 -right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Trophy className="w-3 h-3" />
                  LÍDER
                </div>
              )}
              {isLaggard && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Target className="w-3 h-3" />
                  REZAGADO
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" style={{ color: dept.color }} />
                    <div>
                      <div className="font-semibold text-white">{dept.name}</div>
                      <div className="text-xs text-gray-400">{dept.region}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-300">
                      {dept.metric.current}/{dept.metric.target}
                    </div>
                    <div className={`text-lg font-bold ${
                      dept.progress >= 80 ? 'text-green-400' :
                      dept.progress >= 50 ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {dept.progress.toFixed(1)}%
                    </div>
                  </div>
                  
                  <div className={`p-2 rounded-full ${
                    isLeader ? 'bg-green-500/20' :
                    isLaggard ? 'bg-red-500/20' :
                    'bg-primary/20'
                  }`}>
                    {dept.progress >= 50 ? (
                      <TrendingUp className={`w-5 h-5 ${
                        isLeader ? 'text-green-400' : 'text-primary'
                      }`} />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3 h-2 bg-background/50 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-500 relative"
                  style={{ 
                    width: `${dept.progress}%`,
                    backgroundColor: dept.color
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary stats */}
      <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-primary/20">
        <div className="text-center">
          <div className="text-lg font-bold text-green-400">{leader.progress.toFixed(1)}%</div>
          <div className="text-xs text-gray-400">Mejor</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-primary">
            {(departmentsWithProgress.reduce((sum, dept) => sum + dept.progress, 0) / departmentsWithProgress.length).toFixed(1)}%
          </div>
          <div className="text-xs text-gray-400">Promedio</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-red-400">{laggard.progress.toFixed(1)}%</div>
          <div className="text-xs text-gray-400">Menor</div>
        </div>
      </div>
    </div>
  );
}

export default function TerritorialPage() {
  return (
    <div className="min-h-screen bg-background pt-24 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white mb-8">Territorial - Competencia Departamental</h1>
          <div className="bg-card/50 border border-primary/20 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Total Nacional</div>
            <div className="text-2xl font-bold text-primary">
              {DEPARTMENTS.reduce((sum, dept) => sum + dept.estructuraElectoral.current, 0).toLocaleString()} defensores
            </div>
          </div>
        </div>
        
        {/* Grid layout for cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MetricCard
            title="Estructura Electoral"
            icon={<Users className="w-6 h-6 text-primary" />}
            departments={DEPARTMENTS}
            metricKey="estructuraElectoral"
          />
          
          <MetricCard
            title="Eventos Realizados"
            icon={<Calendar className="w-6 h-6 text-primary" />}
            departments={DEPARTMENTS}
            metricKey="eventos"
          />
          
          <MetricCard
            title="Personas Promovidas"
            icon={<Megaphone className="w-6 h-6 text-primary" />}
            departments={DEPARTMENTS}
            metricKey="promocion"
          />
          
          <MetricCard
            title="Segmentos Definidos"
            icon={<FileBox className="w-6 h-6 text-primary" />}
            departments={DEPARTMENTS}
            metricKey="segmentos"
          />
        </div>

        {/* Movilización - Full width */}
        <div className="grid grid-cols-1">
          <MetricCard
            title="Movilización"
            icon={<Users className="w-6 h-6 text-primary" />}
            departments={DEPARTMENTS}
            metricKey="movilizacion"
          />
        </div>
      </div>
    </div>
  );
}