// libs
import { AppState } from '@md-store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// types
import { User } from '@md-shared/types/entities'

interface UserState {
  data?: User;
  authorized: boolean
}

const initialState: UserState = {
  authorized: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => ({ ...state, data: action.payload }),
    resetUser: () => initialState,
    setAuthorized: (state, action: PayloadAction<boolean>) => ({ ...state, authorized: action.payload }),
    updateUser: (state, action: PayloadAction<User>) => ({
      ...state,
      data: {
        ...state.data,
        ...action.payload,
      },
    }),
  },
})

export const { setUser, resetUser, updateUser, setAuthorized } = userSlice.actions

export const userSelector = (state: AppState) => state.user

export default userSlice.reducer

