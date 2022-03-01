import React from 'react'
// libs
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// hooks
import { useCurrentUser } from '@md-shared/hooks'
// constants
import { ROUTES, RootParamList } from './constants'
// components
import { BottomTabMenu } from '@md-navigation/bottom-tab-menu'
// screens
import { LogInScreen, SignUpScreen, UserDetailsScreen } from '@md-screens'

const Stack = createNativeStackNavigator<RootParamList>()

const RootStack = () => {
  const user = useCurrentUser()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user.authorized ? (
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
