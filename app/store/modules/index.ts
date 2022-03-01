import { Reducer, combineReducers } from 'redux'
// reducers
import uiReducers from './ui'
import userReducer from './user'
// api
import { api } from '@md-store/middlewares/api'
// store
import { RESET_STATE_ACTION_TYPE } from '@md-store/middlewares/unauthenticated'

export const combinedReducer = combineReducers({
  ui: uiReducers,
  user: userReducer,
  [api.reducerPath]: api.reducer,
})

export const rootReducer: Reducer<RootState> = (
  state,
  action,
) => {
  if (action.type === RESET_STATE_ACTION_TYPE) {
    state = {} as RootState
  }

  return combinedReducer(state, action)
}

export type RootState = ReturnType<typeof combinedReducer>;
