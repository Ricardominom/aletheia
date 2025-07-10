import React from 'react';
import { BarChart3, TrendingUp, Users, Calendar } from 'lucide-react';

export default function EncuestasPage() {
  return (
    <div className="min-h-screen bg-background pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="glassmorphic-container p-12 min-h-[600px] flex flex-col items-center justify-center text-center">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent-teal/5 rounded-xl -z-10"></div>
          <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-teal/10 rounded-full blur-3xl"></div>
          
          {/* Content */}
          <h1 className="text-4xl font-bold text-white mb-4 text-neon">
            Encuestas
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            Contenido de adversarios próximamente
          </p>
          
          {/* Feature Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-4xl">
            <div className="bg-card/50 border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition-all duration-300">
              <Users className="w-8 h-8 text-accent-teal mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Segmentación</h3>
              <p className="text-gray-400 text-sm">Análisis por segmentos demográficos y geográficos</p>
            </div>
            
            <div className="bg-card/50 border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition-all duration-300">
              <Calendar className="w-8 h-8 text-accent-pink mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Programación</h3>
              <p className="text-gray-400 text-sm">Programación automática de encuestas periódicas</p>
            </div>
          </div>
          
          {/* Coming Soon Message */}
          <div className="mt-12 text-center">
            <p className="text-gray-400">
              Esta funcionalidad estará disponible próximamente
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}