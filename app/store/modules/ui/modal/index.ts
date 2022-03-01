// libs
import { AppState } from '@md-store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// constants
import * as modalTypes from '@md-shared/constants/modal'
// utils
import keys from 'lodash/keys'

type Modal = { isOpen: boolean, modalData?: Record<string, unknown> }

interface ModalState {
  [key: string]: Modal
}

const initialState: ModalState = keys(modalTypes).reduce(
  (o, key) => ({
    ...o,
    [key]: { isOpen: false },
  }),
  {},
)

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ modalType: string, modalData?: Record<string, unknown> }>) => ({
      ...state,
      [action.payload.modalType]: {
        isOpen: true,
        ...(action.payload.modalData && { modalData: action.payload.modalData }),
      },
    }),
    closeModal: (state, action: PayloadAction<{ modalType: string }>) => ({
      ...state,
      [action.payload.modalType]: { isOpen: false, modalData: {} },
    }),
  },
})

export const {
  openModal,
  closeModal,
} = modalSlice.actions

export const modalSelector = (state: AppState, modalType: string) => state.ui.modal[modalType]

export default modalSlice.reducer


