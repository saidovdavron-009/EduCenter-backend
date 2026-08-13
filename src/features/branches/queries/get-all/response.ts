export class GetAllBranchesResponse {
  data: {
    id: string;
    name: string;
    address: string;
    phone: string;
    managerId: string;
    isActive: boolean;
    createdAt: Date;
  }[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}