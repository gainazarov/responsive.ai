import { create } from 'zustand';

export type DemoMode = 'no-responsive' | 'bad-responsive' | 'perfect-responsive';
export type DeviceType = 'desktop' | 'tablet' | 'mobile';
export type TimelineEra = '2010' | '2020' | '2026';

interface AppState {
  mode: DemoMode;
  device: DeviceType;
  era: TimelineEra;
  simulateUser: boolean;
  cinematicMode: boolean;
  showAnalytics: boolean;
  
  setMode: (mode: DemoMode) => void;
  setDevice: (device: DeviceType) => void;
  setEra: (era: TimelineEra) => void;
  toggleSimulateUser: () => void;
  toggleCinematicMode: () => void;
  toggleAnalytics: () => void;
}

export const useStore = create<AppState>((set) => ({
  mode: 'perfect-responsive',
  device: 'desktop',
  era: '2026',
  simulateUser: false,
  cinematicMode: false,
  showAnalytics: true,
  
  setMode: (mode) => set({ mode }),
  setDevice: (device) => set({ device }),
  setEra: (era) => set({ era }),
  toggleSimulateUser: () => set((state) => ({ simulateUser: !state.simulateUser })),
  toggleCinematicMode: () => set((state) => ({ cinematicMode: !state.cinematicMode })),
  toggleAnalytics: () => set((state) => ({ showAnalytics: !state.showAnalytics })),
}));
