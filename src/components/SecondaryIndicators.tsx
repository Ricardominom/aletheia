import React from 'react';
import { useDashboardStore } from '../store/dashboardStore';

export default function SecondaryIndicators() {
  const indicators = useDashboardStore(state => state.indicators);

  return (
    <div className="glassmorphic-container p-5 h-[480px] animate-scale-in">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-pink/5 rounded-xl -z-10"></div>
      <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-teal/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-pink/10 rounded-full blur-3xl"></div>
      
      <div className="grid grid-cols-2 gap-4 h-full">
        {indicators.map((indicator, index) => (
          <div
            key={index}
            className="target-card p-6 flex flex-col items-center justify-center text-center relative group animate-scale-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md rounded-lg -z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            
            {/* Value with glow effect */}
            <div className="relative mb-4">
              <div className="absolute -inset-4 bg-accent-teal/10 rounded-full blur-2xl animate-pulse-slow"></div>
              <div className="relative text-[56px] font-bold text-white leading-none tracking-tight text-neon-strong">
                {indicator.value}
                <span className="text-[40px] ml-1">%</span>
              </div>
            </div>
            
            {/* Label */}
            <div className="text-xs text-gray-300 uppercase leading-tight max-w-[180px] group-hover:text-white transition-colors duration-300">
              {indicator.type}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}