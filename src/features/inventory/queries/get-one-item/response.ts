export class GetOneInventoryItemResponse {
  id: string;
  branchId: string;
  name: string;
  sku: string;
  price: number;
  stockQuantity: number;
  minStockLevel: number;
  isActive: boolean;
  logs?: any[];
}