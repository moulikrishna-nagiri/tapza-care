export type DosePeriod = 'morning' | 'afternoon' | 'night';

export type MedicineSchedule = Record<DosePeriod, boolean>;

export type Medicine = {
  id: string;
  name: string;
  dosage: string;
  duration: string;
  instructions: string;
  schedule: MedicineSchedule;
};

export type Prescription = {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  patientName: string;
  date: string;
  diagnosis: string;
  medicines: Medicine[];
};
