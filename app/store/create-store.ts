// libs
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware, compose, StoreEnhancer } from 'redux'
// local
import { createAPI } from '@md-shared/services/api'
import Rehydration from './rehydration'
import ReduxPersist from './redux-persist'

// eslint-disable-next-line @typescript-eslint/ban-types
export type window = {}

// creates the store
export default (rootReducer) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = [thunk.withExtraArgument(createAPI)]
  const enhancers: StoreEnhancer[] = []

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(composeWithDevTools(applyMiddleware(...middleware)))

  const store = createStore(rootReducer, compose(...enhancers))

  // configure persistStore and check reducer version number
  if (ReduxPersist.active) {
    Rehydration.updateReducers(store)
  }

  return {
    store,
  }
}
