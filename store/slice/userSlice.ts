import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface UserState {
  user: object
}

const initialState: UserState = {
  user: {},
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{
      pk: number
      email: string
      first_name: string
      last_name: string
      phone: string
      date_joined: string
    }>) => {
      state.user = action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const selectUser = (state: RootState) => state.user.user

export default userSlice.reducer
