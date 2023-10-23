import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface UserState {
  user: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
  };
}

const initialState: UserState = {
  user: {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action
      // : PayloadAction<{
      //   companies: [];
      //   email: string;
      //   firstname: string;
      //   id: number;
      //   lastname: string;
      //   phone: string;
      // }
      // >
    ) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
