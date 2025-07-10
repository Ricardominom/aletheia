import React from 'react';
import { useState } from 'react';
import CampaignOverview from '../components/CampaignOverview';
import CampaignProgress from '../components/CampaignProgress';
import SecondaryIndicators from '../components/SecondaryIndicators';
import FinanceStatus from '../components/FinanceStatus';
import TacticalTracking from '../components/TacticalTracking';
import SocialListening from '../components/SocialListening';
import OperationProgress from '../components/OperationProgress';
import OperationMetrics from '../components/OperationMetrics';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('encuestas');

  const tabs = [
    { id: 'encuestas', label: 'Encuestas' },
    { id: 'adversarios', label: 'Adversarios' },
    { id: 'cochabamba', label: 'Cochabamba' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#4a5a64] from-15% via-[#121619] via-45% to-[#121619] relative">
      {/* Background overlay for additional depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/10 to-transparent opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-background/20 via-transparent to-transparent"></div>
      
      {/* Main content with padding to account for navbar */}
      <div className="pt-16 min-h-screen">
        <div className="container mx-auto p-4 lg:p-6 max-w-[1920px]">
          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="flex space-x-1 bg-card/50 p-1 rounded-lg backdrop-blur-sm border border-primary/20 max-w-md">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-primary/10 text-primary border border-primary/30'
                      : 'text-gray-400 hover:text-gray-300 hover:bg-primary/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* Tab Content */}
            {activeTab === 'encuestas' && (
              <>
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
              </>
            )}

            {activeTab === 'adversarios' && (
              <div className="glassmorphic-container p-8 h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-white mb-4">Adversarios</h2>
                  <p className="text-gray-400">Contenido de adversarios próximamente</p>
                </div>
              </div>
            )}

            {activeTab === 'cochabamba' && (
              <div className="glassmorphic-container p-8 h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-white mb-4">Cochabamba</h2>
                  <p className="text-gray-400">Contenido de Cochabamba próximamente</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}