import * as React from 'react'
// libs
import { Control, Controller } from 'react-hook-form'
// components
import { Input, InputProps } from '@md-shared/components'

const WRAPPER_STYLE = { mb: 12 }

export interface FormInputProps extends InputProps {
  name: string
  control: Control<any>
  defaultValue?: string
  handleOnBlur?: () => void
  handleOnChange?: (value?: string) => void
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  control,
  defaultValue = '',
  handleOnBlur,
  handleOnChange,
  ...rest
}) => {
  const handleOnFieldChange = (text, formEventHandler) => {
    formEventHandler(text)
    handleOnChange?.(text)
  }

  const handleOnFieldBlur = (formEventHandler) => {
    formEventHandler()
    handleOnBlur?.()
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <Input
          value={value}
          isInvalid={!!error}
          returnKeyType={'done'}
          autoCapitalize={'none'}
          errorText={error?.message}
          wrapperStyle={WRAPPER_STYLE}
          onBlur={() => handleOnFieldBlur(onBlur)}
          onChangeText={(text) => handleOnFieldChange(text, onChange)}
          {...rest}
        />
      )}
    />
  )
}

export { FormInput }
