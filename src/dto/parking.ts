export interface ParkingPlan {
  id: number;
  uniqueInvoiceNumber: number;
  name: string;
  vehicleType: string;
  taxGroup: string;
  timeFrom: Date;
  timeTo: Date;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export interface VehicleType {
  id: number;
  name: string;
}

export interface ParkingRate {
  id: number;
  parking_plan: number;
  minutes: number;
  value: number;
}

export interface ParkingService {
  id: number;
  parkingPlan: number;
  payment: number;
  initialTime: string;
  paymentTime: string;
  finalTime: string;
}
