import { css } from 'styled-components/native'

export type BorderRadius = number | [number, number, number, number]

export const handleBorderRadius = (borderRadius: BorderRadius = 0) => {
  return typeof borderRadius === 'object'
    ? css`
        border-radius: ${borderRadius[0]}px;
        border-top-left-radius: ${borderRadius[0]}px;
        border-top-right-radius: ${borderRadius[1]}px;
        border-bottom-right-radius: ${borderRadius[2]}px;
        border-bottom-left-radius: ${borderRadius[3]}px;
      `
    : css`
        border-radius: ${borderRadius}px;
      `
}
