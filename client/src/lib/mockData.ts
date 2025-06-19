// This file provides structure for charts and other dynamic content
// All data comes from the backend API, this is just for reference

export interface ChartData {
  month: string;
  value: number;
}

export const generateRevenueChartData = (salesData: any[]): ChartData[] => {
  // Transform sales data into chart format
  const monthNames = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];
  
  return monthNames.map((month, index) => ({
    month,
    value: Math.random() * 100000 + 50000 // This would be replaced with real data
  }));
};

export const statusColors = {
  pendente: 'text-warning',
  pago: 'text-success',
  cancelado: 'text-destructive',
  vencido: 'text-destructive',
  entrada: 'text-success',
  saida: 'text-destructive',
} as const;

export const statusLabels = {
  pendente: 'Pendente',
  pago: 'Pago',
  cancelado: 'Cancelado',
  vencido: 'Vencido',
  entrada: 'Entrada',
  saida: 'Saída',
} as const;
