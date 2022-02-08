import React from 'react'
// libs
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// hooks
import { useSelector } from 'react-redux'
// constants
import { ROUTES, RootParamList } from './constants'
// components
import { BottomTabMenu } from '@md-navigation/bottom-tab-menu'
// screens
import { LogInScreen, SignUpScreen, UserDetailsScreen } from '@md-screens'
// types
import { RootStore } from '@md-store/modules'

const Stack = createNativeStackNavigator<RootParamList>()

interface StoreProfileSelector {
  isAuthorized: RootStore['profile']['authorized']
}

const RootStack = () => {
  const { isAuthorized } = useSelector<RootStore, StoreProfileSelector>((state) => ({
    isAuthorized: state.profile.authorized,
  }))

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthorized ? (
        <Stack.Group>
          <Stack.Screen name={ROUTES.root.ROOT_STACK} component={BottomTabMenu} />
          <Stack.Screen name={ROUTES.home.DETAILS} component={UserDetailsScreen} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name={ROUTES.auth.SIGN_UP} component={SignUpScreen} />
          <Stack.Screen name={ROUTES.auth.LOG_IN} component={LogInScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  )
}

const RootNavigator = () => (
  <NavigationContainer>
    <RootStack />
  </NavigationContainer>
)

export { RootNavigator }
