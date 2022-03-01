// libs
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// types
import { AppState } from '@md-store'
import { NotificationPresets, NotificationType } from '@md-shared/components/ui/toast-notification'

export interface OpenToastParams {
  type: NotificationType
  preset: NotificationPresets
  message: string
  // onPress?(): unknown
}

interface ToastState {
  type: NotificationType
  preset: NotificationPresets
  open: boolean
  message: string
  // onPress(e: GestureResponderEvent): unknown
}

const initialState: ToastState = {
  type: 'ERROR',
  preset: 'TEMPORARY',
  message: '',
  // onPress: () => undefined,
  open: false,
}

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    openToast: (state, action: PayloadAction<OpenToastParams>) => {
      return state.open
        ? state
        : {
          ...state,
          ...action.payload,
          open: true,
        }
    },
    hideToast: (state) => {
      return {
        ...state,
        open: false,
      }
    },
    resetToast: () => initialState,
  },
})

export const { openToast, hideToast, resetToast } = toastSlice.actions

export const toastSelector = (state: AppState) => state.ui.toast

export default toastSlice.reducer
