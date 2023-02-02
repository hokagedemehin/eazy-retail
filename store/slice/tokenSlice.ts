import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface TokenState {
  token: string
  onBoarded: boolean
}

const initialState: TokenState = {
  token: '',
  onBoarded: false,
}

// const handleRedirect = async () => {
//   await SecureStore.setItemAsync('onboarding', 'true');
//   // setInitialPageName('SignUp');
//   setOnboarded(true);
//   // navigation.navigate('SignUp');
// };

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setOnBoarded: (state, action: PayloadAction<boolean>) => {
      state.onBoarded = action.payload
    }
  },
})

export const { setToken, setOnBoarded } = tokenSlice.actions

export const selectToken = (state: RootState) => state.token.token

export default tokenSlice.reducer
