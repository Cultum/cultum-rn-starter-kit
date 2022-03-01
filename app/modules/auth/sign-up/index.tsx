import * as React from 'react'
// hooks
import { useNavigation } from '@react-navigation/native'
// components
import { Auth } from '@md-modules/auth/shared/components/auth'
// api
import { useSignUpMutation } from '@md-store/middlewares/api/endpoints'
// types
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
// constants
import { PrimaryParamList, ROUTES } from '@md-navigation/constants'

interface FormInputs {
  email: string
  password: string
}

type SignUpScreenProp = NativeStackNavigationProp<PrimaryParamList, 'SIGN_UP'>

const SignUp = () => {
  const navigation = useNavigation<SignUpScreenProp>()

  const [signUpMutation, { isLoading }] = useSignUpMutation()

  const goToLogIn = () => navigation.navigate(ROUTES.auth.LOG_IN)
  const signUp = (data: FormInputs) => signUpMutation({ ...data })

  // TODO: change
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <Auth isSignUp isLoading={isLoading} onFormSubmit={signUp} onNavButtonPress={goToLogIn} />
}

export { SignUp }
