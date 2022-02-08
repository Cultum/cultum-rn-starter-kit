// constants
import * as modalTypes from '@md-shared/constants/modal'
// types
import { ModalType } from '@md-shared/hooks'
// helpers
import { createAction } from '@md-store/helpers'
// utils
import { keys } from 'lodash'

/* ------------- Types ------------- */

export const OPEN_MODAL = '@ui/modal/OPEN_MODAl'
export const CLOSE_MODAL = '@ui/modal/CLOSE_MODAL'

/* ------------- Types and Action Creators ------------- */

export const setOpenModalAction = createAction<typeof OPEN_MODAL, { modalType: ModalType; modalData?: unknown }>(
  OPEN_MODAL,
)
export type SetOpenModalAction = ReturnType<typeof setOpenModalAction>

export const setCloseModalAction = createAction<typeof CLOSE_MODAL, { modalType: ModalType }>(CLOSE_MODAL)
export type SetCloseModalAction = ReturnType<typeof setCloseModalAction>

type Actions = SetOpenModalAction | SetCloseModalAction

/* ------------- Initial State ------------- */

export type InitialState = {
  [key: string]: { open: boolean; data: any }
}

export const INITIAL_STATE: InitialState = keys(modalTypes).reduce(
  (o, key) => ({
    ...o,
    [key]: { open: false, modalData: {} },
  }),
  {},
)

/* ------------- Hookup Reducers To Types ------------- */

export function reducer(state = INITIAL_STATE, action: Actions): InitialState {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        [action.payload.modalType]: {
          data: action.payload.modalData,
          open: true,
        },
      }
    case CLOSE_MODAL:
      return {
        ...state,
        [action.payload.modalType]: {
          data: {},
          open: false,
        },
      }
    default:
      return state
  }
}
