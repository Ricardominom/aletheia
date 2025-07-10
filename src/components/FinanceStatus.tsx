import React from 'react';
import { MessageSquare, Calendar, Clock, Plus } from 'lucide-react';
import { useState } from 'react';
import AvisoModal from './cochabamba/AvisoModal';

interface Aviso {
  id: string;
  mensaje: string;
  fecha: string;
  hora: string;
  fechaCreacion: Date;
}

export default function FinanceStatus() {
  const [avisos, setAvisos] = useState<Aviso[]>([
    {
      id: '1',
      mensaje: 'Reunión de coordinación general programada para mañana a las 10:00 AM en la sede central.',
      fecha: '2025-01-24',
      hora: '10:00',
      fechaCreacion: new Date('2025-01-23T14:30:00')
    },
    {
      id: '2',
      mensaje: 'Recordatorio: Entrega de materiales de campaña en los distritos 1, 2 y 3.',
      fecha: '2025-01-23',
      hora: '16:00',
      fechaCreacion: new Date('2025-01-23T09:15:00')
    },
    {
      id: '3',
      mensaje: 'Evento público en la Plaza Principal. Se requiere apoyo de todos los coordinadores.',
      fecha: '2025-01-25',
      hora: '18:30',
      fechaCreacion: new Date('2025-01-22T11:45:00')
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddAviso = (nuevoAviso: Omit<Aviso, 'id' | 'fechaCreacion'>) => {
    const aviso: Aviso = {
      ...nuevoAviso,
      id: Date.now().toString(),
      fechaCreacion: new Date()
    };
    setAvisos([aviso, ...avisos]);
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
      day: '2-digit',
      month: '2-digit'
    }) + ' ' + hora;
  };

  // Ordenar avisos por fecha de creación (más recientes primero)
  const avisosOrdenados = [...avisos].sort((a, b) => 
    b.fechaCreacion.getTime() - a.fechaCreacion.getTime()
  );

  return (
    <>
      <div className="glassmorphic-container p-5 h-[480px] flex flex-col animate-scale-in">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-[#F88379]/5 rounded-xl -z-10"></div>
        <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-teal/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#F88379]/10 rounded-full blur-3xl"></div>
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white text-neon">
                Avisos Cochabamba
              </h2>
              <p className="text-xs text-gray-400">
                {avisos.length} aviso{avisos.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 px-3 py-2 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300 group"
          >
            <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Nuevo</span>
          </button>
        </div>

        {/* Avisos List */}
        <div className="flex-1 overflow-y-auto space-y-3 relative z-10 pr-2">
          {avisosOrdenados.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-300 mb-2">No hay avisos</h3>
              <p className="text-gray-400 text-sm mb-4">Crea el primer aviso</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm">Crear Aviso</span>
              </button>
            </div>
          ) : (
            avisosOrdenados.map((aviso, index) => (
              <div
                key={aviso.id}
                className="bg-card/50 border border-primary/20 rounded-lg p-4 hover:border-primary/40 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="space-y-2">
                  <p className="text-white text-sm font-medium leading-relaxed line-clamp-3">
                    {aviso.mensaje}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-primary">
                      <Calendar className="w-3 h-3" />
                      <span>{formatFechaEvento(aviso.fecha, aviso.hora)}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{formatFechaCreacion(aviso.fechaCreacion)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <AvisoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddAviso}
      />
    </>
  );
}