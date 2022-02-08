import React from 'react'
// types
import { TextInputProps } from 'react-native'
// theme
import { color } from '@md-shared/theme'
// components
import { Text, ErrorMessage } from '@md-shared/components'
// views
import { TextInput, IconWrapper, InnerWrapper, Wrapper, InputStyle, WrapperStyle } from './views'

export interface InputProps extends TextInputProps {
  icon?: React.ReactElement
  label?: string
  errorText?: string
  isInvalid?: boolean
  inputStyle?: InputStyle
  placeholder?: string
  forwardedRef?: any
  wrapperStyle?: WrapperStyle
}

const Input: React.FC<InputProps> = ({
  icon,
  label,
  errorText,
  isInvalid = false,
  placeholder,
  forwardedRef,
  wrapperStyle,
  ...rest
}) => {
  return (
    <Wrapper wrapperStyle={wrapperStyle}>
      {label && <Text preset={'fieldLabel'} text={label} />}
      <InnerWrapper>
        <TextInput
          withIcon={!!icon}
          ref={forwardedRef}
          isValid={!isInvalid}
          placeholder={placeholder}
          underlineColorAndroid={color.transparent}
          placeholderTextColor={color.palette.gray200}
          {...rest}
        />
        {icon && <IconWrapper>{icon}</IconWrapper>}
      </InnerWrapper>
      <ErrorMessage errorText={errorText} />
    </Wrapper>
  )
}

export { Input }
