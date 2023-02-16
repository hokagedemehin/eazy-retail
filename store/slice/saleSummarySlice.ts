import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state

type SaleSummaryType = {
  subtotal: number
  tax: number
  discount: number
  total: number
  receiptID: string
  customerName: string
  customerPhone: string
  paymentMethod: string
  cashReceived: number
  short: number
  change: number
  note: string
  salesDate: string

}
interface SaleSummaryState {
  saleSummary: SaleSummaryType
}

// Define the initial state using that type
const initialState: SaleSummaryState = {
  saleSummary: { subtotal: 0, tax: 0, discount: 0, total: 0, receiptID: '', customerName: '', customerPhone: '', paymentMethod: '', cashReceived: 0, short: 0, change: 0, note: '', salesDate: '' }
}

export const saleSummarySlice = createSlice({
  name: 'saleSummary',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setSaleSummary: (state, action: PayloadAction<SaleSummaryType>) => {
      state.saleSummary = action.payload
    },
  },
})

export const { setSaleSummary } = saleSummarySlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSaleSummary = (state: RootState) => state.saleSummary.saleSummary

export default saleSummarySlice.reducer
