// libs
import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit'
// store
import { openToast } from '@md-store/modules/ui/toast'

export const rtkQueryErrorLogger: Middleware = ({ dispatch }) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    dispatch(openToast({
      type: 'ERROR',
      preset: 'TEMPORARY',
      message: action.error.message,
    }))
  }

  return next(action)
}
