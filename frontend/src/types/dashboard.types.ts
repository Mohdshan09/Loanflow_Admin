export interface RecentProductItem {
  id: string;
  name: string;
  minSalary: number;
  minCreditScore: number;
  createdAt: string;
}

export interface RecentEvaluationItem {
  id: string;
  fullName: string;
  creditScore: number;
  salary: number;
  status: 'ACTIVE' | 'REJECTED';
  updatedAt: string;
  eligibleProductsCount: number;
  productNames: string[];
}

export interface DashboardStatsData {
  totalProducts: number;
  totalUsers: number;
  activeUsers: number;
  rejectedUsers: number;
  passRate: number;
  rejectRate: number;
  recentProducts: RecentProductItem[];
  recentEvaluations: RecentEvaluationItem[];
}

export interface DashboardStatsResponse {
  success: boolean;
  data: DashboardStatsData;
}
