import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface HideTabsState {
  parentName: string
}

const initialState: HideTabsState = {
  parentName: ''
}

export const hideTabsSlice = createSlice({
  name: 'hideTabs',
  initialState,
  reducers: {
    getParentName: (state, action: PayloadAction<string>) => {
      state.parentName = action.payload
    }
  }
})

export const { getParentName } = hideTabsSlice.actions

export const selectHideTabs = (state: RootState) => state.hideTabs.parentName

export default hideTabsSlice.reducer

