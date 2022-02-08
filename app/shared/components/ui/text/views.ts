// libs
import styled from 'styled-components/native'
// themes
import { palette } from '@md-shared/theme/palette'
// types
import { StyledCss } from '@md-shared/types/helpers'
import { TextPresets, presets } from './presets'
import { TextAlign, Padding, Margin } from '@md-shared/types/css'

export interface TextStyle {
  fs?: number
  fw?: string
  lh?: number
  align?: TextAlign
  color?: keyof typeof palette
}

export type TextStyleProps = TextStyle & Padding & Margin

export const RNText = styled.Text<{
  preset?: TextPresets
  overrides?: StyledCss
  textStyle?: TextStyleProps
}>`
  font-family: ${({ theme }) => theme.typography.primary};
  font-size: ${({ theme, textStyle }) => textStyle?.fs ?? theme.spacing[4]}px;

  ${({ textStyle }) => (textStyle?.fw ? `font-weight: ${textStyle?.fw}` : null)};
  ${({ textStyle }) => (textStyle?.lh ? `line-height: ${textStyle?.lh}px` : null)};

  color: ${({ theme, textStyle }) => (textStyle?.color ? theme.color.palette[textStyle?.color] : theme.color.text)};

  padding-left: ${({ textStyle }) => textStyle?.pl ?? 0}px;
  padding-top: ${({ textStyle }) => textStyle?.pt ?? 0}px;
  padding-right: ${({ textStyle }) => textStyle?.pr ?? 0}px;
  padding-bottom: ${({ textStyle }) => textStyle?.pb ?? 0}px;

  margin-left: ${({ textStyle }) => textStyle?.ml ?? 0}px;
  margin-top: ${({ textStyle }) => textStyle?.mt ?? 0}px;
  margin-right: ${({ textStyle }) => textStyle?.mr ?? 0}px;
  margin-bottom: ${({ textStyle }) => textStyle?.mb ?? 0}px;

  text-align: ${({ textStyle }) => textStyle?.align ?? 'left'};

  ${({ preset }) => preset && presets[preset]};
  ${({ overrides }) => overrides && overrides};
`
