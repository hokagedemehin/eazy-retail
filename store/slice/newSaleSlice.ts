import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface NewSaleState {
  selectedSales: Array<{
    id: string | number,
    name: string,
    price: number,
    discount: number,
    discountPercent: number,
    sellingPrice: number,
    isFree: boolean,
    isGift: boolean,
    quantity: number,
    image: string,
    changeQuantity: number,
    total: number,
  }>
}

const initialState: NewSaleState = {
  selectedSales: [],
}

// console.log('initialState :>> ', initialState.selectedSales);

export const newSaleSlice = createSlice({
  name: 'newSale',
  initialState,
  reducers: {
    addSale: (state, action: PayloadAction<Array<{
    id: string | number,
    name: string,
    price: number,
    discount: number,
    discountPercent: number,
    sellingPrice: number,
    isFree: boolean,
    isGift: boolean,
    quantity: number,
    image: string,
    changeQuantity: number,
    total: number,
    }>>) => {
      // console.log('action.payload :>> ', action.payload)
      state.selectedSales = action.payload
    }
  },
})

export const { addSale } = newSaleSlice.actions

export const selectNewSale = (state: RootState) => state.newSale.selectedSales

export default newSaleSlice.reducer
