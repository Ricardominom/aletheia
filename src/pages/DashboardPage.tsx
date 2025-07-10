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
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/10 to-transparent opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-background/20 via-transparent to-transparent"></div>
      
      {/* Floating background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-teal/5 rounded-full blur-3xl animate-float-medium"></div>
      
      {/* Main content with padding to account for navbar */}
      <div className="pt-20 min-h-screen">
        <div className="container mx-auto p-8 max-w-[1920px]">
          <div className="space-y-10">
            {/* Tab Content */}
            {activeTab === 'encuestas' && (
              <>
                {/* Hero Section - Campaign Overview */}
                <div className="grid grid-cols-12 gap-8">
                  {/* Main Overview Card - Larger and more prominent */}
                  <div className="col-span-12 lg:col-span-4">
                    <div className="h-[320px]">
                      <CampaignOverview 
                        title="27.36%" 
                        subtitle="Cumplimiento General" 
                        profileImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      />
                    </div>
                  </div>
                  
                  {/* Secondary Indicators */}
                  <div className="col-span-12 lg:col-span-8">
                    <div className="h-[320px]">
                      <SecondaryIndicators />
                    </div>
                  </div>
                </div>

                {/* Campaign Progress Section */}
                <div className="grid grid-cols-12 gap-8">
                  <div className="col-span-12 lg:col-span-8">
                    <CampaignProgress />
                  </div>
                  <div className="col-span-12 lg:col-span-4">
                    <FinanceStatus />
                  </div>
                </div>
                
                {/* Analytics Section - Equal columns for better balance */}
                <div className="grid grid-cols-12 gap-8">
                  <div className="col-span-12 lg:col-span-6">
                    <TacticalTracking />
                  </div>
                  <div className="col-span-12 lg:col-span-6">
                    <SocialListening />
                  </div>
                </div>
                
                {/* Operations Section - Better proportions */}
                <div className="grid grid-cols-12 gap-8">
                  <div className="col-span-12 lg:col-span-5">
                    <div className="glassmorphic-container p-6 h-[450px] overflow-y-auto animate-scale-in">
                      <OperationProgress />
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-7">
                    <div className="glassmorphic-container p-6 h-[450px] overflow-y-auto animate-scale-in">
                      <OperationMetrics />
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'adversarios' && (
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12">
                  <div className="glassmorphic-container p-12 h-[500px] flex items-center justify-center">
                    <div className="text-center space-y-6">
                      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                          <div className="w-6 h-6 bg-primary rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-3 text-neon">Adversarios</h2>
                        <p className="text-xl text-gray-400 max-w-md mx-auto">
                          Análisis de competencia y estrategias de oposición próximamente
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <span>En desarrollo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cochabamba' && (
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12">
                  <AvisosTable />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}