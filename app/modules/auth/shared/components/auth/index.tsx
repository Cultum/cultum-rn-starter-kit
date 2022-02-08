import * as React from 'react'
// libs
import * as yup from 'yup'
import styled from 'styled-components/native'
import { yupResolver } from '@hookform/resolvers/yup'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
// hooks
import { useForm } from 'react-hook-form'
import { useToast } from '@md-shared/hooks'
import { useDispatch } from 'react-redux'
// components
import { AuthRedirect } from '@md-modules/auth/shared/components/auth-redirect'
import { Button, Text, FormInput } from '@md-shared/components'
// helpers
import {
  ClientError,
  RequestError,
  ClientSuccess,
  isClientError,
  isClientSuccess,
  getRequestErrorMessage,
} from '@md-shared/services/api'
// store
import * as API from '@md-store/modules/api'
import { setAuthorizedAction, setUserAction } from '@md-store/modules/profile'
// storage
import { storageManager } from '@md-shared/utils/storage'
// types
import { ThunkDispatch } from '@md-store/helpers'
import { LogInResponse, SignUpResponse } from '@md-shared/services/api/controllers'

// styled
const Wrapper = styled.View`
  flex-direction: column;
  flex: 1;
  justify-content: center;
`

// constants
const BUTTON_STYLES = { mt: 20 }
const HEADER_TEXT_STYLES = { align: 'center' as const, mb: 30 }

// types
interface Props {
  isSignUp?: boolean
  isLoading: boolean
  onNavButtonPress: () => void
  onFormSubmit: (data: FormInputs) => Promise<ClientSuccess<SignUpResponse | LogInResponse> | ClientError<RequestError>>
}

interface FormInputs {
  email: string
  password: string
}

// validation
const schema = yup.object().shape({
  email: yup.string().required('Required').nullable().email("E-mail isn't valid"),
  password: yup.string().min(6, 'Min length 6 characters').required('Required'),
})

const Auth: React.FC<Props> = ({ isSignUp = false, isLoading, onFormSubmit, onNavButtonPress }) => {
  const dispatch = useDispatch<ThunkDispatch>()

  const { openToast } = useToast()

  const { control, handleSubmit } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: FormInputs) => {
    Keyboard.dismiss()

    const res = await onFormSubmit({ password: data.password, email: 'byron.fields@reqres.in' })

    if (isClientSuccess(res)) {
      const { token } = res.data

      if ('id' in res.data) {
        const userRes = await dispatch(API.user.getUser.performAPIGetUser({ id: res.data.id }))

        if (isClientSuccess(userRes)) {
          dispatch(setUserAction(userRes.data.data))
        }
      }

      await storageManager.setAuthToken(token)
      dispatch(setAuthorizedAction(Boolean(token)))
    }

    if (isClientError(res)) {
      openToast({
        type: 'ERROR',
        preset: 'TEMPORARY',
        message: getRequestErrorMessage(res.error),
      })
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Wrapper>
        <Text textStyle={HEADER_TEXT_STYLES} preset={'screenHeader'}>
          {isSignUp ? 'Sign Up' : 'Log In'}
        </Text>
        <FormInput control={control} label={'email'} name={'email'} />
        <FormInput control={control} label={'password'} name={'password'} secureTextEntry />
        <Button
          isLoading={isLoading}
          buttonStyle={BUTTON_STYLES}
          onPress={handleSubmit(onSubmit)}
          text={isSignUp ? 'Sign Up' : 'Log In'}
        />

        <AuthRedirect isSignUp={isSignUp} onNavButtonPress={onNavButtonPress} />
      </Wrapper>
    </TouchableWithoutFeedback>
  )
}

export { Auth }
