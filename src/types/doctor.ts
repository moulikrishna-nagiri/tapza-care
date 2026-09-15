export type DoctorAvailability = 'available' | 'busy' | 'offline';

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  photoUrl: string;
  feeInr: number;
  languages: string[];
  availability: DoctorAvailability;
  nextAvailableAt?: string;
};
