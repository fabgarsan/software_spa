export interface Room {
  id: number;
  roomType: number;
  company: number;
  number: number;
  status: string;
  isActive: boolean;
  lastStatusUpdate: string;
}

export interface RoomType {
  id: number;
  name: string;
  value: number;
}
