import type { EmploymentType, SalaryType } from './products.types';

export type UserStatus = 'ACTIVE' | 'REJECTED';

export interface UserProductItem {
  userId: string;
  productId: string;
  product: {
    id: string;
    name: string;
  };
}

export interface User {
  id: string;
  fullName: string;
  dateOfBirth: string;
  creditScore: number;
  employmentType: EmploymentType;
  salaryType: SalaryType;
  salary: number;
  status: UserStatus;
  eligibleProducts?: UserProductItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserInput {
  fullName: string;
  dateOfBirth: string;
  creditScore: number;
  employmentType: EmploymentType;
  salaryType: SalaryType;
  salary: number;
}

export interface UsersResponse {
  success: boolean;
  data: User[];
}

export interface ProductEvaluationResult {
  product: { id: string; name: string };
  eligible: boolean;
  reasons: string[];
}

export interface UserResponse {
  success: boolean;
  data: {
    user: User;
    evaluation: {
      status: UserStatus;
      results: ProductEvaluationResult[];
    };
  };
}
