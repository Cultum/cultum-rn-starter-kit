import * as React from 'react'
// libs
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// theme
import { color, styles } from '@md-shared/theme'
// components
import { Screen } from '@md-shared/components'
import { TabMenu } from '@md-shared/components/ui'
// constants
import { ROUTES, UserParamList, UsersParamList } from '@md-navigation/constants'
// screens
import { UsersScreen, UserScreen } from '@md-screens'

const SCREEN_OPTIONS = {
  headerShown: false,
}

const UserStack = createNativeStackNavigator<UserParamList>()

const UserNavigator = () => {
  return (
    <UserStack.Navigator screenOptions={SCREEN_OPTIONS}>
      <UserStack.Screen name={ROUTES.home.TABS.USER} component={UserScreen} />
    </UserStack.Navigator>
  )
}

const UsersStack = createNativeStackNavigator<UsersParamList>()

const UsersNavigator = () => {
  return (
    <UsersStack.Navigator screenOptions={SCREEN_OPTIONS}>
      <UsersStack.Screen name={ROUTES.home.TABS.USERS} component={UsersScreen} />
    </UsersStack.Navigator>
  )
}

const TABS = [
  {
    name: 'Current User',
    screen: UserNavigator,
  },
  {
    name: 'Users List',
    screen: UsersNavigator,
  },
]

const SCREEN_CONTAINER = { ...styles.SCREEN_CONTAINER, paddingBottom: 0, paddingHorizontal: 0 }

const UsersTabsMenuWrapper = () => (
  <Screen
    preset={'fixed'}
    style={SCREEN_CONTAINER}
    statusBar={'dark-content'}
    backgroundColor={color.backgroundContent}
  >
    <TabMenu tabs={TABS} />
  </Screen>
)

export { UsersTabsMenuWrapper as UsersTabsMenu }
