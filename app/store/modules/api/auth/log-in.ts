// types
import { AuthVariables, LogInResponse } from '@md-shared/services/api/controllers'
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

export const SET_LOG_IN_LOADING = '@auth/logIn/SET_LOG_IN_LOADING'
export const SET_LOG_IN_ERROR = '@auth/logIn/SET_LOG_IN_ERROR'
export const SET_LOG_IN_SUCCESS = '@auth/logIn/SET_LOG_IN_SUCCESS'

/* ------------- Types and Action Creators ------------- */

export const setLogInLoadingAction = createAction<typeof SET_LOG_IN_LOADING, boolean>(SET_LOG_IN_LOADING)
export type SetLogInLoadingAction = ReturnType<typeof setLogInLoadingAction>

export const setLogInErrorAction = createAction<typeof SET_LOG_IN_ERROR, RequestError>(SET_LOG_IN_ERROR)
export type SetLogInErrorAction = ReturnType<typeof setLogInErrorAction>

export const setLogInSuccessAction = createAction<typeof SET_LOG_IN_SUCCESS, LogInResponse>(SET_LOG_IN_SUCCESS)
export type SetLogInSuccessAction = ReturnType<typeof setLogInSuccessAction>

type Actions = SetLogInLoadingAction | SetLogInErrorAction | SetLogInSuccessAction

/* ------------- Initial State ------------- */

export type InitialState = {
  loading: boolean
  error: null | RequestError
  data?: LogInResponse
}

export const INITIAL_STATE: InitialState = {
  loading: false,
  error: null,
  data: undefined,
}

/* ------------- Thunks ------------- */

export const performAPILogIn =
  (
    variables: AuthVariables,
  ): ThunkAction<
    typeof SET_LOG_IN_LOADING | typeof SET_LOG_IN_ERROR | typeof SET_LOG_IN_SUCCESS,
    Promise<ClientSuccess<LogInResponse> | ClientError<RequestError>>
  > =>
  async (dispatch, getState, createApi) => {
    const api = createApi()

    try {
      dispatch(setLogInLoadingAction(true))

      const { data } = await api.logIn(variables)

      dispatch(setLogInSuccessAction(data))

      return clientSuccess(data)
    } catch (error) {
      const errorMap = getRequestError(error)

      dispatch(setLogInErrorAction(errorMap))

      return clientError(errorMap)
    } finally {
      dispatch(setLogInLoadingAction(false))
    }
  }

/* ------------- Hookup Reducers To Types ------------- */

export function reducer(state = INITIAL_STATE, action: Actions): InitialState {
  switch (action.type) {
    case SET_LOG_IN_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    case SET_LOG_IN_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case SET_LOG_IN_SUCCESS:
      return {
        ...state,
        error: null,
        data: action.payload,
      }
    default:
      return state
  }
}
