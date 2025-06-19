import { useQuery } from "@tanstack/react-query";
import type { DashboardMetrics } from "@shared/schema";

export function useDashboardMetrics() {
  return useQuery<DashboardMetrics>({
    queryKey: ["/api/dashboard/metrics"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });
}
