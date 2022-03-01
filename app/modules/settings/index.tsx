import * as React from 'react'
// libs
import * as yup from 'yup'
import styled, { css } from 'styled-components/native'
import { yupResolver } from '@hookform/resolvers/yup'
// hooks
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useCurrentUser, useToast } from '@md-shared/hooks'
// components
import { View } from 'react-native'
import { Button, Text } from '@md-shared/components/ui'
import { FormInput, FromSelect } from '@md-shared/components'
// store
import { updateUser } from '@md-store/modules/user'
// types
import { User } from '@md-shared/types/entities'
// utils
import { omit } from 'lodash'
import { delay } from '@md-shared/utils/delay'

// styled
const Header = styled.View`
  align-items: baseline;
  flex-direction: row;
`

// constants
const DEFAULT_PLACEHOLDER = { label: '', value: '' }
const TEXT_STYLES = { align: 'center' as const, mb: 30 }

const TEXT_OVERRIDES = css`
  flex: 1;
`

const JOBS = [
  { label: 'Manager', value: 'Manager' },
  { label: 'Designer', value: 'designer' },
  { label: 'Developer', value: 'developer' },
]

// types
interface FormInputs {
  // eslint-disable-next-line camelcase
  first_name: string
  // eslint-disable-next-line camelcase
  last_name: string
  email: string
  job: string
}

// validation
const schema = yup.object().shape({
  first_name: yup.string().required('Required'),
  last_name: yup.string().required('Required'),
  email: yup.string().required('Required').nullable().email("E-mail isn't valid"),
  job: yup.string().required('Required'),
})

const Settings = () => {
  const { user } = useCurrentUser()

  const dispatch = useDispatch()

  const { openToast } = useToast()

  const [loading, setLoading] = React.useState(false)

  const { control, handleSubmit } = useForm<FormInputs>({
    defaultValues: { ...omit(user, ['id', 'avatar']) },
    resolver: yupResolver(schema),
  })

  const onFormSubmit = (data: FormInputs) => {
    setLoading(true)
    delay(1000).then(() => {
      dispatch(updateUser(data as User))
      setLoading(false)

      openToast({
        type: 'SUCCESS',
        preset: 'TEMPORARY',
        message: 'Updated successfuly',
      })
    })
  }

  return (
    <View>
      <Header>
        <Text textStyle={TEXT_STYLES} preset={'header'} overrides={TEXT_OVERRIDES}>
          Settings
        </Text>
      </Header>

      <FormInput label={'First Name'} name={'first_name'} control={control} />
      <FormInput label={'Last Name'} name={'last_name'} control={control} />
      <FormInput label={'Email'} name={'email'} control={control} />
      <FromSelect label={'Job'} name={'job'} control={control} options={JOBS} placeholder={DEFAULT_PLACEHOLDER} />
      <Button text={'save'} onPress={handleSubmit(onFormSubmit)} isLoading={loading} />
    </View>
  )
}

export { Settings }
