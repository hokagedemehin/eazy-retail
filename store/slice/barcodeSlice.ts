import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface BarcodeState {
  barcode: string;
}

const initialState: BarcodeState = {
  barcode: '',
};

export const barcodeSlice = createSlice({
  name: 'barcode',
  initialState,
  reducers: {
    addBarcode: (state, action: PayloadAction<string>) => {
      state.barcode = action.payload;
    },
  },
});

export const { addBarcode } = barcodeSlice.actions;

export const selectBarcode = (state: RootState) => state.barcode.barcode;

export default barcodeSlice.reducer;
