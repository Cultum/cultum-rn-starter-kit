// libs
import styled from 'styled-components/native'
// types
import { Margin } from '@md-shared/types/css'
// helpers
import { getMarginStyle } from '@md-shared/helpers/styled'

export type WrapperStyle = Margin

export interface InputStyle {
  fs?: number
}

export const TextInput = styled.TextInput<{
  isValid?: boolean
  withIcon: boolean
  inputStyle?: InputStyle
}>`
  background-color: ${({ theme }) => theme.color.palette.white};
  border: 1px solid ${({ theme }) => theme.color.palette.gray200};
  border-color: ${({ isValid, theme }) => (isValid ? theme.color.palette.gray200 : theme.color.palette.red500)};
  border-radius: 4px;
  color: ${({ theme, isValid }) => (isValid ? theme.color.palette.gray800 : theme.color.palette.red500)};
  flex: 1;
  font-size: ${({ theme, inputStyle }) => inputStyle?.fs ?? theme.spacing[4]}px;
  padding: ${({ theme }) => theme.spacing[4]}px;

  ${({ withIcon }) => withIcon && 'padding-right: 40px'};
`

export const Wrapper = styled.View<{ wrapperStyle?: WrapperStyle }>`
  ${({ wrapperStyle }) => wrapperStyle && getMarginStyle('wrapperStyle')};
`

export const IconWrapper = styled.View`
  position: absolute;
  right: 10px;
`

export const InnerWrapper = styled.View`
  height: 50px;
  justify-content: center;
`
