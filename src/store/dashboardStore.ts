import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DashboardState {
  // Current user info
  currentUser: 'admin' | 'editor' | null;
  
  // Hydration state
  _hasHydrated: boolean;
  
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

  // Avisos Cochabamba
  avisosCochabamba: Array<{
    id: string;
    mensaje: string;
    fecha: string;
    hora: string;
    fechaCreacion: Date;
  }>;

  // Territorial data by region
  territorialData: Record<string, {
    defenders: Array<{
      id: string;
      name: string;
      phone: string;
      email: string;
      pollingStation?: string;
    }>;
    events: Array<{
      id: string;
      title: string;
      date: string;
      expectedAttendees: number;
      actualAttendees: number;
    }>;
    promotedCount: number;
    targetPromoters: number;
    segments: Array<{
      id: string;
      name: string;
    }>;
    targetDefenders: number;
    electionDate: string;
  }>;
  // Actions
  setCurrentUser: (user: 'admin' | 'editor' | null) => void;
  updateProfile: (data: Partial<DashboardState['profile']>) => void;
  updateTimeline: (data: DashboardState['timeline'][0]) => void;
  updateCampaignProgress: (data: DashboardState['campaignProgress'][0]) => void;
  updateIndicator: (data: DashboardState['indicators'][0]) => void;
  updateFinance: (data: Partial<DashboardState['finance']>) => void;
  updateTacticalData: (data: Omit<DashboardState['tacticalData'][0], 'trend'> & { trend?: 'up' | 'down' }) => void;
  updateSocialListening: (data: Partial<DashboardState['socialListening']>) => void;
  updateOperationProgress: (data: DashboardState['operationProgress'][0]) => void;
  updateOperationMetrics: (data: DashboardState['operationMetrics'][0]) => void;
  resetToDefaults: () => void;
  setHasHydrated: (state: boolean) => void;
  addAviso: (aviso: Omit<DashboardState['avisosCochabamba'][0], 'id' | 'fechaCreacion'>) => void;
  deleteAviso: (id: string) => void;
  
  // Territorial actions
  addDefender: (regionId: string, defender: Omit<DashboardState['territorialData'][string]['defenders'][0], 'id'>) => void;
  addEvent: (regionId: string, event: Omit<DashboardState['territorialData'][string]['events'][0], 'id'>) => void;
  updatePromotedCount: (regionId: string, count: number) => void;
  updateTargetPromoters: (regionId: string, target: number) => void;
  addSegment: (regionId: string, segment: Omit<DashboardState['territorialData'][string]['segments'][0], 'id'>) => void;
  updateElectionConfig: (regionId: string, config: { electionDate: string; targetDefenders: number }) => void;
  getTerritorialData: (regionId: string) => DashboardState['territorialData'][string];
}

