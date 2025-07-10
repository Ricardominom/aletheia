import React from 'react';
import { useDashboardStore } from '../store/dashboardStore';

export default function SecondaryIndicators() {
  const { indicators, _hasHydrated } = useDashboardStore(state => ({
    indicators: state.indicators,
    _hasHydrated: state._hasHydrated
  }));

  return (
    <div className="glassmorphic-container p-6 h-full animate-scale-in">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-pink/5 rounded-xl -z-10"></div>
      <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-teal/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-pink/10 rounded-full blur-3xl"></div>
      
      <h2 className="text-lg font-semibold text-white mb-6 text-neon relative z-10">
        INDICADORES DE PROGRESO
      </h2>
      
      <div className="space-y-4 h-[calc(100%-4rem)]">
        {indicators.map((indicator, index) => (
          <div
            key={index}
            className="target-card p-4 relative group animate-scale-in hover:scale-[1.02] transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md rounded-lg -z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            
            {/* Content Layout - Title left, Number right */}
            <div className="flex items-center justify-between relative z-10">
              {/* Left side - Label */}
              <div className="flex-1 pr-4">
                <div className="text-[11px] text-gray-300 uppercase leading-tight font-medium group-hover:text-white transition-colors duration-300">
                  {indicator.type}
                </div>
              </div>
              
              {/* Right side - Value with glow effect */}
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-2 bg-accent-teal/10 rounded-full blur-lg animate-pulse-slow"></div>
                <div className="relative text-[32px] font-bold text-white leading-none tracking-tight text-neon-strong flex items-baseline">
                  {indicator.value}
                  <span className="text-[20px] ml-1">%</span>
                </div>
              </div>
            </div>
            
            {/* Subtle accent line at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-teal/0 via-accent-teal/30 to-accent-teal/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
}