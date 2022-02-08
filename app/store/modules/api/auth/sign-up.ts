// types
import { AuthVariables, SignUpResponse } from '@md-shared/services/api/controllers'
// helpers
import { createAction, ThunkAction } from '@md-store/helpers'
import {
  ClientError,
  clientError,
  RequestError,
  ClientSuccess,
  clientSuccess,
  getRequestError,
} from '@md-shared/services/api'

/* ------------- Types ------------- */

export const SET_SIGN_UP_LOADING = '@auth/signUp/SET_SIGN_UP_LOADING'
export const SET_SIGN_UP_ERROR = '@auth/signUp/SET_SIGN_UP_ERROR'
export const SET_SIGN_UP_SUCCESS = '@auth/signUp/SET_SIGN_UP_SUCCESS'

/* ------------- Types and Action Creators ------------- */

export const setSignUpLoadingAction = createAction<typeof SET_SIGN_UP_LOADING, boolean>(SET_SIGN_UP_LOADING)
export type SetSignUpLoadingAction = ReturnType<typeof setSignUpLoadingAction>

export const setSignUpErrorAction = createAction<typeof SET_SIGN_UP_ERROR, RequestError>(SET_SIGN_UP_ERROR)
export type SetSignUpErrorAction = ReturnType<typeof setSignUpErrorAction>

export const setSignUpSuccessAction = createAction<typeof SET_SIGN_UP_SUCCESS, SignUpResponse>(SET_SIGN_UP_SUCCESS)
export type SetSignUpSuccessAction = ReturnType<typeof setSignUpSuccessAction>

type Actions = SetSignUpLoadingAction | SetSignUpErrorAction | SetSignUpSuccessAction

/* ------------- Initial State ------------- */

export type InitialState = {
  loading: boolean
  error: null | RequestError
  data?: SignUpResponse
}

export const INITIAL_STATE: InitialState = {
  loading: false,
  error: null,
  data: undefined,
}

/* ------------- Thunks ------------- */

export const performAPISignUp =
  (
    variables: AuthVariables,
  ): ThunkAction<
    typeof SET_SIGN_UP_LOADING | typeof SET_SIGN_UP_ERROR | typeof SET_SIGN_UP_SUCCESS,
    Promise<ClientSuccess<SignUpResponse> | ClientError<RequestError>>
  > =>
  async (dispatch, getState, createApi) => {
    const api = createApi()

    try {
      dispatch(setSignUpLoadingAction(true))

      const { data } = await api.signUp(variables)

      dispatch(setSignUpSuccessAction(data))

      return clientSuccess(data)
    } catch (error) {
      const errorMap = getRequestError(error)

      dispatch(setSignUpErrorAction(errorMap))

      return clientError(errorMap)
    } finally {
      dispatch(setSignUpLoadingAction(false))
    }
  }

/* ------------- Hookup Reducers To Types ------------- */

export function reducer(state = INITIAL_STATE, action: Actions): InitialState {
  switch (action.type) {
    case SET_SIGN_UP_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    case SET_SIGN_UP_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case SET_SIGN_UP_SUCCESS:
      return {
        ...state,
        error: null,
        data: action.payload,
      }
    default:
      return state
  }
}
