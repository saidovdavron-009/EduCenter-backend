export class CreateRoomResponse {
  id: string;
  branchId: string;
  name: string;
  capacity: number;
  floor: number | null;
  isActive: boolean;
}