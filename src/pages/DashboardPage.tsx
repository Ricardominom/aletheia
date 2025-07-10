import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDashboardStore } from '../store/dashboardStore';
import CampaignOverview from '../components/CampaignOverview';
import CampaignProgress from '../components/CampaignProgress';
import SecondaryIndicators from '../components/SecondaryIndicators';
import FinanceStatus from '../components/FinanceStatus';
import TacticalTracking from '../components/TacticalTracking';
import SocialListening from '../components/SocialListening';
import OperationProgress from '../components/OperationProgress';
import OperationMetrics from '../components/OperationMetrics';
import AvisosTable from '../components/cochabamba/AvisosTable';

export default function DashboardPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('encuestas');
  const { setCurrentUser, _hasHydrated } = useDashboardStore(state => ({
    setCurrentUser: state.setCurrentUser,
    _hasHydrated: state._hasHydrated
  }));

  // Update active tab based on URL parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get('tab');
    if (tab && ['encuestas', 'adversarios', 'cochabamba'].includes(tab)) {
      setActiveTab(tab);
    } else {
      setActiveTab('encuestas');
    }
  }, [location.search]);

  // Set current user when component mounts
  useEffect(() => {
    setCurrentUser('admin');
  }, [setCurrentUser]);

  // Show loading state until hydrated
  if (!_hasHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-bl from-[#4a5a64] from-15% via-[#121619] via-45% to-[#121619] relative">
        <div className="absolute inset-0 bg-gradient-to-br from-background/10 to-transparent opacity-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-background/20 via-transparent to-transparent"></div>
        
        <div className="pt-20 min-h-screen flex items-center justify-center">
          <div className="glassmorphic-container p-8 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400">Cargando dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#4a5a64] from-15% via-[#121619] via-45% to-[#121619] relative">
      {/* Background overlay for additional depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/10 to-transparent opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-background/20 via-transparent to-transparent"></div>
      
      {/* Main content with padding to account for navbar */}
      <div className="pt-20 min-h-screen">
        <div className="container mx-auto p-6 max-w-[1920px]">
          <div className="space-y-8">
            {/* Tab Content */}
            {activeTab === 'encuestas' && (
              <>
                {/* Top Section - Reorganized for better balance */}
                <div className="grid grid-cols-12 gap-6">
                  {/* Left side - Profile and Progress */}
                  <div className="col-span-12 lg:col-span-8">
                    <div className="grid grid-cols-12 gap-6 h-full">
                      {/* Profile Overview */}
                      <div className="col-span-12 md:col-span-3">
                        <CampaignOverview 
                          title="27.36%" 
                          subtitle="Cumplimiento General" 
                          profileImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        />
                      </div>
                      
                      {/* Campaign Progress */}
                      <div className="col-span-12 md:col-span-9">
                        <CampaignProgress />
                      </div>
                    </div>
                  </div>
                  
                  {/* Right side - Indicators and Finance */}
                  <div className="col-span-12 lg:col-span-4">
                    <div className="grid grid-cols-1 gap-6 h-full">
                      <SecondaryIndicators />
                      <FinanceStatus />
                    </div>
                  </div>
                </div>
                
                {/* Middle Section - Analytics */}
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-12 lg:col-span-6">
                    <TacticalTracking />
                  </div>
                  <div className="col-span-12 lg:col-span-6">
                    <SocialListening />
                  </div>
                </div>
                
                {/* Bottom Section - Operations */}
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
              <AvisosTable />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}