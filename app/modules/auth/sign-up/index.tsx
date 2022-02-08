import * as React from 'react'
// hooks
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
// components
import { Auth } from '@md-modules/auth/shared/components/auth'
// store
import * as API from '@md-store/modules/api'
// types
import { RootStore } from '@md-store/modules'
import { ThunkDispatch } from '@md-store/helpers'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
// constants
import { PrimaryParamList, ROUTES } from '@md-navigation/constants'

interface FormInputs {
  email: string
  password: string
}

type SignUpScreenProp = NativeStackNavigationProp<PrimaryParamList, 'SIGN_UP'>

const SignUp = () => {
  const dispatch = useDispatch<ThunkDispatch>()
  const navigation = useNavigation<SignUpScreenProp>()

  const isLoading = useSelector<RootStore, RootStore['api']['auth']['signUp']['loading']>(
    (state) => state.api.auth.signUp.loading,
  )

  const goToLogIn = () => navigation.navigate(ROUTES.auth.LOG_IN)

  const signUp = (data: FormInputs) => dispatch(API.auth.signUp.performAPISignUp({ ...data }))

  return <Auth isSignUp isLoading={isLoading} onFormSubmit={signUp} onNavButtonPress={goToLogIn} />
}

export { SignUp }
