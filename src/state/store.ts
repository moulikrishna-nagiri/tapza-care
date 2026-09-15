import { configureStore } from '@reduxjs/toolkit';

import bookingReducer from '@/features/booking/bookingSlice';
import configReducer from '@/features/home/configSlice';

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    config: configReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
