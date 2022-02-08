// types
import { GetUsersResponse, GetUsersParams } from '@md-shared/services/api/controllers'
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

export const SET_GET_USERS_LOADING = '@user/getUsers/SET_GET_USERS_LOADING'
export const SET_GET_USERS_LOAD_MORE = '@user/getUsers/SET_GET_USERS_LOAD_MORE'
export const SET_GET_USERS_ERROR = '@user/getUsers/SET_GET_USERS_ERROR'
export const SET_GET_USERS_SUCCESS = '@user/getUsers/SET_GET_USERS_SUCCESS'

/* ------------- Types and Action Creators ------------- */

export const setGetUsersLoadingAction = createAction<typeof SET_GET_USERS_LOADING, boolean>(SET_GET_USERS_LOADING)
export type SetGetUsersLoadingAction = ReturnType<typeof setGetUsersLoadingAction>

export const setGetUsersLoadMoreSuccessAction = createAction<typeof SET_GET_USERS_LOAD_MORE, boolean>(
  SET_GET_USERS_LOAD_MORE,
)
export type SetGetUsersLoadMoreAction = ReturnType<typeof setGetUsersLoadMoreSuccessAction>

export const setGetUsersErrorAction = createAction<typeof SET_GET_USERS_ERROR, string>(SET_GET_USERS_ERROR)
export type SetGetUsersErrorAction = ReturnType<typeof setGetUsersErrorAction>

export const setGetUsersSuccessAction = createAction<typeof SET_GET_USERS_SUCCESS, GetUsersResponse>(
  SET_GET_USERS_SUCCESS,
)
export type SetGetUsersSuccessAction = ReturnType<typeof setGetUsersSuccessAction>

type Actions = SetGetUsersLoadingAction | SetGetUsersErrorAction | SetGetUsersSuccessAction | SetGetUsersLoadMoreAction

/* ------------- Initial State ------------- */

export type InitialState = {
  loading: boolean
  loadMore: boolean
  error: null | string
  data?: GetUsersResponse
}

export const INITIAL_STATE: InitialState = {
  loading: false,
  loadMore: false,
  error: null,
  data: undefined,
}

/* ------------- Thunks ------------- */

export const performAPIGetUsers =
  (
    params: GetUsersParams,
    shouldLoadMore?: boolean,
  ): ThunkAction<
    | typeof SET_GET_USERS_LOADING
    | typeof SET_GET_USERS_ERROR
    | typeof SET_GET_USERS_SUCCESS
    | typeof SET_GET_USERS_LOAD_MORE,
    Promise<ClientSuccess<GetUsersResponse> | ClientError<RequestError>>
  > =>
  async (dispatch, getState, createApi) => {
    const token = await storageManager.getAuthToken()
    const api = createApi({ token })

    try {
      dispatch(shouldLoadMore ? setGetUsersLoadMoreSuccessAction(true) : setGetUsersLoadingAction(true))

      const { data } = await api.getUsers(params)

      dispatch(setGetUsersSuccessAction(data))

      return clientSuccess(data)
    } catch (error) {
      const errorMap = getRequestError(error)

      dispatch(setGetUsersErrorAction(error.message))

      return clientError(errorMap)
    } finally {
      dispatch(shouldLoadMore ? setGetUsersLoadMoreSuccessAction(false) : setGetUsersLoadingAction(false))
    }
  }

/* ------------- Hookup Reducers To Types ------------- */

export function reducer(state = INITIAL_STATE, action: Actions): InitialState {
  switch (action.type) {
    case SET_GET_USERS_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    case SET_GET_USERS_LOAD_MORE:
      return {
        ...state,
        loadMore: action.payload,
      }
    case SET_GET_USERS_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case SET_GET_USERS_SUCCESS:
      return {
        ...state,
        error: null,
        data: action.payload,
      }
    default:
      return state
  }
}
