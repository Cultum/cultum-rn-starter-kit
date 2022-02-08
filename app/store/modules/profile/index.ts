// types
import { User } from '@md-shared/types/entities'
// helpers
import { createAction } from '@md-store/helpers'

/* ------------- Types ------------- */

export const SET_AUTHORIZED = '@auth/profile/SET_AUTHORIZED'
export const SET_USER = '@auth/profile/SET_USER'
export const RESET_PROFILE = '@auth/profile/RESET_PROFILE'
export const UPDATE_PROFILE = '@auth/profile/UPDATE_PROFILE'

/* ------------- Types and Action Creators ------------- */

export const setAuthorizedAction = createAction<typeof SET_AUTHORIZED, boolean>(SET_AUTHORIZED)
export type SetAuthorizedAction = ReturnType<typeof setAuthorizedAction>

export const setUserAction = createAction<typeof SET_USER, User>(SET_USER)
export type SetUserAction = ReturnType<typeof setUserAction>

export const resetProfileAction = createAction<typeof RESET_PROFILE>(RESET_PROFILE)
export type ResetProfileAction = ReturnType<typeof resetProfileAction>

export const updateProfileAction = createAction<typeof UPDATE_PROFILE, Omit<User, 'id' | 'avatar'>>(UPDATE_PROFILE)
export type UpdateProfileAction = ReturnType<typeof updateProfileAction>

type Actions = SetUserAction | SetAuthorizedAction | ResetProfileAction | UpdateProfileAction

/* ------------- Initial State ------------- */

export type InitialState = {
  user?: User
  authorized: null | boolean
}

export const INITIAL_STATE: InitialState = {
  user: undefined,
  authorized: null,
}

/* ------------- Hookup Reducers To Types ------------- */

export function reducer(state = INITIAL_STATE, action: Actions): InitialState {
  switch (action.type) {
    case SET_AUTHORIZED:
      return {
        ...state,
        authorized: action.payload,
      }
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      }
    case UPDATE_PROFILE:
      return {
        ...state,
        user: state.user && { ...state.user, ...action.payload },
      }
    case RESET_PROFILE:
      return INITIAL_STATE
    default:
      return state
  }
}
