import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { validateConfig } from '@/config/configValidator';
import { fetchAppConfig } from '@/services/mock/mockApi';
import type { AppConfigVariant, LayoutConfig } from '@/types/config';

export type ConfigState = {
  data: LayoutConfig | null;
  loading: boolean;
  error: string | null;
  isFestival: boolean;
  isStale: boolean;
};

const initialState: ConfigState = {
  data: null,
  loading: false,
  error: null,
  isFestival: false,
  isStale: false,
};

const CACHE_KEY = 'tapza-care/layout-config';

type LoadConfigResult = { config: LayoutConfig; isStale: boolean };

export const loadConfig = createAsyncThunk<LoadConfigResult, { isFestival: boolean } | undefined>(
  'config/load',
  async (options) => {
    const isFestival = options?.isFestival ?? false;
    const variant: AppConfigVariant = isFestival ? 'festival' : 'normal';
    try {
      const config = fetchConfigOrThrow(await fetchAppConfig(variant));
      await AsyncStorage.setItem(`${CACHE_KEY}/${variant}`, JSON.stringify(config));
      return { config, isStale: false };
    } catch (error) {
      const cached = await AsyncStorage.getItem(`${CACHE_KEY}/${variant}`);
      const config = cached ? readCachedConfig(cached) : null;
      if (config) return { config, isStale: true };
      throw error instanceof Error ? error : new Error('Unable to load home configuration.');
    }
  },
  { condition: (_, { getState }) => !(getState() as { config: ConfigState }).config.loading },
);

function fetchConfigOrThrow(config: LayoutConfig) {
  const validConfig = validateConfig(config);
  if (!validConfig) throw new Error('The home configuration is invalid.');
  return validConfig;
}

function readCachedConfig(value: string): LayoutConfig | null {
  try {
    return validateConfig(JSON.parse(value));
  } catch {
    return null;
  }
}

const configSlice = createSlice({
  name: "config",

  initialState,

  reducers: {
    setConfigLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setConfig: (state, action: PayloadAction<LayoutConfig>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
      state.isStale = false;
    },

    setConfigError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },

    setFestivalMode: (state, action: PayloadAction<boolean>) => {
      state.isFestival = action.payload;
    },

    clearConfigError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.config;
        state.isStale = action.payload.isStale;
        state.error = null;
      })
      .addCase(loadConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Unable to load your home screen.';
      });
  },
});

export const {
  setConfigLoading,
  setConfig,
  setConfigError,
  setFestivalMode,
  clearConfigError,
} = configSlice.actions;

export default configSlice.reducer;
