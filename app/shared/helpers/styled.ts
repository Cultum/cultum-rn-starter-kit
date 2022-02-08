import { css } from 'styled-components/native'
import { StyledCss } from '@md-shared/types/helpers'
import { Margin, Padding } from '@md-shared/types/css'

export const getMarginStyle = <P extends string>(key: P): StyledCss => css<{
  [k in P]?: Margin
}>`
  margin-left: ${({ [key]: textStyle }) => (textStyle as any)?.ml ?? 0}px;
  margin-top: ${({ [key]: textStyle }) => (textStyle as any)?.mt ?? 0}px;
  margin-right: ${({ [key]: textStyle }) => (textStyle as any)?.mr ?? 0}px;
  margin-bottom: ${({ [key]: textStyle }) => (textStyle as any)?.mb ?? 0}px;
`

export const getPaddingStyle = <P extends string>(key: P): StyledCss => css<{
  [k in P]?: Padding
}>`
  padding-left: ${({ [key]: textStyle }) => (textStyle as any)?.pl ?? 0}px;
  padding-top: ${({ [key]: textStyle }) => (textStyle as any)?.pt ?? 0}px;
  padding-right: ${({ [key]: textStyle }) => (textStyle as any)?.pr ?? 0}px;
  padding-bottom: ${({ [key]: textStyle }) => (textStyle as any)?.pb ?? 0}px;
`
