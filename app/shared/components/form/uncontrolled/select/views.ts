import styled, { css } from 'styled-components/native'
// typew
import { Margin } from '@md-shared/types/css'
// theme
import { theme } from '@md-shared/theme'
// helpers
import { getMarginStyle } from '@md-shared/helpers/styled'

export type WrapperStyle = Margin

export const Wrapper = styled.View<{
  wrapperStyle?: WrapperStyle
}>`
  ${({ wrapperStyle }) => wrapperStyle && getMarginStyle('wrapperStyle')};
`

export const PickerWrapper = styled.View<{ isValid: boolean }>`
  width: 100%;
  height: 56px;
  border-width: 1px;
  border-radius: 4px;
  border-color: ${({ isValid, theme }) => (isValid ? theme.color.palette.gray200 : theme.color.palette.red500)};
  ${({ theme }) => theme.template.centerContent};
`

export const labelTextOverrides = css`
  margin-bottom: ${theme.spacing[1]}px;
`
