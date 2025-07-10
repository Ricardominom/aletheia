import { create } from 'zustand';

interface DashboardState {
  // Profile
  profile: {
    name: string;
    compliance: number;
    imageUrl: string;
  };
  
  // Timeline
  timeline: Array<{
    week: string;
    planned: number;
    executed: number;
  }>;
  
  // Campaign Progress
  campaignProgress: Array<{
    campaign: string;
    progress: number;
    trend: 'up' | 'down';
  }>;
  
  // Secondary Indicators
  indicators: Array<{
    type: string;
    value: number;
  }>;
  
  // Finance Status
  finance: {
    exercisedBudget: number;
    accruedBudget: number;
    scheduleDelay: number;
  };
  
  // Tactical Tracking
  tacticalData: Array<{
    date: string;
    candidate: string;
    percentage: number;
    trend: 'up' | 'down';
  }>;
  
  // Social Listening
  socialListening: {
    mentions: number;
    impressions: number;
    witnesses: Array<{
      username: string;
      content: string;
    }>;
  };
  
  // Operation Progress
  operationProgress: Array<{
    campaign: number;
    progress: number;
    delay: number;
  }>;
  
  // Operation Metrics
  operationMetrics: Array<{
    area: string;
    progress: number;
    content: {
      current: number;
      target: number;
    };
    impressions: {
      current: number;
      target: number;
    };
  }>;

  // Actions
  updateProfile: (data: Partial<DashboardState['profile']>) => void;
  updateTimeline: (data: DashboardState['timeline'][0]) => void;
  updateCampaignProgress: (data: DashboardState['campaignProgress'][0]) => void;
  updateIndicator: (data: DashboardState['indicators'][0]) => void;
  updateFinance: (data: Partial<DashboardState['finance']>) => void;
  updateTacticalData: (data: Omit<DashboardState['tacticalData'][0], 'trend'> & { trend?: 'up' | 'down' }) => void;
  updateSocialListening: (data: Partial<DashboardState['socialListening']>) => void;
  updateOperationProgress: (data: DashboardState['operationProgress'][0]) => void;
  updateOperationMetrics: (data: DashboardState['operationMetrics'][0]) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  // Initial state
  profile: {
    name: 'Manfred Reyes Villa',
    compliance: 27.36,
    imageUrl: 'https://raw.githubusercontent.com/Nefta11/MiPortafolioNefta/refs/heads/main/assets/Manfred%20Reyes%20Villa.jpg',
  },
  
  timeline: Array.from({ length: 24 }, (_, i) => ({
    week: `S${i + 1}`,
    planned: 100 + (i * 10),
    executed: 90 + (i * 9),
  })),
  
  campaignProgress: [
    { campaign: 'GENERAL', progress: 27.36, trend: 'up' as const },
    { campaign: 'TERRITORIO', progress: 25.2, trend: 'down' as const },
    { campaign: 'DIGITAL', progress: 26.8, trend: 'up' as const },
    { campaign: 'AIRE', progress: 30.1, trend: 'up' as const },
    { campaign: 'TELEFONÍA', progress: 27.3, trend: 'down' as const },
  ],
  
  indicators: [
    { type: 'DE LA CAMPAÑA TRANSCURRIDO', value: 55.4 },
    { type: 'CRECIMIENTO PROMEDIO', value: 5.4 },
    { type: 'OBJETIVOS DE LA CAMPAÑA', value: 61.1 },
    { type: 'AVANCE GENERAL', value: 41.4 },
  ],
  
  finance: {
    exercisedBudget: 55.4,
    accruedBudget: 55.4,
    scheduleDelay: -5.2,
  },
  
  tacticalData: [
    { date: '2025-03-22', candidate: 'CANDIDATO PROPIO', percentage: 47.0, trend: 'up' },
    { date: '2025-03-22', candidate: 'OPOSITOR 1', percentage: 9.0, trend: 'down' },
    { date: '2025-03-22', candidate: 'OPOSITOR 2', percentage: 7.0, trend: 'down' },
    { date: '2025-03-22', candidate: 'NO SABE/NO CONTESTÓ', percentage: 37.0, trend: 'up' },
    { date: '2025-04-12', candidate: 'CANDIDATO PROPIO', percentage: 48.0, trend: 'up' },
    { date: '2025-04-12', candidate: 'OPOSITOR 1', percentage: 8.5, trend: 'down' },
    { date: '2025-04-12', candidate: 'OPOSITOR 2', percentage: 6.5, trend: 'down' },
    { date: '2025-04-12', candidate: 'NO SABE/NO CONTESTÓ', percentage: 45.0, trend: 'up' },
  ],
  
  socialListening: {
    mentions: 40.0,
    impressions: 1.3,
    witnesses: [
      { username: '@usuario1', content: 'Gran evento hoy en la plaza principal.' },
      { username: '@usuario2', content: 'Las propuestas presentadas hoy son muy interesantes.' },
      { username: '@usuario3', content: 'Excelente participación en el debate de hoy.' },
    ],
  },
  
  operationProgress: Array.from({ length: 12 }, (_, i) => ({
    campaign: i + 1,
    progress: Math.floor(Math.random() * 60) + 20,
    delay: Math.floor(Math.random() * 30),
  })),
  
  operationMetrics: [
    {
      area: 'DIGITAL',
      progress: 31.5,
      content: { current: 20, target: 30 },
      impressions: { current: 1000000, target: 1000000 },
    },
    {
      area: 'TELEFONÍA',
      progress: 31.5,
      content: { current: 20, target: 30 },
      impressions: { current: 1000000, target: 1000000 },
    },
    {
      area: 'AIRE',
      progress: 31.5,
      content: { current: 20, target: 30 },
      impressions: { current: 1000000, target: 1000000 },
    },
    {
      area: 'TERRITORIO',
      progress: 31.5,
      content: { current: 20, target: 30 },
      impressions: { current: 1000000, target: 1000000 },
    },
  ],

  // Actions
  updateProfile: (data) => 
    set((state) => ({ profile: { ...state.profile, ...data } })),
  
  updateTimeline: (data) =>
    set((state) => ({
      timeline: state.timeline.map(item =>
        item.week === data.week ? { ...item, ...data } : item
      ),
    })),
  
  updateCampaignProgress: (data) =>
    set((state) => ({
      campaignProgress: state.campaignProgress.map(item =>
        item.campaign === data.campaign ? { ...item, ...data } : item
      ),
    })),
  
  updateIndicator: (data) =>
    set((state) => ({
      indicators: state.indicators.map(item =>
        item.type === data.type ? { ...item, ...data } : item
      ),
    })),
  
  updateFinance: (data) =>
    set((state) => ({ finance: { ...state.finance, ...data } })),
  
  updateTacticalData: (data) =>
    set((state) => ({
      tacticalData: state.tacticalData.map(item =>
        item.candidate === data.candidate && item.date === data.date
          ? { ...item, ...data, trend: data.trend || item.trend }
          : item
      ),
    })),
  
  updateSocialListening: (data) =>
    set((state) => ({ socialListening: { ...state.socialListening, ...data } })),
  
  updateOperationProgress: (data) =>
    set((state) => ({
      operationProgress: state.operationProgress.map(item =>
        item.campaign === data.campaign ? { ...item, ...data } : item
      ),
    })),
  
  updateOperationMetrics: (data) =>
    set((state) => ({
      operationMetrics: state.operationMetrics.map(item =>
        item.area === data.area ? { ...item, ...data } : item
      ),
    })),
}));