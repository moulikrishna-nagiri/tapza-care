import { delay } from '@/utils/delay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AppConfigVariant, LayoutConfig } from '@/types/config';
import type { Booking, Slot } from '@/types/booking';
import type { Doctor } from '@/types/doctor';
import type { Prescription } from '@/types/prescription';

import { festivalConfig } from './config.festival';
import { normalConfig } from './config.normal';

const configs: Record<AppConfigVariant, LayoutConfig> = {
  normal: normalConfig,
  festival: festivalConfig,
};

export type MockNetworkMode = 'normal' | 'slow' | 'failed';

export type MockSettings = {
  networkMode: MockNetworkMode;
  emptyDoctors: boolean;
  emptySlots: boolean;
  emptyPrescriptions: boolean;
  bookingConflict: boolean;
};

const DEFAULT_MOCK_SETTINGS: MockSettings = {
  networkMode: 'normal',
  emptyDoctors: false,
  emptySlots: false,
  emptyPrescriptions: false,
  bookingConflict: false,
};

const MOCK_SETTINGS_KEY = 'tapza-care/mock-settings';

export const mockSettings: MockSettings = {
  networkMode: 'normal' as MockNetworkMode,
  emptyDoctors: false,
  emptySlots: false,
  emptyPrescriptions: false,
  bookingConflict: false,
};

let mockSettingsReady: Promise<void> | null = null;

let shouldFailBooking = false;
let prescriptionsResponse: Prescription[] | null = null;
const bookedSlotIds = new Set<string>();

const doctors: Doctor[] = [
  { id: 'doctor-1', name: 'Dr. Tola Adebayo', specialty: 'Family medicine', photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80', feeInr: 599, languages: ['English', 'Yoruba'], availability: 'available', nextAvailableAt: 'Today, 4:30 PM' },
  { id: 'doctor-2', name: 'Dr. Chidi Okafor', specialty: 'General practice', photoUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=500&q=80', feeInr: 499, languages: ['English', 'Igbo'], availability: 'available', nextAvailableAt: 'Today, 6:00 PM' },
  { id: 'doctor-3', name: 'Dr. Maya Sharma', specialty: 'Cardiology', photoUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=500&q=80', feeInr: 799, languages: ['English', 'Hindi'], availability: 'available', nextAvailableAt: 'Tomorrow, 10:00 AM' },
];

export function setMockApiFailure(value: boolean) {
  mockSettings.networkMode = value ? 'failed' : 'normal';
  persistMockSettings();
}

export function setMockNetworkMode(mode: MockNetworkMode) {
  mockSettings.networkMode = mode;
  persistMockSettings();
}

export function setMockEmptyResponses(values: Partial<Pick<typeof mockSettings, 'emptyDoctors' | 'emptySlots' | 'emptyPrescriptions'>>) {
  Object.assign(mockSettings, values);
  persistMockSettings();
}

export function setMockBookingConflict(value: boolean) {
  mockSettings.bookingConflict = value;
  persistMockSettings();
}

export function resetMockSettings() {
  Object.assign(mockSettings, DEFAULT_MOCK_SETTINGS);
  persistMockSettings();
}

export function loadMockSettings(): Promise<void> {
  if (!mockSettingsReady) {
    mockSettingsReady = AsyncStorage.getItem(MOCK_SETTINGS_KEY).then((value) => {
      if (!value) return;
      try {
        const parsed: unknown = JSON.parse(value);
        if (!isMockSettings(parsed)) return;
        Object.assign(mockSettings, parsed);
      } catch {
        Object.assign(mockSettings, DEFAULT_MOCK_SETTINGS);
      }
    });
  }
  return mockSettingsReady;
}

export function setMockBookingFailure(value: boolean) {
  shouldFailBooking = value;
}

export function setMockPrescriptions(value: Prescription[] | null) {
  prescriptionsResponse = value;
}

async function mockDelay(milliseconds: number) {
  await loadMockSettings();
  await delay(mockSettings.networkMode === 'slow' ? milliseconds * 3 : milliseconds);
}

function persistMockSettings() {
  void AsyncStorage.setItem(MOCK_SETTINGS_KEY, JSON.stringify(mockSettings));
}

function isMockSettings(value: unknown): value is MockSettings {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<MockSettings>;
  return (candidate.networkMode === 'normal' || candidate.networkMode === 'slow' || candidate.networkMode === 'failed')
    && typeof candidate.emptyDoctors === 'boolean'
    && typeof candidate.emptySlots === 'boolean'
    && typeof candidate.emptyPrescriptions === 'boolean'
    && typeof candidate.bookingConflict === 'boolean';
}

function shouldFailRequest() {
  return mockSettings.networkMode === 'failed';
}

export async function fetchAppConfig(variant: AppConfigVariant = 'normal'): Promise<LayoutConfig> {
  await mockDelay(650);
  if (shouldFailRequest()) throw new Error('The configuration service is unavailable.');
  return configs[variant];
}

export async function getDoctors(): Promise<Doctor[]> {
  await mockDelay(500);
  if (shouldFailRequest()) throw new Error('The doctor service is unavailable.');
  if (mockSettings.emptyDoctors) return [];
  return doctors;
}

export async function getSlots(doctorId: string, date: string): Promise<Slot[]> {
  await mockDelay(450);
  if (shouldFailRequest()) throw new Error('The availability service is unavailable.');
  if (mockSettings.emptySlots) return [];
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
  await mockDelay(700);
  if (shouldFailBooking || shouldFailRequest()) throw new Error('We could not complete your booking.');
  if (mockSettings.bookingConflict || bookedSlotIds.has(slotId)) {
    const error = new Error('This slot is no longer available.') as Error & { status: number };
    error.status = 409;
    throw error;
  }
  bookedSlotIds.add(slotId);
  return { id: `booking-${Date.now()}`, doctorId, slotId, status: 'confirmed', date: slotId.match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? '' };
}

export async function getPrescriptions(): Promise<Prescription[]> {
  await mockDelay(550);
  if (shouldFailRequest()) throw new Error('The prescription service is unavailable.');
  if (mockSettings.emptyPrescriptions) return [];
  if (prescriptionsResponse) return prescriptionsResponse;
  return [
    {
      id: 'prescription-1', doctorName: 'Dr. Priya Sharma', doctorSpecialty: 'General Physician', patientName: 'Patient', date: '2026-09-15', diagnosis: 'Common Cold',
      medicines: [
        { id: 'medicine-1', name: 'Paracetamol', dosage: '500 mg', duration: '5 days', instructions: 'After food', schedule: { morning: true, afternoon: false, night: true } },
        { id: 'medicine-2', name: 'Cetirizine', dosage: '10 mg', duration: '5 days', instructions: 'Take before sleep', schedule: { morning: false, afternoon: false, night: true } },
      ],
    },
    {
      id: 'prescription-2', doctorName: 'Dr. Arjun Rao', doctorSpecialty: 'Cardiology', patientName: 'Patient', date: '2026-09-12', diagnosis: 'Blood pressure management',
      medicines: [
        { id: 'medicine-3', name: 'Amlodipine', dosage: '5 mg', duration: '30 days', instructions: 'Take with water', schedule: { morning: true, afternoon: false, night: false } },
        { id: 'medicine-4', name: 'Atorvastatin', dosage: '10 mg', duration: '30 days', instructions: 'After dinner', schedule: { morning: false, afternoon: false, night: true } },
      ],
    },
  ];
}
