import React, { useState, useMemo } from 'react';
import { Calendar } from 'lucide-react';
import EventsModal from './EventsModal';

interface Event {
  id: string;
  title: string;
  date: string;
  expectedAttendees: number;
}

export default function EventsCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  // Get the nearest upcoming event
  const nearestEvent = useMemo(() => {
    const now = new Date();
    return events
      .filter(event => new Date(event.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
  }, [events]);

  // Calculate days until the event
  const daysUntil = useMemo(() => {
    if (!nearestEvent) return 0;
    const now = new Date();
    const eventDate = new Date(nearestEvent.date);
    const diffTime = Math.abs(eventDate.getTime() - now.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [nearestEvent]);

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="glassmorphic-container p-8 cursor-pointer group hover:border-primary/40 transition-all duration-300 min-h-[240px] hover:shadow-2xl hover:-translate-y-1"
      >
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-white">Eventos</h3>
            <p className="text-gray-400 text-base">Próximo evento</p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-colors duration-300"></div>
            <div className="relative bg-primary/10 p-5 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
              <Calendar className="w-12 h-12 text-primary" />
            </div>
          </div>
        </div>
        
        {nearestEvent ? (
          <div className="mt-8 space-y-4">
            <div className="text-2xl font-bold text-primary text-neon">
              {nearestEvent.title}
            </div>
            <div className="flex items-center justify-between text-gray-400">
              <div className="space-y-1">
                <div className="text-sm">
                  {new Date(nearestEvent.date).toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="text-sm text-primary font-medium">
                  Faltan {daysUntil} día{daysUntil !== 1 ? 's' : ''}
                </div>
              </div>
              <div className="text-sm">
                {nearestEvent.expectedAttendees.toLocaleString()} asistentes esperados
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 text-gray-400">
            No hay eventos próximos programados
          </div>
        )}
      </div>

      <EventsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        events={events}
        onAddEvent={(event) => setEvents([...events, event])}
      />
    </>
  );
}