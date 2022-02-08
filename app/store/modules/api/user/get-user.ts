// types
import { GetUserResponse, GetUserParams } from '@md-shared/services/api/controllers'
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
// utils
import { storageManager } from '@md-shared/utils/storage'

/* ------------- Types ------------- */

export const SET_GET_USER_LOADING = '@user/getUser/SET_GET_USER_LOADING'
export const SET_GET_USER_ERROR = '@user/getUser/SET_GET_USER_ERROR'
export const SET_GET_USER_SUCCESS = '@user/getUser/SET_GET_USER_SUCCESS'

/* ------------- Types and Action Creators ------------- */

export const setGetUserProfileLoadingAction = createAction<typeof SET_GET_USER_LOADING, boolean>(SET_GET_USER_LOADING)
export type SetGetUserProfileLoadingAction = ReturnType<typeof setGetUserProfileLoadingAction>

export const setGetUserProfileErrorAction = createAction<typeof SET_GET_USER_ERROR, string>(SET_GET_USER_ERROR)
export type SetGetUserProfileErrorAction = ReturnType<typeof setGetUserProfileErrorAction>

export const setGetUserProfileSuccessAction = createAction<typeof SET_GET_USER_SUCCESS, GetUserResponse>(
  SET_GET_USER_SUCCESS,
)
export type SetGetUserProfileSuccessAction = ReturnType<typeof setGetUserProfileSuccessAction>

type Actions = SetGetUserProfileLoadingAction | SetGetUserProfileErrorAction | SetGetUserProfileSuccessAction

/* ------------- Initial State ------------- */

export type InitialState = {
  loading: boolean
  error: null | string
  data?: GetUserResponse
}

export const INITIAL_STATE: InitialState = {
  loading: false,
  error: null,
  data: undefined,
}

/* ------------- Thunks ------------- */

export const performAPIGetUser =
  (
    params: GetUserParams,
  ): ThunkAction<
    typeof SET_GET_USER_LOADING | typeof SET_GET_USER_ERROR | typeof SET_GET_USER_SUCCESS,
    Promise<ClientSuccess<GetUserResponse> | ClientError<RequestError>>
  > =>
  async (dispatch, getState, createApi) => {
    const token = await storageManager.getAuthToken()
    const api = createApi({ token })

    try {
      dispatch(setGetUserProfileLoadingAction(true))

      const { data } = await api.getUser(params)

      dispatch(setGetUserProfileSuccessAction(data))

      return clientSuccess(data)
    } catch (error) {
      const errorMap = getRequestError(error)

      dispatch(setGetUserProfileErrorAction(error.message))

      return clientError(errorMap)
    } finally {
      dispatch(setGetUserProfileLoadingAction(false))
    }
  }

/* ------------- Hookup Reducers To Types ------------- */

export function reducer(state = INITIAL_STATE, action: Actions): InitialState {
  switch (action.type) {
    case SET_GET_USER_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    case SET_GET_USER_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case SET_GET_USER_SUCCESS:
      return {
        ...state,
        error: null,
        data: action.payload,
      }
    default:
      return state
  }
}
