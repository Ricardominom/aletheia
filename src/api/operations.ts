import { OperationMetric, ApiResponse } from '../types';
import { generateRandomProgress } from '../utils/data';

const MOCK_OPERATION_METRICS: OperationMetric[] = [
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
];

export const getOperationMetrics = async (): Promise<ApiResponse<OperationMetric[]>> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return {
    data: MOCK_OPERATION_METRICS.map(metric => ({
      ...metric,
      progress: generateRandomProgress(),
    })),
    status: 200,
  };
};