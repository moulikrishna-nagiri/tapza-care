import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { getPrescriptions } from '@/services/mock/mockApi';
import type { DosePeriod, Prescription } from '@/types/prescription';

export type PrescriptionsState = {
  prescriptions: Prescription[];
  loading: boolean;
  error: string | null;
  selectedPrescriptionId: string | null;
  doseStatuses: Record<string, boolean>;
  doseLoading: Record<string, boolean>;
};

const initialState: PrescriptionsState = { prescriptions: [], loading: false, error: null, selectedPrescriptionId: null, doseStatuses: {}, doseLoading: {} };
const DOSE_STATUS_KEY = 'tapza-care/dose-statuses';

export const loadPrescriptions = createAsyncThunk<Prescription[]>('prescriptions/load', async () => getPrescriptions(), {
  condition: (_, { getState }) => !(getState() as { prescriptions: PrescriptionsState }).prescriptions.loading,
});

export const loadDoseStatuses = createAsyncThunk<Record<string, boolean>>('prescriptions/loadDoseStatuses', async () => {
  const value = await AsyncStorage.getItem(DOSE_STATUS_KEY);
  return value ? JSON.parse(value) as Record<string, boolean> : {};
});

export const markDoseTaken = createAsyncThunk<void, { prescriptionId: string; medicineId: string; period: DosePeriod; date: string }, { state: { prescriptions: PrescriptionsState } }>('prescriptions/markDoseTaken', async ({ prescriptionId, medicineId, period, date }, { dispatch, getState }) => {
  const key = getDoseKey(prescriptionId, medicineId, period, date);
  if (getState().prescriptions.doseStatuses[key]) return;
  dispatch(setDoseTaken(key));
  await AsyncStorage.setItem(DOSE_STATUS_KEY, JSON.stringify(getState().prescriptions.doseStatuses));
}, {
  condition: ({ prescriptionId, medicineId, period, date }, { getState }) => !getState().prescriptions.doseStatuses[getDoseKey(prescriptionId, medicineId, period, date)],
});

export function getDoseKey(prescriptionId: string, medicineId: string, period: DosePeriod, date: string) {
  return `${prescriptionId}_${medicineId}_${period}_${date}`;
}

const prescriptionsSlice = createSlice({
  name: 'prescriptions', initialState,
  reducers: {
    setSelectedPrescription(state, action: PayloadAction<string | null>) { state.selectedPrescriptionId = action.payload; },
    setDoseTaken(state, action: PayloadAction<string>) { state.doseStatuses[action.payload] = true; state.doseLoading[action.payload] = false; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPrescriptions.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loadPrescriptions.fulfilled, (state, action) => { state.loading = false; state.prescriptions = action.payload; })
      .addCase(loadPrescriptions.rejected, (state, action) => { state.loading = false; state.error = action.error.message ?? 'Unable to load prescriptions.'; })
      .addCase(loadDoseStatuses.fulfilled, (state, action) => { state.doseStatuses = action.payload; })
      .addCase(markDoseTaken.pending, (state, action) => { const { prescriptionId, medicineId, period, date } = action.meta.arg; state.doseLoading[getDoseKey(prescriptionId, medicineId, period, date)] = true; })
      .addCase(markDoseTaken.rejected, (state, action) => { const { prescriptionId, medicineId, period, date } = action.meta.arg; const key = getDoseKey(prescriptionId, medicineId, period, date); state.doseLoading[key] = false; state.doseStatuses[key] = false; });
  },
});

export const { setSelectedPrescription, setDoseTaken } = prescriptionsSlice.actions;
export default prescriptionsSlice.reducer;
