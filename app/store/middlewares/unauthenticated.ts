import { createAction, isRejectedWithValue, Middleware } from '@reduxjs/toolkit'

/**
 * Custom middleware for handling 401 responses by simply clearing the store
 */

export const RESET_STATE_ACTION_TYPE = 'resetState'
export const resetStateAction = createAction(
  RESET_STATE_ACTION_TYPE,
  () => {
    return { payload: null }
  },
)

export const unauthenticatedMiddleware: Middleware = ({ dispatch }) => (next) => (action) => {
  if (isRejectedWithValue(action) && action.payload.status === 401) {
    dispatch(resetStateAction())
  }

  return next(action)
}
