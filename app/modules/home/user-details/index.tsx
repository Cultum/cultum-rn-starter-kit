import * as React from 'react'
// hooks
import { useRoute, Route, useNavigation } from '@react-navigation/native'
// components
import { Text } from '@md-shared/components'
import { UserCard, NavigationButton } from '@md-modules/home/shared/components'
// Types
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { PrimaryParamList, RootParamList, ROUTES } from '@md-navigation/constants'

const TEXT_STYLES = { align: 'center' as const, mb: 30 }

type SettingsScreenProp = NativeStackNavigationProp<PrimaryParamList, 'SIGN_UP'>

const UserDetails = () => {
  const navigation = useNavigation<SettingsScreenProp>()
  const route = useRoute<Route<typeof ROUTES.home.DETAILS, RootParamList['USER_DETAILS']>>()

  const goBack = () => navigation.goBack()

  return (
    <>
      <Text textStyle={TEXT_STYLES} preset={'header'}>
        User Details
      </Text>
      <UserCard user={route.params.user} />
      <NavigationButton text={'Go Back'} onPress={goBack} />
    </>
  )
}

export { UserDetails }
