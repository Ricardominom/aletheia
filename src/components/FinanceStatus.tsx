import React, { useEffect, useState } from 'react';
import { useFinanceMetrics } from '../hooks/useFinance';
import { formatPercentage } from '../utils/data';

export default function FinanceStatus() {
  return (
    <div className="glassmorphic-container p-5 h-[480px] flex flex-col animate-scale-in">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-[#F88379]/5 rounded-xl -z-10"></div>
      <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-teal/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#F88379]/10 rounded-full blur-3xl"></div>
    </div>
  );
}