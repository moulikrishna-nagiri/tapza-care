import { configureStore } from '@reduxjs/toolkit';

import bookingReducer from '@/features/booking/bookingSlice';
import configReducer from '@/features/home/configSlice';
import prescriptionsReducer from '@/features/prescriptions/prescriptionsSlice';

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    config: configReducer,
    prescriptions: prescriptionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
