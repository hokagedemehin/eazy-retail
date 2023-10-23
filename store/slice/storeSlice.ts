import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface StoreUserState {
  name: string;
  country_id: number;
  currency_id: number;
  industry_id: number;
  timezone_id: number;
  address: string;
  id?: number;
}

const initialState: StoreUserState = {
  name: '',
  country_id: 0,
  currency_id: 0,
  industry_id: 0,
  timezone_id: 0,
  address: '',
  id: 0,
};

export const storeUserSlice = createSlice({
  name: 'storeUser',
  initialState,
  reducers: {
    setStoreUser: (state, action) => {
      // state.id = action.payload.id
      state.name = action.payload.name;
      state.country_id = action.payload.country_id;
      state.currency_id = action.payload.currency_id;
      state.industry_id = action.payload.industry_id;
      state.timezone_id = action.payload.timezone_id;
      state.address = action.payload.address;
    },
    setStoreName: (state, action) => {
      state.name = action.payload;
    },
    setStoreCountry: (state, action) => {
      state.country_id = action.payload;
    },
    setStoreCurrency: (state, action) => {
      state.currency_id = action.payload;
    },
    setStoreIndustry: (state, action) => {
      state.industry_id = action.payload;
    },
    setStoreTimezone: (state, action) => {
      state.timezone_id = action.payload;
    },
    setStoreAddress: (state, action) => {
      state.address = action.payload;
    },
    setStoreId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const {
  setStoreUser,
  setStoreName,
  setStoreCountry,
  setStoreCurrency,
  setStoreIndustry,
  setStoreTimezone,
  setStoreAddress,
  setStoreId,
} = storeUserSlice.actions;

export const selectStoreUser = (state: RootState) => state.storeUser;

export default storeUserSlice.reducer;
