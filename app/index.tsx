import * as React from 'react'
// libs
import { PersistGate } from 'redux-persist/lib/integration/react'
// providers
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { SafeAreaProvider } from 'react-native-safe-area-context'
// navigation
import { RootNavigator } from '@md-navigation'
// store
import { store, persistor } from '@md-store'
// themes
import { theme } from '@md-shared/theme'

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          {/**
           * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
           * and saved to redux.
           * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
           * for example `loading={<SplashScreen />}`.
           * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
           */}
          <PersistGate loading={null} persistor={persistor}>
            <RootNavigator />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

export default App
