import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";

import { getPrescriptions } from "@/services/mock/mockApi";
import type { DosePeriod, Prescription } from "@/types/prescription";

export type PrescriptionsState = {
  prescriptions: Prescription[];
  loading: boolean;
  error: string | null;
  selectedPrescriptionId: string | null;
  doseStatuses: Record<string, boolean>;
  doseLoading: Record<string, boolean>;
};

const initialState: PrescriptionsState = {
  prescriptions: [],
  loading: false,
  error: null,
  selectedPrescriptionId: null,
  doseStatuses: {},
  doseLoading: {},
};
const DOSE_STATUS_KEY = "tapza-care/dose-statuses";

export const loadPrescriptions = createAsyncThunk<Prescription[]>(
  "prescriptions/load",
  async () => normalizePrescriptions(await getPrescriptions()),
  {
    condition: (_, { getState }) =>
      !(getState() as { prescriptions: PrescriptionsState }).prescriptions
        .loading,
  },
);

export const loadDoseStatuses = createAsyncThunk<Record<string, boolean>>(
  "prescriptions/loadDoseStatuses",
  async () => {
    const value = await AsyncStorage.getItem(DOSE_STATUS_KEY);
    if (!value) return {};
    try {
      const parsed: unknown = JSON.parse(value);
      return isRecord(parsed)
        ? (Object.fromEntries(
            Object.entries(parsed).filter(
              ([, status]) => typeof status === "boolean",
            ),
          ) as Record<string, boolean>)
        : {};
    } catch {
      return {};
    }
  },
);

export const markDoseTaken = createAsyncThunk<
  void,
  {
    prescriptionId: string;
    medicineId: string;
    period: DosePeriod;
    date: string;
  },
  { state: { prescriptions: PrescriptionsState } }
>(
  "prescriptions/markDoseTaken",
  async (
    { prescriptionId, medicineId, period, date },
    { dispatch, getState },
  ) => {
    const key = getDoseKey(prescriptionId, medicineId, period, date);
    if (getState().prescriptions.doseStatuses[key]) return;
    dispatch(setDoseTaken(key));
    await AsyncStorage.setItem(
      DOSE_STATUS_KEY,
      JSON.stringify(getState().prescriptions.doseStatuses),
    );
  },
  {
    condition: ({ prescriptionId, medicineId, period, date }, { getState }) =>
      !getState().prescriptions.doseStatuses[
        getDoseKey(prescriptionId, medicineId, period, date)
      ],
  },
);

export function getDoseKey(
  prescriptionId: string,
  medicineId: string,
  period: DosePeriod,
  date: string,
) {
  return `${prescriptionId}_${medicineId}_${period}_${date}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizePrescriptions(value: unknown): Prescription[] {
  if (!Array.isArray(value)) return [];
  return value.filter(isRecord).map((item, prescriptionIndex) => {
    const rawMedicines = Array.isArray(item.medicines) ? item.medicines : [];
    return {
      id:
        typeof item.id === "string"
          ? item.id
          : `prescription-${prescriptionIndex + 1}`,
      doctorName: typeof item.doctorName === "string" ? item.doctorName : "",
      doctorSpecialty:
        typeof item.doctorSpecialty === "string" ? item.doctorSpecialty : "",
      patientName: typeof item.patientName === "string" ? item.patientName : "",
      date: typeof item.date === "string" ? item.date : "",
      diagnosis: typeof item.diagnosis === "string" ? item.diagnosis : "",
      medicines: rawMedicines
        .filter(isRecord)
        .map((medicine, medicineIndex) => ({
          id:
            typeof medicine.id === "string"
              ? medicine.id
              : `medicine-${prescriptionIndex + 1}-${medicineIndex + 1}`,
          name: typeof medicine.name === "string" ? medicine.name : "",
          dosage: typeof medicine.dosage === "string" ? medicine.dosage : "",
          duration:
            typeof medicine.duration === "string" ? medicine.duration : "",
          instructions:
            typeof medicine.instructions === "string"
              ? medicine.instructions
              : "",
          schedule: {
            morning:
              isRecord(medicine.schedule) && medicine.schedule.morning === true,
            afternoon:
              isRecord(medicine.schedule) &&
              medicine.schedule.afternoon === true,
            night:
              isRecord(medicine.schedule) && medicine.schedule.night === true,
          },
        })),
    };
  });
}

const prescriptionsSlice = createSlice({
  name: "prescriptions",
  initialState,
  reducers: {
    setSelectedPrescription(state, action: PayloadAction<string | null>) {
      state.selectedPrescriptionId = action.payload;
    },
    setDoseTaken(state, action: PayloadAction<string>) {
      state.doseStatuses[action.payload] = true;
      state.doseLoading[action.payload] = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPrescriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadPrescriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.prescriptions = action.payload;
        state.error = null;
      })
      .addCase(loadPrescriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Unable to load prescriptions.";
      })
      .addCase(loadDoseStatuses.fulfilled, (state, action) => {
        state.doseStatuses = action.payload;
      })
      .addCase(markDoseTaken.pending, (state, action) => {
        const { prescriptionId, medicineId, period, date } = action.meta.arg;
        state.doseLoading[
          getDoseKey(prescriptionId, medicineId, period, date)
        ] = true;
      })
      .addCase(markDoseTaken.rejected, (state, action) => {
        const { prescriptionId, medicineId, period, date } = action.meta.arg;
        const key = getDoseKey(prescriptionId, medicineId, period, date);
        state.doseLoading[key] = false;
        state.doseStatuses[key] = false;
      });
  },
});

export const { setSelectedPrescription, setDoseTaken } =
  prescriptionsSlice.actions;
export default prescriptionsSlice.reducer;
