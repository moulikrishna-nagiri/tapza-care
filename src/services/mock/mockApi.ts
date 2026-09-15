import { delay } from '@/utils/delay';
import type { AppConfigVariant, LayoutConfig } from '@/types/config';
import type { Booking, Slot } from '@/types/booking';
import type { Doctor } from '@/types/doctor';

import { festivalConfig } from './config.festival';
import { normalConfig } from './config.normal';

const configs: Record<AppConfigVariant, LayoutConfig> = {
  normal: normalConfig,
  festival: festivalConfig,
};

let shouldFail = false;
let shouldFailBooking = false;
const bookedSlotIds = new Set<string>();

const doctors: Doctor[] = [
  { id: 'doctor-1', name: 'Dr. Tola Adebayo', specialty: 'Family medicine', photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80', feeInr: 599, languages: ['English', 'Yoruba'], availability: 'available', nextAvailableAt: 'Today, 4:30 PM' },
  { id: 'doctor-2', name: 'Dr. Chidi Okafor', specialty: 'General practice', photoUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=500&q=80', feeInr: 499, languages: ['English', 'Igbo'], availability: 'available', nextAvailableAt: 'Today, 6:00 PM' },
  { id: 'doctor-3', name: 'Dr. Maya Sharma', specialty: 'Cardiology', photoUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=500&q=80', feeInr: 799, languages: ['English', 'Hindi'], availability: 'available', nextAvailableAt: 'Tomorrow, 10:00 AM' },
];

export function setMockApiFailure(value: boolean) {
  shouldFail = value;
}

export function setMockBookingFailure(value: boolean) {
  shouldFailBooking = value;
}

export async function fetchAppConfig(variant: AppConfigVariant = 'normal'): Promise<LayoutConfig> {
  await delay(650);
  if (shouldFail) throw new Error('The configuration service is unavailable.');
  return configs[variant];
}

export async function getDoctors(): Promise<Doctor[]> {
  await delay(500);
  if (shouldFail) throw new Error('The doctor service is unavailable.');
  return doctors;
}

export async function getSlots(doctorId: string, date: string): Promise<Slot[]> {
  await delay(450);
  if (shouldFail) throw new Error('The availability service is unavailable.');
  const times = ['10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '18:30', '19:00'];
  return times.map((time, index) => {
    const startsAt = `${date}T${time}:00`;
    const endDate = new Date(`${startsAt}Z`);
    endDate.setMinutes(endDate.getMinutes() + 30);
    const endsAt = `${date}T${endDate.toISOString().slice(11, 19)}`;
    const id = `${doctorId}-${date}-${time.replace(':', '')}`;
    return { id, doctorId, startsAt, endsAt, available: !bookedSlotIds.has(id) && index !== 3 };
  });
}

export async function createBooking(doctorId: string, slotId: string): Promise<Booking> {
  await delay(700);
  if (shouldFailBooking) throw new Error('We could not complete your booking.');
  if (bookedSlotIds.has(slotId) || slotId.endsWith('1100')) {
    const error = new Error('This slot is no longer available.') as Error & { status: number };
    error.status = 409;
    throw error;
  }
  bookedSlotIds.add(slotId);
  return { id: `booking-${Date.now()}`, doctorId, slotId, status: 'confirmed', date: slotId.match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? '' };
}
