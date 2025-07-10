import { SocialMetrics, ApiResponse } from '../types';

const MOCK_SOCIAL_METRICS: SocialMetrics = {
  mentions: 40.0,
  impressions: 1.3,
  witnesses: [
    { username: '@usuario1', content: 'Gran evento hoy en la plaza principal.', timestamp: '2025-03-22T14:30:00Z' },
    { username: '@usuario2', content: 'Las propuestas presentadas hoy son muy interesantes.', timestamp: '2025-03-22T14:35:00Z' },
    { username: '@usuario3', content: 'Excelente participación en el debate de hoy.', timestamp: '2025-03-22T14:40:00Z' },
  ],
};

export const getSocialMetrics = async (): Promise<ApiResponse<SocialMetrics>> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return {
    data: MOCK_SOCIAL_METRICS,
    status: 200,
  };
};