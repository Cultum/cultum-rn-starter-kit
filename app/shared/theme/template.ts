import { css } from 'styled-components'
import { Padding, Margin } from '@md-shared/types/css'

export const template = {
  absolute: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  `,
  centerContent: css`
    align-items: center;
    justify-content: center;
  `,
  centerItems: css`
    align-items: center;
  `,
  fullWH: css`
    width: 100%;
    height: 100%;
  `,
  fullW: css`
    width: 100%;
  `,
  shadow: css`
    background: ${({ theme }) => theme.color.palette.white};
    elevation: 5;
    shadow-color: black;
    shadow-offset: 0 0;
    shadow-opacity: 0.12;
    shadow-radius: 4px;
  `,
  padding: css<Padding>`
    padding-left: ${({ pl }) => pl ?? 0}px;
    padding-top: ${({ pt }) => pt ?? 0}px;
    padding-right: ${({ pr }) => pr ?? 0}px;
    padding-bottom: ${({ pb }) => pb ?? 0}px;
  `,
  margin: css<Margin>`
    margin-left: ${({ ml }) => ml ?? 0}px;
    margin-top: ${({ mt }) => mt ?? 0}px;
    margin-right: ${({ mr }) => mr ?? 0}px;
    margin-bottom: ${({ mb }) => mb ?? 0}px;
  `,
}
