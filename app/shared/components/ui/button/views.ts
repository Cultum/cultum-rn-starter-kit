// libs
import styled, { css } from 'styled-components/native'
// types
import { Margin } from '@md-shared/types/css'
import { StyledCss } from '@md-shared/types/helpers'
import { ButtonPresets, buttonPresets } from './presets'
// utils
import { isNumber } from 'lodash'
import { getMarginStyle } from '@md-shared/helpers/styled'

export interface WrapperStyle {
  pt?: number
  pr?: number
  pb?: number
  pl?: number
  width?: string
  height?: string
}

export type ButtonStyle = WrapperStyle & Margin

export const Wrapper = styled.TouchableOpacity<{
  buttonStyle?: ButtonStyle
  preset?: ButtonPresets
  overrides?: StyledCss
  disabled?: boolean | null
}>`
  border-radius: 4px;
  flex-direction: row;
  position: relative;

  padding-left: ${({ buttonStyle, theme }) => (isNumber(buttonStyle?.pl) ? buttonStyle?.pl : theme.spacing[4])}px;
  padding-top: ${({ buttonStyle, theme }) => (isNumber(buttonStyle?.pt) ? buttonStyle?.pt : theme.spacing[4])}px;
  padding-right: ${({ buttonStyle, theme }) => (isNumber(buttonStyle?.pr) ? buttonStyle?.pr : theme.spacing[4])}px;
  padding-bottom: ${({ buttonStyle, theme }) => (isNumber(buttonStyle?.pb) ? buttonStyle?.pb : theme.spacing[4])}px;

  ${({ buttonStyle }) =>
    buttonStyle?.width &&
    css`
      width: ${buttonStyle.width};
    `};

  ${({ buttonStyle }) =>
    buttonStyle?.height &&
    css`
      height: ${buttonStyle.height};
    `};

  ${({ theme }) => theme.template.centerContent};
  ${({ preset }) => preset && buttonPresets[preset]};
  ${({ buttonStyle }) => buttonStyle && getMarginStyle('buttonStyle')};

  ${({ overrides }) => overrides && overrides};
`

export const InnerWrapper = styled.View`
  align-content: center;
  flex-direction: row;
  position: relative;
`

export const LoaderWrapper = styled.View`
  height: 30px;
  position: absolute;
  right: -40px;
  top: -5px;
  width: 30px;
`
