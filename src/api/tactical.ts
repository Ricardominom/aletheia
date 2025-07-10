import { ApiResponse } from '../types';

export interface TacticalData {
  date: string;
  candidate: string;
  percentage: number;
  trend: 'up' | 'down';
}

const MOCK_TACTICAL_DATA: TacticalData[] = [
  { date: '2025-03-22', candidate: 'CANDIDATO PROPIO', percentage: 47.0, trend: 'up' },
  { date: '2025-03-22', candidate: 'OPOSITOR 1', percentage: 9.0, trend: 'down' },
  { date: '2025-03-22', candidate: 'OPOSITOR 2', percentage: 7.0, trend: 'down' },
  { date: '2025-03-22', candidate: 'NO SABE/NO CONTESTÓ', percentage: 37.0, trend: 'up' },
  { date: '2025-04-12', candidate: 'CANDIDATO PROPIO', percentage: 48.0, trend: 'up' },
  { date: '2025-04-12', candidate: 'OPOSITOR 1', percentage: 8.5, trend: 'down' },
  { date: '2025-04-12', candidate: 'OPOSITOR 2', percentage: 6.5, trend: 'down' },
  { date: '2025-04-12', candidate: 'NO SABE/NO CONTESTÓ', percentage: 45.0, trend: 'up' },
];

export const getTacticalData = async (): Promise<ApiResponse<TacticalData[]>> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return {
    data: MOCK_TACTICAL_DATA,
    status: 200,
  };
};