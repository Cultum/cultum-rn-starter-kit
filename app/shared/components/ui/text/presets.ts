import { css } from 'styled-components/native'

export const presets = {
  bold: css`
    font-family: ${({ theme }) => theme.typography.primaryMedium};
    font-weight: 500;
  `,
  header: css`
    font-family: ${({ theme }) => theme.typography.primaryBold};
    font-weight: 700;
    font-size: 18px;
  `,
  screenHeader: css`
    font-family: ${({ theme }) => theme.typography.primaryBold};
    font-weight: 700;
    font-size: 30px;
    line-height: 34px;
  `,
  fieldLabel: css`
    font-family: ${({ theme }) => theme.typography.primaryMedium};
    font-weight: 500;
    font-size: 12px;
    text-transform: uppercase;
    margin-bottom: 4px;
    line-height: 23px;
  `,
  inputError: css`
    font-size: 14px;
    color: ${({ theme }) => theme.color.error};
  `,
  secondary: css`
    font-size: 14px;
    color: ${({ theme }) => theme.color.dim};
  `,
  link: css`
    color: ${({ theme }) => theme.color.palette.blue500};
    font-weight: 500;
  `,
}

export type TextPresets = keyof typeof presets
