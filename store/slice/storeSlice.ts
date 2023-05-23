import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface StoreUserState {
  id: number,
  business_name: string,
  country: string,
  currency: string,
  industry: string,
  user: number,
}

const initialState: StoreUserState = {
  id: 0,
  business_name: '',
  country: '',
  currency: '',
  industry: '',
  user: 0,
}

export const storeUserSlice = createSlice({
  name: 'storeUser',
  initialState,
  reducers: {
    setStoreUser: (state, action: PayloadAction<StoreUserState>) => {
      state.id = action.payload.id
      state.business_name = action.payload.business_name
      state.country = action.payload.country
      state.currency = action.payload.currency
      state.industry = action.payload.industry
      state.user = action.payload.user
    }
  },
})

export const { setStoreUser } = storeUserSlice.actions

export const selectStoreUser = (state: RootState) => state.storeUser

export default storeUserSlice.reducer
