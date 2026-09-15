import type { Doctor } from './doctor';

export type Slot = {
  id: string;
  doctorId: string;
  startsAt: string;
  endsAt: string;
  available: boolean;
};

export type BookingStatus = 'pending' | 'confirmed';

export type Booking = {
  id: string;
  doctorId: string;
  slotId: string;
  status: BookingStatus;
  doctor?: Doctor;
  slot?: Slot;
  date: string;
};

export type BookingApiError = Error & { status?: number };
