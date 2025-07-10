import React, { useState } from 'react';
import { Plus, Users, Calendar, Clock, Trash2, Tag, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import AdversarioModal from './AdversarioModal';
import ActualizacionModal from './ActualizacionModal';

interface Adversario {
  id: string;
  nombre: string;
  partido: string;
  descripcion: string;
  fechaCreacion: Date;
}

interface Actualizacion {
  id: string;
  adversarioId: string;
  adversarioNombre: string;
  mensaje: string;
  tipo: 'positiva' | 'negativa' | 'neutral';
  fecha: string;
  hora: string;
  fechaCreacion: Date;
}

export default function AdversariosTable() {
  const [adversarios, setAdversarios] = useState<Adversario[]>([
    {
      id: '1',
      nombre: 'Carlos Mendoza',
      partido: 'Partido Opositor A',
      descripcion: 'Candidato principal de la oposición con experiencia en gestión municipal',
      fechaCreacion: new Date('2025-01-20T10:00:00')
    },
    {
      id: '2',
      nombre: 'Ana Rodríguez',
      partido: 'Movimiento Ciudadano',
      descripcion: 'Líder del movimiento ciudadano independiente',
      fechaCreacion: new Date('2025-01-18T15:30:00')
    }
  ]);

  const [actualizaciones, setActualizaciones] = useState<Actualizacion[]>([
    {
      id: '1',
      adversarioId: '1',
      adversarioNombre: 'Carlos Mendoza',
      mensaje: 'Realizó declaraciones controversiales sobre el presupuesto municipal que generaron críticas en redes sociales.',
      tipo: 'positiva',
      fecha: '2025-01-23',
      hora: '14:30',
      fechaCreacion: new Date('2025-01-23T14:30:00')
    },
    {
      id: '2',
      adversarioId: '2',
      adversarioNombre: 'Ana Rodríguez',
      mensaje: 'Presentó propuesta de mejora en transporte público que fue bien recibida por la ciudadanía.',
      tipo: 'negativa',
      fecha: '2025-01-22',
      hora: '16:00',
      fechaCreacion: new Date('2025-01-22T16:00:00')
    },
    {
      id: '3',
      adversarioId: '1',
      adversarioNombre: 'Carlos Mendoza',
      mensaje: 'Participó en debate televisivo con propuestas moderadas.',
      tipo: 'neutral',
      fecha: '2025-01-21',
      hora: '20:00',
      fechaCreacion: new Date('2025-01-21T20:00:00')
    }
  ]);

  const [isAdversarioModalOpen, setIsAdversarioModalOpen] = useState(false);
  const [isActualizacionModalOpen, setIsActualizacionModalOpen] = useState(false);

  const handleAddAdversario = (nuevoAdversario: Omit<Adversario, 'id' | 'fechaCreacion'>) => {
    const adversario: Adversario = {
      ...nuevoAdversario,
      id: Date.now().toString(),
      fechaCreacion: new Date()
    };
    setAdversarios([adversario, ...adversarios]);
  };

  const handleAddActualizacion = (nuevaActualizacion: Omit<Actualizacion, 'id' | 'fechaCreacion' | 'adversarioNombre'>) => {
    const adversario = adversarios.find(a => a.id === nuevaActualizacion.adversarioId);
    if (!adversario) return;

    const actualizacion: Actualizacion = {
      ...nuevaActualizacion,
      adversarioNombre: adversario.nombre,
      id: Date.now().toString(),
      fechaCreacion: new Date()
    };
    setActualizaciones([actualizacion, ...actualizaciones]);
  };

  const handleDeleteAdversario = (id: string) => {
    setAdversarios(adversarios.filter(adversario => adversario.id !== id));
    // También eliminar todas las actualizaciones de este adversario
    setActualizaciones(actualizaciones.filter(act => act.adversarioId !== id));
  };

  const handleDeleteActualizacion = (id: string) => {
    setActualizaciones(actualizaciones.filter(actualizacion => actualizacion.id !== id));
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

  const formatFechaEvento = (fecha: string, hora: string) => {
    const fechaObj = new Date(fecha + 'T' + hora);
    return fechaObj.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }) + ' a las ' + hora;
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'positiva':
        return <TrendingUp className="w-4 h-4" />;
      case 'negativa':
        return <TrendingDown className="w-4 h-4" />;
      case 'neutral':
        return <Minus className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'positiva':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'negativa':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'neutral':
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'positiva':
        return 'Positiva para nosotros';
      case 'negativa':
        return 'Negativa para nosotros';
      case 'neutral':
        return 'Neutral';
      default:
        return 'Neutral';
    }
  };

  // Ordenar actualizaciones por fecha de creación (más recientes primero)
  const actualizacionesOrdenadas = [...actualizaciones].sort((a, b) => 
    b.fechaCreacion.getTime() - a.fechaCreacion.getTime()
  );

  return (
    <>
      <div className="space-y-6">
        {/* Sección de Adversarios */}
        <div className="glassmorphic-container p-6 animate-scale-in">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-pink/5 to-primary/5 rounded-xl -z-10"></div>
          <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-pink/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-3xl"></div>
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="bg-accent-pink/10 p-3 rounded-lg">
                <Users className="w-6 h-6 text-accent-pink" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white text-neon">
                  Adversarios Registrados
                </h2>
                <p className="text-gray-400 text-sm">
                  {adversarios.length} adversario{adversarios.length !== 1 ? 's' : ''} registrado{adversarios.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setIsAdversarioModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-accent-pink/10 border border-accent-pink/30 rounded-lg text-accent-pink hover:bg-accent-pink/20 transition-all duration-300 group"
            >
              <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Nuevo Adversario</span>
            </button>
          </div>

          {/* Adversarios Grid */}
          <div className="relative z-10">
            {adversarios.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-300 mb-2">No hay adversarios registrados</h3>
                <p className="text-gray-400 mb-6">Registra el primer adversario para comenzar el seguimiento</p>
                <button
                  onClick={() => setIsAdversarioModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent-pink/10 border border-accent-pink/30 rounded-lg text-accent-pink hover:bg-accent-pink/20 transition-all duration-300"
                >
                  <Plus className="w-5 h-5" />
                  <span>Registrar Adversario</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {adversarios.map((adversario, index) => (
                  <div
                    key={adversario.id}
                    className="bg-card/50 border border-accent-pink/20 rounded-lg p-4 hover:border-accent-pink/40 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-white font-semibold">{adversario.nombre}</h3>
                      <button
                        onClick={() => handleDeleteAdversario(adversario.id)}
                        className="p-1 hover:bg-red-500/10 rounded-lg transition-colors duration-300 group"
                        title="Eliminar adversario"
                      >
                        <Trash2 className="w-4 h-4 text-red-400 group-hover:text-red-300" />
                      </button>
                    </div>
                    <p className="text-accent-pink text-sm font-medium mb-2">{adversario.partido}</p>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{adversario.descripcion}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>Registrado: {formatFechaCreacion(adversario.fechaCreacion)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sección de Actualizaciones */}
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
                <Tag className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white text-neon">
                  Actualizaciones de Adversarios
                </h2>
                <p className="text-gray-400 text-sm">
                  {actualizaciones.length} actualización{actualizaciones.length !== 1 ? 'es' : ''} registrada{actualizaciones.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setIsActualizacionModalOpen(true)}
              disabled={adversarios.length === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 group ${
                adversarios.length === 0
                  ? 'bg-gray-800 border border-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20'
              }`}
            >
              <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Nueva Actualización</span>
            </button>
          </div>

          {/* Actualizaciones Table */}
          <div className="relative z-10">
            {actualizaciones.length === 0 ? (
              <div className="text-center py-12">
                <Tag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-300 mb-2">No hay actualizaciones</h3>
                <p className="text-gray-400 mb-6">
                  {adversarios.length === 0 
                    ? 'Primero registra un adversario para poder crear actualizaciones'
                    : 'Crea la primera actualización para comenzar el seguimiento'
                  }
                </p>
                {adversarios.length > 0 && (
                  <button
                    onClick={() => setIsActualizacionModalOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Crear Actualización</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-primary/20">
                      <th className="text-left p-4 text-gray-400 font-medium">Adversario</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Actualización</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Tipo</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Fecha del Evento</th>
                      <th className="text-left p-4 text-gray-400 font-medium">Registrado</th>
                      <th className="text-center p-4 text-gray-400 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/10">
                    {actualizacionesOrdenadas.map((actualizacion, index) => (
                      <tr 
                        key={actualizacion.id}
                        className="hover:bg-primary/5 transition-colors animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-accent-pink/10 rounded-full flex items-center justify-center">
                              <Users className="w-4 h-4 text-accent-pink" />
                            </div>
                            <span className="text-white font-medium">{actualizacion.adversarioNombre}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="max-w-md">
                            <p className="text-white leading-relaxed">
                              {actualizacion.mensaje}
                            </p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getTipoColor(actualizacion.tipo)}`}>
                            {getTipoIcon(actualizacion.tipo)}
                            <span>{getTipoLabel(actualizacion.tipo)}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-gray-300">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="text-sm">
                              {formatFechaEvento(actualizacion.fecha, actualizacion.hora)}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">
                              {formatFechaCreacion(actualizacion.fechaCreacion)}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleDeleteActualizacion(actualizacion.id)}
                            className="p-2 hover:bg-red-500/10 rounded-lg transition-colors duration-300 group"
                            title="Eliminar actualización"
                          >
                            <Trash2 className="w-4 h-4 text-red-400 group-hover:text-red-300" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AdversarioModal
        isOpen={isAdversarioModalOpen}
        onClose={() => setIsAdversarioModalOpen(false)}
        onSubmit={handleAddAdversario}
      />

      <ActualizacionModal
        isOpen={isActualizacionModalOpen}
        onClose={() => setIsActualizacionModalOpen(false)}
        onSubmit={handleAddActualizacion}
        adversarios={adversarios}
      />
    </>
  );
}