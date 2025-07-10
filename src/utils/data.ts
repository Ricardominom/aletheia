export const generateRandomProgress = (): number => {
  return Number((Math.random() * (35 - 20) + 20).toFixed(2));
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('es-ES').format(num);
};

export const formatPercentage = (num: number): string => {
  return `${num.toFixed(2)}%`;
};