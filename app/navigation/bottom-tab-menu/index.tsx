import * as React from 'react'
// libs
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// constants
import { ROUTES, HomeParamList, SettingsParamList } from '@md-navigation/constants'
// assets
import { Home, Settings } from './tab-icons'
// theme
import { theme } from '@md-shared/theme'
// components
import { UsersTabsMenu } from '@md-navigation/tab-menu-navigators/users'
// screens
import { SettingsScreen } from '@md-screens/settings'

const SCREEN_OPTIONS = {
  headerShown: false,
}

// USERS
const HomeStack = createNativeStackNavigator<HomeParamList>()

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={SCREEN_OPTIONS}>
      <HomeStack.Screen name={ROUTES.home.ROOT} component={UsersTabsMenu} />
    </HomeStack.Navigator>
  )
}

// SETTINGS
const SettingsStack = createNativeStackNavigator<SettingsParamList>()

const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator screenOptions={SCREEN_OPTIONS}>
      <SettingsStack.Screen name={ROUTES.settings.ROOT} component={SettingsScreen} />
    </SettingsStack.Navigator>
  )
}

// TABS
const tabs = [
  {
    Icon: Home,
    name: 'Home',
    screen: HomeNavigator,
  },
  {
    Icon: Settings,
    name: 'Settings',
    screen: SettingsNavigator,
  },
]

// TAB MENU
const Tab = createBottomTabNavigator()

const BottomTabMenu = () => (
  <Tab.Navigator screenOptions={{ ...SCREEN_OPTIONS, lazy: false }}>
    {tabs.map((tab) => (
      <Tab.Screen
        key={tab.name}
        name={tab.name}
        component={tab.screen}
        options={{
          tabBarIcon: ({ focused }) => <tab.Icon color={focused ? theme.color.primary : theme.color.palette.blue900} />,
        }}
      />
    ))}
  </Tab.Navigator>
)

export { BottomTabMenu }
