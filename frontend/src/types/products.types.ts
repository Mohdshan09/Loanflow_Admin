export type EmploymentType = 'SALARIED' | 'SELF_EMPLOYED';

export type SalaryType = 'DAT' | 'CASH' | 'CHEQUE';

export interface Product {
  id: string;
  name: string;
  minAge: number;
  maxAge: number;
  minCreditScore: number;
  allowedEmploymentTypes: EmploymentType[];
  allowedSalaryTypes: SalaryType[];
  minSalary: number;
  createdAt: string;
  updatedAt: string;
}

export type CreateProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

export interface ProductsResponse {
  success: boolean;
  data: Product[];
}

export interface ProductResponse {
  success: boolean;
  data: Product;
}
