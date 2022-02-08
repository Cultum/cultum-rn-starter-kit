import * as React from 'react'
// libs
import { Platform, StatusBar } from 'react-native'
// providers
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { SafeAreaProvider } from 'react-native-safe-area-context'
// navigation
import { RootNavigator } from '@md-navigation'
// store
import createStore from './store'
// themes
import { theme } from '@md-shared/theme'

const store = createStore()

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <StatusBar hidden={Platform.OS === 'ios'} />
          <RootNavigator />
        </Provider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

export default App
