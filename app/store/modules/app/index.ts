import { createAction } from '@md-store/helpers'

/* ------------- Types ------------- */

export const SET_INITIALIZED = '@app/SET_INITIALIZED'

/* ------------- Types and Action Creators ------------- */

export const setInitializedAction = createAction<typeof SET_INITIALIZED, boolean>(SET_INITIALIZED)
export type SetInitializedAction = ReturnType<typeof setInitializedAction>

type Actions = SetInitializedAction

/* ------------- Initial State ------------- */

export type InitialState = {
  initialized?: boolean
}

export const INITIAL_STATE: InitialState = {
  initialized: false,
}

/* ------------- Hookup Reducers To Types ------------- */

export function reducer(state = INITIAL_STATE, action: Actions): InitialState {
  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state,
        initialized: action.payload,
      }
    default:
      return state
  }
}
