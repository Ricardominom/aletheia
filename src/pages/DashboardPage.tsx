import React from 'react';
import CampaignOverview from '../components/CampaignOverview';
import BudgetTimeline from '../components/BudgetTimeline';
import CampaignProgress from '../components/CampaignProgress';
import SecondaryIndicators from '../components/SecondaryIndicators';
import FinanceStatus from '../components/FinanceStatus';
import TacticalTracking from '../components/TacticalTracking';
import SocialListening from '../components/SocialListening';
import OperationProgress from '../components/OperationProgress';
import OperationMetrics from '../components/OperationMetrics';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#4a5a64] from-15% via-[#121619] via-45% to-[#121619] relative">
      {/* Background overlay for additional depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/10 to-transparent opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-background/20 via-transparent to-transparent"></div>
      
      {/* Main content with padding to account for navbar */}
      <div className="pt-16 min-h-screen">
        <div className="container mx-auto p-4 lg:p-6 max-w-[1920px]">
          <div className="space-y-6">
            {/* Top Section */}
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-6 grid grid-cols-6 gap-6">
                {/* Left column - top section */}
                <div className="col-span-2">
                  <CampaignOverview 
                    title="27.36%" 
                    subtitle="Cumplimiento General" 
                    profileImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  />
                </div>
                <div className="col-span-4">
                  <BudgetTimeline title="Timeline: Planeado vs Ejercido" />
                </div>
                
                {/* Left column - bottom section */}
                <div className="col-span-6">
                  <CampaignProgress />
                </div>
              </div>
              
              {/* Right columns - full height */}
              <div className="col-span-12 lg:col-span-3">
                <SecondaryIndicators />
              </div>
              <div className="col-span-12 lg:col-span-3">
                <FinanceStatus />
              </div>
            </div>
            
            {/* Middle Section */}
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-6">
                <TacticalTracking />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <SocialListening />
              </div>
            </div>
            
            {/* Bottom Section */}
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-4">
                <div className="glassmorphic-container p-5 h-[400px] overflow-y-auto animate-scale-in">
                  <OperationProgress />
                </div>
              </div>
              <div className="col-span-12 lg:col-span-8">
                <div className="glassmorphic-container p-5 h-[400px] overflow-y-auto animate-scale-in">
                  <OperationMetrics />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}