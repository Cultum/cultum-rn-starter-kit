// libs
import { persistReducer } from 'redux-persist'
import { AnyAction, Reducer, CombinedState } from 'redux'
// local
import { rootReducer } from './modules'
import configureStore from './create-store'
import ReduxPersist from './redux-persist'

/* ------------- Assemble The Reducers ------------- */
export default () => {
  let finalReducers: Reducer<CombinedState<any>, AnyAction> = rootReducer
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig

    finalReducers = persistReducer(persistConfig, rootReducer)
  }

  const { store } = configureStore(finalReducers)

  if (module?.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./modules').rootReducer

      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
