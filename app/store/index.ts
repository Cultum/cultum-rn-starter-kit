// libs
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setupListeners } from '@reduxjs/toolkit/query'
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
// reducers
import { rootReducer } from '@md-store/modules'
// middlewares
import { api } from '@md-store/middlewares/api'

const persistConfig = {
  key: 'root',
  version: 1.0,
  storage: AsyncStorage,
  whitelist: ['user'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  devTools: __DEV__,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
})

setupListeners(store.dispatch)

const persistor = persistStore(store)

export { store, persistor }

// types
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
