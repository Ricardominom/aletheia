import React, { useState } from 'react';
import { Plus, BarChart3, Calendar, TrendingUp, Users, Trash2 } from 'lucide-react';
import EncuestaModal from '../components/encuestas/EncuestaModal';
import { useDashboardStore } from '../store/dashboardStore';

interface Candidato {
  id: string;
  nombre: string;
  intencionVoto: number;
  varianzaIntencion: number;
  varianzaConocimiento: number;
  varianzaSaldoOpinion: number;
}

interface Encuesta {
  id: string;
  nombre: string;
  fecha: string;
  empresa: string;
  candidatos: Candidato[];
  fechaCreacion: Date;
}

export default function EncuestasPage() {
  const [encuestas, setEncuestas] = useState<Encuesta[]>([
    {
      id: '1',
      nombre: 'Encuesta Municipal Enero 2025',
      fecha: '2025-01-20',
      empresa: 'Encuestadora Nacional',
      candidatos: [
        {
          id: '1',
          nombre: 'CANDIDATO PROPIO',
          intencionVoto: 47.0,
          varianzaIntencion: 2.5,
          varianzaConocimiento: 1.8,
          varianzaSaldoOpinion: -1.2
        },
        {
          id: '2',
          nombre: 'OPOSITOR 1',
          intencionVoto: 9.0,
          varianzaIntencion: -0.5,
          varianzaConocimiento: 0.3,
          varianzaSaldoOpinion: -2.1
        },
        {
          id: '3',
          nombre: 'OPOSITOR 2',
          intencionVoto: 7.0,
          varianzaIntencion: -0.8,
          varianzaConocimiento: -0.2,
          varianzaSaldoOpinion: -1.5
        },
        {
          id: '4',
          nombre: 'NO SABE/NO CONTESTÓ',
          intencionVoto: 37.0,
          varianzaIntencion: -1.2,
          varianzaConocimiento: 0.0,
          varianzaSaldoOpinion: 0.0
        }
      ],
      fechaCreacion: new Date('2025-01-20T10:00:00')
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const updateTacticalData = useDashboardStore(state => state.updateTacticalData);

  const handleAddEncuesta = (nuevaEncuesta: Omit<Encuesta, 'id' | 'fechaCreacion'>) => {
    const encuesta: Encuesta = {
      ...nuevaEncuesta,
      id: Date.now().toString(),
      fechaCreacion: new Date()
    };
    
    setEncuestas([encuesta, ...encuestas]);

    // Actualizar el tracking táctico con los datos de la nueva encuesta
    nuevaEncuesta.candidatos.forEach(candidato => {
      const trend = candidato.varianzaIntencion >= 0 ? 'up' : 'down';
      updateTacticalData({
        date: nuevaEncuesta.fecha,
        candidate: candidato.nombre,
        percentage: candidato.intencionVoto,
        trend
      });
    });
  };

  const handleDeleteEncuesta = (id: string) => {
    setEncuestas(encuestas.filter(encuesta => encuesta.id !== id));
  };

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatFechaCreacion = (fecha: Date) => {
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }) + ' ' + fecha.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Ordenar encuestas por fecha de creación (más recientes primero)
  const encuestasOrdenadas = [...encuestas].sort((a, b) => 
    b.fechaCreacion.getTime() - a.fechaCreacion.getTime()
  );

  return (
    <>
      <div className="min-h-screen bg-background pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="glassmorphic-container p-6 animate-scale-in">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent-teal/5 rounded-xl -z-10"></div>
            <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>
            
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-teal/10 rounded-full blur-3xl"></div>
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-white text-neon">
                    Encuestas
                  </h1>
                  <p className="text-gray-400 text-sm">
                    {encuestas.length} encuesta{encuestas.length !== 1 ? 's' : ''} registrada{encuestas.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300 group"
              >
                <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Agregar Encuesta</span>
              </button>
            </div>

            {/* Content */}
            <div className="relative z-10">
              {encuestas.length === 0 ? (
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-300 mb-2">No hay encuestas registradas</h3>
                  <p className="text-gray-400 mb-6">Crea la primera encuesta para comenzar el seguimiento</p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Crear Encuesta</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {encuestasOrdenadas.map((encuesta, index) => (
                    <div
                      key={encuesta.id}
                      className="bg-card/50 border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Encuesta Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-1">{encuesta.nombre}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4 text-primary" />
                              <span>{formatFecha(encuesta.fecha)}</span>
                            </div>
                            <span>•</span>
                            <span>{encuesta.empresa}</span>
                            <span>•</span>
                            <span>Creado: {formatFechaCreacion(encuesta.fechaCreacion)}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteEncuesta(encuesta.id)}
                          className="p-2 hover:bg-red-500/10 rounded-lg transition-colors duration-300 group"
                          title="Eliminar encuesta"
                        >
                          <Trash2 className="w-5 h-5 text-red-400 group-hover:text-red-300" />
                        </button>
                      </div>

                      {/* Candidatos Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-primary/20">
                              <th className="text-left p-3 text-gray-400 font-medium">Candidato</th>
                              <th className="text-center p-3 text-gray-400 font-medium">Intención de Voto</th>
                              <th className="text-center p-3 text-gray-400 font-medium">Var. Intención</th>
                              <th className="text-center p-3 text-gray-400 font-medium">Var. Conocimiento</th>
                              <th className="text-center p-3 text-gray-400 font-medium">Var. Saldo Opinión</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-primary/10">
                            {encuesta.candidatos.map((candidato) => (
                              <tr key={candidato.id} className="hover:bg-primary/5 transition-colors">
                                <td className="p-3">
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                      <Users className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-white font-medium">{candidato.nombre}</span>
                                  </div>
                                </td>
                                <td className="p-3 text-center">
                                  <span className="text-2xl font-bold text-primary">
                                    {candidato.intencionVoto.toFixed(1)}%
                                  </span>
                                </td>
                                <td className="p-3 text-center">
                                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
                                    candidato.varianzaIntencion >= 0 
                                      ? 'text-green-400 bg-green-400/10' 
                                      : 'text-red-400 bg-red-400/10'
                                  }`}>
                                    <TrendingUp className={`w-3 h-3 ${
                                      candidato.varianzaIntencion < 0 ? 'rotate-180' : ''
                                    }`} />
                                    <span>{candidato.varianzaIntencion > 0 ? '+' : ''}{candidato.varianzaIntencion.toFixed(1)}%</span>
                                  </div>
                                </td>
                                <td className="p-3 text-center">
                                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
                                    candidato.varianzaConocimiento >= 0 
                                      ? 'text-green-400 bg-green-400/10' 
                                      : 'text-red-400 bg-red-400/10'
                                  }`}>
                                    <TrendingUp className={`w-3 h-3 ${
                                      candidato.varianzaConocimiento < 0 ? 'rotate-180' : ''
                                    }`} />
                                    <span>{candidato.varianzaConocimiento > 0 ? '+' : ''}{candidato.varianzaConocimiento.toFixed(1)}%</span>
                                  </div>
                                </td>
                                <td className="p-3 text-center">
                                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
                                    candidato.varianzaSaldoOpinion >= 0 
                                      ? 'text-green-400 bg-green-400/10' 
                                      : 'text-red-400 bg-red-400/10'
                                  }`}>
                                    <TrendingUp className={`w-3 h-3 ${
                                      candidato.varianzaSaldoOpinion < 0 ? 'rotate-180' : ''
                                    }`} />
                                    <span>{candidato.varianzaSaldoOpinion > 0 ? '+' : ''}{candidato.varianzaSaldoOpinion.toFixed(1)}%</span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <EncuestaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddEncuesta}
      />
    </>
  );
}