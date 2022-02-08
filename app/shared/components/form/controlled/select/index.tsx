import * as React from 'react'
// components
import { Select, SelectProps } from '@md-shared/components'
// types
import { Control, Controller } from 'react-hook-form'

const WRAPPER_STYLE = { mb: 12 }

interface Props extends SelectProps {
  name: string
  control: Control<any>
  defaultValue?: string
}

const FromSelect: React.FC<Props> = ({ name, control, defaultValue = '', ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Select
          {...rest}
          isInvalid={!!error}
          defaultValue={value}
          errorText={error?.message}
          wrapperStyle={WRAPPER_STYLE}
          onSelectChange={(value) => onChange(value)}
        />
      )}
    />
  )
}

export { FromSelect }
