import React, { useState } from 'react';
import { MapPin, Users, Calendar, Target, Megaphone } from 'lucide-react';

// Departamentos de Bolivia con información adicional
const DEPARTAMENTOS = [
  { id: 'la-paz', name: 'La Paz', region: 'Oeste', capital: 'La Paz', color: 'bg-blue-500' },
  { id: 'cochabamba', name: 'Cochabamba', region: 'Centro', capital: 'Cochabamba', color: 'bg-green-500' },
  { id: 'santa-cruz', name: 'Santa Cruz', region: 'Este', capital: 'Santa Cruz', color: 'bg-yellow-500' },
  { id: 'oruro', name: 'Oruro', region: 'Oeste-Centro', capital: 'Oruro', color: 'bg-purple-500' },
  { id: 'potosi', name: 'Potosí', region: 'Suroeste', capital: 'Potosí', color: 'bg-red-500' },
  { id: 'tarija', name: 'Tarija', region: 'Sur', capital: 'Tarija', color: 'bg-orange-500' },
  { id: 'chuquisaca', name: 'Chuquisaca', region: 'Sur-Centro', capital: 'Sucre', color: 'bg-pink-500' },
  { id: 'beni', name: 'Beni', region: 'Norte-Centro', capital: 'Trinidad', color: 'bg-teal-500' },
  { id: 'pando', name: 'Pando', region: 'Norte', capital: 'Cobija', color: 'bg-indigo-500' },
];

// Datos mock por departamento
const getDepartmentData = (departmentId: string) => ({
  estructuraElectoral: {
    defensores: Math.floor(Math.random() * 200) + 50,
    metaDefensores: 300,
    casillas: Math.floor(Math.random() * 500) + 100,
  },
  eventos: {
    proximos: Math.floor(Math.random() * 5) + 1,
    realizados: Math.floor(Math.random() * 10) + 5,
  },
  promocion: {
    promovidos: Math.floor(Math.random() * 1000) + 200,
    meta: 1500,
  },
  segmentos: [
    'Jóvenes',
    'Mujeres',
    'Adultos mayores',
    'Comerciantes',
    'Estudiantes',
  ].slice(0, Math.floor(Math.random() * 3) + 2),
  movilizacion: {
    eventos: Math.floor(Math.random() * 8) + 2,
    participantes: Math.floor(Math.random() * 5000) + 1000,
  },
});

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  progress?: number;
}

function MetricCard({ title, value, subtitle, icon, color, progress }: MetricCardProps) {
  return (
    <div className="glassmorphic-container p-6 hover:border-primary/40 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}/10 group-hover:${color}/20 transition-colors duration-300`}>
          <div className={`text-${color.split('-')[1]}-400`}>
            {icon}
          </div>
        </div>
      </div>
      
      <div className="text-3xl font-bold text-white mb-2 text-neon">
        {value}
      </div>
      
      {progress !== undefined && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Progreso</span>
            <span className="text-primary font-medium">{progress.toFixed(1)}%</span>
          </div>
          <div className="h-2 bg-background/50 rounded-lg overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TerritorialPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('cochabamba');
  
  const currentDepartment = DEPARTAMENTOS.find(d => d.id === selectedDepartment);
  const departmentData = getDepartmentData(selectedDepartment);

  return (
    <div className="min-h-screen bg-background pt-24 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-primary/10 p-3 rounded-lg">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white text-neon">Territorial</h1>
            <p className="text-gray-400">Gestión por departamentos de Bolivia</p>
          </div>
        </div>

        {/* Tabs de Departamentos */}
        <div className="glassmorphic-container p-2">
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
            {DEPARTAMENTOS.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept.id)}
                className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedDepartment === dept.id
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-primary/10'
                }`}
              >
                <div className="text-center">
                  <div className={`w-3 h-3 rounded-full ${dept.color} mx-auto mb-1`}></div>
                  <div className="font-semibold">{dept.name}</div>
                  <div className="text-xs opacity-75">{dept.region}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Información del Departamento Seleccionado */}
        {currentDepartment && (
          <div className="glassmorphic-container p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-full ${currentDepartment.color} flex items-center justify-center`}>
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{currentDepartment.name}</h2>
                <p className="text-gray-400">
                  {currentDepartment.region} • Capital: {currentDepartment.capital}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Métricas del Departamento */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Estructura Electoral */}
          <MetricCard
            title="Estructura Electoral"
            value={`${departmentData.estructuraElectoral.defensores}/${departmentData.estructuraElectoral.metaDefensores}`}
            subtitle="Defensores capacitados"
            icon={<Users className="w-6 h-6" />}
            color="bg-accent-teal"
            progress={(departmentData.estructuraElectoral.defensores / departmentData.estructuraElectoral.metaDefensores) * 100}
          />

          {/* Eventos */}
          <MetricCard
            title="Eventos"
            value={departmentData.eventos.proximos}
            subtitle={`${departmentData.eventos.realizados} eventos realizados`}
            icon={<Calendar className="w-6 h-6" />}
            color="bg-primary"
          />

          {/* Promoción */}
          <MetricCard
            title="Promoción"
            value={`${departmentData.promocion.promovidos}/${departmentData.promocion.meta}`}
            subtitle="Personas promovidas"
            icon={<Target className="w-6 h-6" />}
            color="bg-accent-pink"
            progress={(departmentData.promocion.promovidos / departmentData.promocion.meta) * 100}
          />

          {/* Campaña por Segmento */}
          <MetricCard
            title="Campaña por Segmento"
            value={departmentData.segmentos.length}
            subtitle="Segmentos definidos"
            icon={<Users className="w-6 h-6" />}
            color="bg-secondary"
          />

          {/* Movilización */}
          <MetricCard
            title="Movilización"
            value={departmentData.movilizacion.participantes.toLocaleString()}
            subtitle={`${departmentData.movilizacion.eventos} eventos de movilización`}
            icon={<Megaphone className="w-6 h-6" />}
            color="bg-tertiary"
          />

          {/* Casillas Electorales */}
          <MetricCard
            title="Casillas Electorales"
            value={departmentData.estructuraElectoral.casillas}
            subtitle="Total de casillas"
            icon={<MapPin className="w-6 h-6" />}
            color="bg-accent-teal"
          />
        </div>

        {/* Detalles por Segmentos */}
        <div className="glassmorphic-container p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Segmentos Activos en {currentDepartment?.name}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {departmentData.segmentos.map((segmento, index) => (
              <div
                key={index}
                className="bg-card/50 border border-primary/20 rounded-lg p-3 text-center hover:border-primary/40 transition-all duration-300"
              >
                <div className="text-white font-medium">{segmento}</div>
                <div className="text-sm text-gray-400 mt-1">
                  {Math.floor(Math.random() * 500) + 100} personas
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen Nacional */}
        <div className="glassmorphic-container p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Resumen Nacional</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-teal mb-1">
                {DEPARTAMENTOS.reduce((acc, dept) => acc + getDepartmentData(dept.id).estructuraElectoral.defensores, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Total Defensores</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {DEPARTAMENTOS.reduce((acc, dept) => acc + getDepartmentData(dept.id).eventos.realizados, 0)}
              </div>
              <div className="text-sm text-gray-400">Eventos Realizados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-pink mb-1">
                {DEPARTAMENTOS.reduce((acc, dept) => acc + getDepartmentData(dept.id).promocion.promovidos, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Personas Promovidas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-tertiary mb-1">
                {DEPARTAMENTOS.reduce((acc, dept) => acc + getDepartmentData(dept.id).movilizacion.participantes, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Participantes Movilizados</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}