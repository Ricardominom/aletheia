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
        </div>
      </div>
    </div>
  );
}