import React, { useEffect, useState } from 'react';
import { useFinanceMetrics } from '../hooks/useFinance';
import { formatPercentage } from '../utils/data';

export default function FinanceStatus() {
  const [isVisible, setIsVisible] = useState(false);
  const { metrics, loading } = useFinanceMetrics();
  
  const circumference = 2 * Math.PI * 100;
  const exercisedDash = metrics ? (circumference * metrics.exercisedBudget) / 100 : 0;
  const delayDash = metrics ? (circumference * Math.abs(metrics.scheduleDelay)) / 100 : 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading || !metrics) {
    return (
      <div className="glassmorphic-container p-5 h-[480px] flex items-center justify-center animate-scale-in">
        <div className="text-gray-400">Cargando datos financieros...</div>
      </div>
    );
  }

  return (
    <div className="glassmorphic-container p-5 h-[480px] flex flex-col animate-scale-in">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-[#F88379]/5 rounded-xl -z-10"></div>
      <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-teal/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#F88379]/10 rounded-full blur-3xl"></div>
      
      <h2 className="text-lg font-semibold text-white mb-6 animate-slide-up text-neon relative z-10">
        Estado de las Finanzas
        <div className="absolute left-0 -bottom-2 h-0.5 w-16 bg-gradient-to-r from-accent-teal via-primary to-[#F88379] rounded-full"></div>
      </h2>
      
      {/* Main Gauge */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Background glow effects */}
        <div className="absolute inset-0 bg-radial-glow opacity-30"></div>
        
        <div className="relative w-[260px] h-[260px] animate-fade-in" style={{ opacity: isVisible ? 1 : 0 }}>
          {/* Pulse Ring Effect */}
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse-slow"></div>
          <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse-slow scale-110" style={{ animationDelay: '1s' }}></div>
          
          {/* Background Grid Pattern */}
          <div className="absolute inset-2 rounded-full opacity-10" style={{ 
            backgroundImage: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 1px, transparent 1px)', 
            backgroundSize: '15px 15px',
            opacity: 0.2
          }}></div>
          
          {/* Gauge Background with 3D Shadow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[240px] h-[240px] rounded-full bg-card/50 shadow-inner"></div>
          </div>
          
          {/* SVG Gauge */}
          <svg className="w-full h-full transform -rotate-90 absolute inset-0">
            <defs>
              <linearGradient id="exercisedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0891B2" />
                <stop offset="100%" stopColor="#14B8A6" />
              </linearGradient>
              <linearGradient id="delayGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F88379" />
                <stop offset="100%" stopColor="#F88379" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            <circle
              cx="130"
              cy="130"
              r="100"
              fill="none"
              stroke="rgba(30, 41, 59, 0.5)"
              strokeWidth="30"
              className="opacity-40"
            />
            
            {/* Progress Arc - Teal with glow effect */}
            <circle
              cx="130"
              cy="130"
              r="100"
              fill="none"
              stroke="url(#exercisedGradient)"
              strokeWidth="30"
              strokeDasharray={`${exercisedDash} ${circumference}`}
              className="animate-load-speedometer"
              style={{
                opacity: isVisible ? 1 : 0,
                '--final-dash': exercisedDash,
                filter: 'url(#glow)'
              } as React.CSSProperties}
            />
            
            {/* Delay Arc - New color with glow effect */}
            <circle
              cx="130"
              cy="130"
              r="100"
              fill="none"
              stroke="url(#delayGradient)"
              strokeWidth="30"
              strokeDasharray={`${delayDash} ${circumference}`}
              strokeDashoffset={`-${exercisedDash}`}
              className="animate-load-speedometer-delay"
              style={{
                opacity: isVisible ? 1 : 0,
                '--final-dash-delay': delayDash,
                filter: 'url(#glow)'
              } as React.CSSProperties}
            />
            
            {/* Tick marks for gauge */}
            {[...Array(10)].map((_, i) => {
              const angle = (i * 36) * (Math.PI / 180);
              const x1 = 130 + 85 * Math.cos(angle);
              const y1 = 130 + 85 * Math.sin(angle);
              const x2 = 130 + 100 * Math.cos(angle);
              const y2 = 130 + 100 * Math.sin(angle);
              
              return (
                <line 
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="2"
                  transform={`rotate(90, 130, 130)`}
                />
              );
            })}
          </svg>
          
          {/* Center Text with enhanced glassmorphic effect */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="relative bg-card/30 rounded-full h-36 w-36 flex items-center justify-center backdrop-blur-sm">
              {/* Inner glow */}
              <div className="absolute inset-4 bg-primary/20 rounded-full blur-2xl animate-pulse-slow"></div>
              
              <div className="relative flex flex-col items-center">
                <div className="text-[56px] font-bold text-white leading-none animate-scale-in text-neon-strong" style={{ animationDelay: '1s' }}>
                  {formatPercentage(metrics.exercisedBudget)}
                </div>
                <div className="text-sm text-gray-300 mt-1 animate-fade-in" style={{ animationDelay: '1.2s' }}>
                  PRESUPUESTO
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Indicators with improved card design */}
      <div className="grid grid-cols-2 gap-5 mt-6">
        <div className="target-card p-4 animate-slide-up" style={{ animationDelay: '1.4s' }}>
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-accent-teal rounded-t-lg"></div>
          
          {/* Center content with glow */}
          <div className="relative">
            <div className="absolute -inset-1 bg-accent-teal/10 blur-lg rounded-lg"></div>
            <div className="relative text-[32px] font-bold text-accent-teal leading-none animate-scale-in text-neon" style={{ animationDelay: '1.6s' }}>
              {formatPercentage(metrics.accruedBudget)}
            </div>
          </div>
          
          <div className="text-[11px] text-gray-300 uppercase mt-2 leading-tight">
            Del presupuesto<br />devengado
          </div>
          
          {/* Background grid pattern */}
          <div className="absolute inset-0 opacity-10 rounded-lg" style={{ 
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(65, 232, 221, 0.05) 25%, rgba(65, 232, 221, 0.05) 26%, transparent 27%, transparent 74%, rgba(65, 232, 221, 0.05) 75%, rgba(65, 232, 221, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(65, 232, 221, 0.05) 25%, rgba(65, 232, 221, 0.05) 26%, transparent 27%, transparent 74%, rgba(65, 232, 221, 0.05) 75%, rgba(65, 232, 221, 0.05) 76%, transparent 77%, transparent)',
            backgroundSize: '10px 10px',
            zIndex: -1
          }}></div>
        </div>
        
        <div className="target-card p-4 animate-slide-up" style={{ animationDelay: '1.6s' }}>
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#F88379] rounded-t-lg"></div>
          
          {/* Center content with glow */}
          <div className="relative">
            <div className="absolute -inset-1 bg-[#F88379]/10 blur-lg rounded-lg"></div>
            <div className="relative text-[32px] font-bold text-[#F88379] leading-none animate-scale-in text-neon" style={{ animationDelay: '1.8s' }}>
              {formatPercentage(metrics.scheduleDelay)}
            </div>
          </div>
          
          <div className="text-[11px] text-gray-300 uppercase mt-2 leading-tight">
            De atraso en<br />programación de pagos
          </div>
          
          {/* Background grid pattern */}
          <div className="absolute inset-0 opacity-10 rounded-lg" style={{ 
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(248, 131, 121, 0.05) 25%, rgba(248, 131, 121, 0.05) 26%, transparent 27%, transparent 74%, rgba(248, 131, 121, 0.05) 75%, rgba(248, 131, 121, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(248, 131, 121, 0.05) 25%, rgba(248, 131, 121, 0.05) 26%, transparent 27%, transparent 74%, rgba(248, 131, 121, 0.05) 75%, rgba(248, 131, 121, 0.05) 76%, transparent 77%, transparent)',
            backgroundSize: '10px 10px',
            zIndex: -1
          }}></div>
        </div>
      </div>
    </div>
  );
}