export class GetAllRoomsResponse {
  data: { id: string; branchId: string; name: string; capacity: number; floor: number | null; isActive: boolean }[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}