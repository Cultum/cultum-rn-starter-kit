// libs
import { css } from 'styled-components'
// types
import { StyledCss } from '@md-shared/types/helpers'

export const buttonPresets = {
  default: css<{ disabled?: boolean }>`
    background-color: ${({ theme, disabled }) => (disabled ? theme.color.palette.blue200 : theme.color.primary)};
    height: 54px;
  `,
  link: css`
    align-items: flex-start;
    background-color: transparent;
    justify-content: flex-start;
    padding: 0;
  `,
}

type TextPresets = { [key in keyof typeof buttonPresets]: StyledCss }

export const textPresets: TextPresets = {
  default: css`
    color: ${({ theme }) => theme.color.palette.white};
    font-family: ${({ theme }) => theme.typography.primaryMedium};
    font-size: 16px;
    font-weight: 500;
    text-transform: uppercase;
  `,
  link: css`
    color: ${({ theme }) => theme.color.primary};
    font-family: ${({ theme }) => theme.typography.primaryMedium};
    font-weight: 500;
    padding: 0;
    text-decoration-color: ${({ theme }) => theme.color.primary};
    text-decoration-line: underline;
    text-decoration-style: solid;
  `,
}

export type ButtonPresets = keyof typeof buttonPresets
export type ButtonTextPresets = keyof typeof textPresets
