import * as React from 'react'
// libs
import * as yup from 'yup'
import styled from 'styled-components/native'
import { yupResolver } from '@hookform/resolvers/yup'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
// hooks
import { useForm } from 'react-hook-form'
import { useToast } from '@md-shared/hooks'
import { useAppDispatch } from '@md-store'
// components
import { AuthRedirect } from '@md-modules/auth/shared/components/auth-redirect'
import { Button, Text, FormInput } from '@md-shared/components'
// store
import { setAuthorized, setUser } from '@md-store/modules/user'
// utils
import { storageManager } from '@md-shared/utils/storage'
// api
import { LogInResponse, SignUpResponse, useLazyGetUserQuery } from '@md-store/middlewares/api/endpoints'

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
  onFormSubmit: (data: FormInputs) => Promise<SignUpResponse> | Promise<LogInResponse>
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
  const dispatch = useAppDispatch()

  const { openToast } = useToast()

  const [getUser] = useLazyGetUserQuery()

  const { control, handleSubmit } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: FormInputs) => {
    Keyboard.dismiss()
    try {
      const res = await onFormSubmit({ password: data.password, email: 'byron.fields@reqres.in' })

      if (res) {
        let userId = '9'

        if ('id' in res.data) {
          userId = res.data?.id
        }

        const userRes = await getUser({ id: userId })

        if (userRes.data) {
          dispatch(setUser(userRes.data))
        }

        await storageManager.setAuthToken(res.data.token)
        dispatch(setAuthorized(Boolean(res.data.token)))
      }

      // TODO: add error types
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (res.error) {
        openToast({
          type: 'ERROR',
          preset: 'TEMPORARY',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          message: res.error.data.error,
        })
      }
    } catch (e) {
      openToast({
        type: 'ERROR',
        preset: 'TEMPORARY',
        message: e.message,
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
