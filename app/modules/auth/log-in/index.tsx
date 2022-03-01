import * as React from 'react'
// hooks
import { useNavigation } from '@react-navigation/native'
// components
import { Auth } from '@md-modules/auth/shared/components/auth'
// api
import { useLogInMutation } from '@md-store/middlewares/api/endpoints'
// types
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
// constants
import { PrimaryParamList, ROUTES } from '@md-navigation/constants'

interface FormInputs {
  email: string
  password: string
}

type LogInScreenProp = NativeStackNavigationProp<PrimaryParamList, 'LOG_IN'>

const LogIn = () => {
  const navigation = useNavigation<LogInScreenProp>()

  const [logInMutation, { isLoading }] = useLogInMutation()

  const goToSignUp = () => navigation.navigate(ROUTES.auth.SIGN_UP)

  const logIn = (data: FormInputs) => logInMutation({ ...data })

  // TODO: change
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <Auth isLoading={isLoading} onFormSubmit={logIn} onNavButtonPress={goToSignUp} />
}

export { LogIn }
