import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";

import { createBooking, getDoctors, getSlots } from "@/services/mock/mockApi";
import type { Booking, Slot } from "@/types/booking";
import type { Doctor } from "@/types/doctor";

export type BookingState = {
  doctors: Doctor[];
  selectedDoctorId: string | null;
  selectedDate: string | null;
  slots: Slot[];
  selectedSlotId: string | null;
  loadingDoctors: boolean;
  loadingSlots: boolean;
  bookingStatus: "idle" | "pending" | "confirmed" | "failed";
  booking: Booking | null;
  bookings: Booking[];
  error: string | null;
};

const initialState: BookingState = {
  doctors: [],
  selectedDoctorId: null,
  selectedDate: null,
  slots: [],
  selectedSlotId: null,
  loadingDoctors: false,
  loadingSlots: false,
  bookingStatus: "idle",
  booking: null,
  bookings: [],
  error: null,
};

const BOOKINGS_KEY = "tapza-care/bookings";

export const loadDoctors = createAsyncThunk<Doctor[]>(
  "booking/loadDoctors",
  async () => getDoctors(),
  {
    condition: (_, { getState }) =>
      !(getState() as { booking: BookingState }).booking.loadingDoctors,
  },
);

export const loadSlots = createAsyncThunk<
  Slot[],
  { doctorId: string; date: string }
>("booking/loadSlots", async ({ doctorId, date }) => getSlots(doctorId, date), {
  condition: (_, { getState }) =>
    !(getState() as { booking: BookingState }).booking.loadingSlots,
});

export const submitBooking = createAsyncThunk<
  Booking,
  { doctor: Doctor; slot: Slot },
  { state: { booking: BookingState } }
>(
  "booking/submit",
  async ({ doctor, slot }, { dispatch, getState, rejectWithValue }) => {
    const optimistic: Booking = {
      id: `pending-${slot.id}`,
      doctorId: doctor.id,
      slotId: slot.id,
      status: "pending",
      doctor,
      slot,
      date: slot.startsAt.slice(0, 10),
    };
    dispatch(setBookingPending(optimistic));
    try {
      const confirmed = await createBooking(doctor.id, slot.id);
      const booking = {
        ...confirmed,
        doctor,
        slot,
        date: slot.startsAt.slice(0, 10),
      };
      const bookings = [
        booking,
        ...getState().booking.bookings.filter(
          (item) => item.id !== optimistic.id,
        ),
      ];
      await AsyncStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
      return booking;
    } catch (error) {
      const status =
        typeof error === "object" && error !== null && "status" in error
          ? Number(error.status)
          : undefined;
      return rejectWithValue({
        message:
          error instanceof Error
            ? error.message
            : "We could not complete your booking.",
        status,
      });
    }
  },
  {
    condition: (_, { getState }) =>
      (getState() as { booking: BookingState }).booking.bookingStatus !==
      "pending",
  },
);

export const loadBookings = createAsyncThunk<Booking[]>(
  "booking/loadBookings",
  async () => {
    const value = await AsyncStorage.getItem(BOOKINGS_KEY);
    return value ? (JSON.parse(value) as Booking[]) : [];
  },
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setSelectedDoctor(state, action: PayloadAction<string | null>) {
      state.selectedDoctorId = action.payload;
      state.selectedSlotId = null;
      state.slots = [];
    },
    setSelectedDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
      state.selectedSlotId = null;
    },
    setSlots(state, action: PayloadAction<Slot[]>) {
      state.slots = action.payload;
    },
    setSelectedSlot(state, action: PayloadAction<string | null>) {
      state.selectedSlotId = action.payload;
    },
    setBookingPending(state, action: PayloadAction<Booking>) {
      state.booking = action.payload;
      state.bookingStatus = "pending";
      state.error = null;
    },
    setBookingSuccess(state, action: PayloadAction<Booking>) {
      state.booking = action.payload;
      state.bookingStatus = "confirmed";
      state.bookings = [
        action.payload,
        ...state.bookings.filter(
          (item) =>
            item.id !== action.payload.id &&
            item.id !== `pending-${action.payload.slotId}`,
        ),
      ];
      state.error = null;
    },
    setBookingFailure(state, action: PayloadAction<string>) {
      state.bookingStatus = "failed";
      state.error = action.payload;
      state.booking = null;
    },
    resetBookingFlow(state) {
      state.selectedDoctorId = null;
      state.selectedDate = null;
      state.slots = [];
      state.selectedSlotId = null;
      state.bookingStatus = "idle";
      state.booking = null;
      state.error = null;
    },
    clearBooking(state) {
      state.selectedDoctorId = null;
      state.selectedDate = null;
      state.slots = [];
      state.selectedSlotId = null;
      state.bookingStatus = "idle";
      state.booking = null;
      state.error = null;
    },
    clearBookingError(state) {
      state.error = null;
      state.bookingStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadDoctors.pending, (state) => {
        state.loadingDoctors = true;
        state.error = null;
      })
      .addCase(loadDoctors.fulfilled, (state, action) => {
        state.loadingDoctors = false;
        state.doctors = action.payload;
        state.error = null;
      })
      .addCase(loadDoctors.rejected, (state, action) => {
        state.loadingDoctors = false;
        state.error = action.error.message ?? "Unable to load doctors.";
      })
      .addCase(loadSlots.pending, (state) => {
        state.loadingSlots = true;
        state.error = null;
        state.slots = [];
      })
      .addCase(loadSlots.fulfilled, (state, action) => {
        state.loadingSlots = false;
        state.slots = action.payload;
        state.error = null;
      })
      .addCase(loadSlots.rejected, (state, action) => {
        state.loadingSlots = false;
        state.error = action.error.message ?? "Unable to load available slots.";
      })
      .addCase(loadBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
      })
      .addCase(submitBooking.fulfilled, (state, action) => {
        state.booking = action.payload;
        state.bookingStatus = "confirmed";
        state.bookings = [
          action.payload,
          ...state.bookings.filter(
            (item) => item.slotId !== action.payload.slotId,
          ),
        ];
        state.error = null;
      })
      .addCase(submitBooking.rejected, (state, action) => {
        const payload = action.payload as
          | { message?: string; status?: number }
          | undefined;
        state.bookingStatus = "failed";
        state.error =
          payload?.message ??
          action.error.message ??
          "We could not complete your booking.";
        state.booking = null;
        if (payload?.status === 409) {
          state.slots = state.slots.map((slot) =>
            slot.id === state.selectedSlotId
              ? { ...slot, available: false }
              : slot,
          );
          state.selectedSlotId = null;
        }
      });
  },
});

export const {
  setSelectedDoctor,
  setSelectedDate,
  setSlots,
  setSelectedSlot,
  setBookingPending,
  setBookingSuccess,
  setBookingFailure,
  resetBookingFlow,
  clearBooking,
  clearBookingError,
} = bookingSlice.actions;
export default bookingSlice.reducer;
