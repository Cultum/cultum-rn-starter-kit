import { combineReducers } from 'redux'
// shapes
import { UIReducers } from './ui'
import { ApiReducers } from './api'
import { InitialState as AppState } from './app'
import { InitialState as ProfileState } from './profile'

export type RootStore = {
  ui: UIReducers
  app: AppState
  api: ApiReducers
  profile: ProfileState
}

export const rootReducer = combineReducers<RootStore>({
  ui: require('./ui').uiReducers,
  app: require('./app').reducer,
  api: require('./api').apiReducers,
  profile: require('./profile').reducer,
})