// Default state factory
const createDefaultState = () => ({
  profile: {
    name: 'Manfred Reyes Villa',
    compliance: 0,
    imageUrl: 'https://raw.githubusercontent.com/Nefta11/MiPortafolioNefta/refs/heads/main/assets/Manfred%20Reyes%20Villa.jpg',
  },
  
  timeline: Array.from({ length: 24 }, (_, i) => ({
    week: `S${i + 1}`,
    planned: 0,
    executed: 0,
  })),
  
  campaignProgress: [
    { campaign: 'GENERAL', progress: 0, trend: 'up' as const },
    { campaign: 'TERRITORIO', progress: 0, trend: 'up' as const },
    { campaign: 'DIGITAL', progress: 0, trend: 'up' as const },
    { campaign: 'AIRE', progress: 0, trend: 'up' as const },
    { campaign: 'TELEFONÍA', progress: 0, trend: 'up' as const },
  ],
  
  indicators: [
    { type: 'DE LA CAMPAÑA TRANSCURRIDO', value: 0 },
    { type: 'CRECIMIENTO PROMEDIO', value: 0 },
    { type: 'OBJETIVOS DE LA CAMPAÑA', value: 0 },
    { type: 'AVANCE GENERAL', value: 0 },
  ],
  
  finance: {
    exercisedBudget: 0,
    accruedBudget: 0,
    scheduleDelay: 0,
  },
  
  tacticalData: [],
  
  socialListening: {
    mentions: 0,
    impressions: 0,
    witnesses: [],
  },
  
  operationProgress: Array.from({ length: 12 }, (_, i) => ({
    campaign: i + 1,
    progress: 0,
    delay: 0,
  })),
  
  operationMetrics: [
    {
      area: 'DIGITAL',
      progress: 0,
      content: { current: 0, target: 0 },
      impressions: { current: 0, target: 0 },
    },
    {
      area: 'TELEFONÍA',
      progress: 0,
      content: { current: 0, target: 0 },
      impressions: { current: 0, target: 0 },
    },
    {
      area: 'AIRE',
      progress: 0,
      content: { current: 0, target: 0 },
      impressions: { current: 0, target: 0 },
    },
    {
      area: 'TERRITORIO',
      progress: 0,
      content: { current: 0, target: 0 },
      impressions: { current: 0, target: 0 },
    },
  ],
  
  avisosCochabamba: [],
  
  territorialData: {},
});

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentUser: null,
      _hasHydrated: true, // Start as true to prevent layout shifts
      ...createDefaultState(),

      // Actions
      setCurrentUser: (user) => {
        set({ currentUser: user });
        // If switching users, ensure we have clean state
        if (user && get().currentUser !== user) {
          // For admin, always show the current saved state
          // For editor, they can modify the state
          // No need to reset, just track the current user
        }
      },

      setHasHydrated: (state) => {
        set({
          _hasHydrated: state
        });
      },

      resetToDefaults: () => {
        const defaults = createDefaultState();
        set(defaults);
      },
      
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
      
      addAviso: (avisoData) =>
        set((state) => ({
          avisosCochabamba: [
            {
              ...avisoData,
              id: Date.now().toString(),
              fechaCreacion: new Date()
            },
            ...state.avisosCochabamba
          ]
        })),
      
      deleteAviso: (id) =>
        set((state) => ({
          avisosCochabamba: state.avisosCochabamba.filter(aviso => aviso.id !== id)
        })),
      
      // Territorial actions
      addDefender: (regionId, defenderData) =>
        set((state) => {
          const regionData = state.territorialData[regionId] || {
            defenders: [],
            events: [],
            promotedCount: 0,
            targetPromoters: 500,
            segments: [],
            targetDefenders: 1000,
            electionDate: '2025-05-01'
          };
          
          return {
            territorialData: {
              ...state.territorialData,
              [regionId]: {
                ...regionData,
                defenders: [
                  ...regionData.defenders,
                  { ...defenderData, id: Date.now().toString() }
                ]
              }
            }
          };
        }),
      
      addEvent: (regionId, eventData) =>
        set((state) => {
          const regionData = state.territorialData[regionId] || {
            defenders: [],
            events: [],
            promotedCount: 0,
            targetPromoters: 500,
            segments: [],
            targetDefenders: 1000,
            electionDate: '2025-05-01'
          };
          
          return {
            territorialData: {
              ...state.territorialData,
              [regionId]: {
                ...regionData,
                events: [
                  ...regionData.events,
                  { ...eventData, id: Date.now().toString() }
                ]
              }
            }
          };
        }),
      
      updatePromotedCount: (regionId, count) =>
        set((state) => {
          const regionData = state.territorialData[regionId] || {
            defenders: [],
            events: [],
            promotedCount: 0,
            targetPromoters: 500,
            segments: [],
            targetDefenders: 1000,
            electionDate: '2025-05-01'
          };
          
          return {
            territorialData: {
              ...state.territorialData,
              [regionId]: {
                ...regionData,
                promotedCount: count
              }
            }
          };
        }),
      
      updateTargetPromoters: (regionId, target) =>
        set((state) => {
          const regionData = state.territorialData[regionId] || {
            defenders: [],
            events: [],
            promotedCount: 0,
            targetPromoters: 500,
            segments: [],
            targetDefenders: 1000,
            electionDate: '2025-05-01'
          };
          
          return {
            territorialData: {
              ...state.territorialData,
              [regionId]: {
                ...regionData,
                targetPromoters: target
              }
            }
          };
        }),
      
      addSegment: (regionId, segmentData) =>
        set((state) => {
          const regionData = state.territorialData[regionId] || {
            defenders: [],
            events: [],
            promotedCount: 0,
            targetPromoters: 500,
            segments: [],
            targetDefenders: 1000,
            electionDate: '2025-05-01'
          };
          
          return {
            territorialData: {
              ...state.territorialData,
              [regionId]: {
                ...regionData,
                segments: [
                  ...regionData.segments,
                  { ...segmentData, id: Date.now().toString() }
                ]
              }
            }
          };
        }),
      
      updateElectionConfig: (regionId, config) =>
        set((state) => {
          const regionData = state.territorialData[regionId] || {
            defenders: [],
            events: [],
            promotedCount: 0,
            targetPromoters: 500,
            segments: [],
            targetDefenders: 1000,
            electionDate: '2025-05-01'
          };
          
          return {
            territorialData: {
              ...state.territorialData,
              [regionId]: {
                ...regionData,
                ...config
              }
            }
          };
        }),
      
      getTerritorialData: (regionId) => {
        const state = get();
        return state.territorialData[regionId] || {
          defenders: [],
          events: [],
          promotedCount: 0,
          targetPromoters: 500,
          segments: [],
          targetDefenders: 1000,
          electionDate: '2025-05-01'
        };
      },
    }),
    {
      name: 'dashboard-storage',
      // Persist all state including user-specific data
      partialize: (state) => ({
        currentUser: state.currentUser,
        profile: state.profile,
        timeline: state.timeline,
        campaignProgress: state.campaignProgress,
        indicators: state.indicators,
        finance: state.finance,
        tacticalData: state.tacticalData,
        socialListening: state.socialListening,
        operationProgress: state.operationProgress,
        operationMetrics: state.operationMetrics,
        avisosCochabamba: state.avisosCochabamba,
        territorialData: state.territorialData,
      }),
      onRehydrateStorage: () => (state) => {
        // Ensure hydration is marked as complete
        if (state) {
          // Convert fechaCreacion strings back to Date objects
          if (state.avisosCochabamba) {
            state.avisosCochabamba = state.avisosCochabamba.map(aviso => ({
              ...aviso,
              fechaCreacion: new Date(aviso.fechaCreacion)
            }));
          }
          state.setHasHydrated(true);
        }
      },
    }
  )
);