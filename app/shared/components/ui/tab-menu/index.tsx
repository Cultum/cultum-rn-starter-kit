import * as React from 'react'
// libs
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

interface Props {
  tabs: { name: string; screen: () => JSX.Element }[]
}

const Tab = createMaterialTopTabNavigator()

const TabMenu: React.FC<Props> = ({ tabs }) => (
  <Tab.Navigator>
    {tabs.map((tab) => (
      <Tab.Screen key={tab.name} name={tab.name} component={tab.screen} />
    ))}
  </Tab.Navigator>
)

export { TabMenu }
