// libs
import styled from 'styled-components/native'
// utils
import { handleBorderRadius, BorderRadius } from '@md-shared/utils/borderRadiusHandler'

interface VideoWrapper {
  width?: number
  height?: number
  borderRadius?: BorderRadius
}

export const VideoWrapper = styled.View<VideoWrapper>`
  background-color: ${({ theme }) => theme.color.palette.gray150};
  flex: 1;
  overflow: hidden;
  position: relative;

  ${({ theme }) => theme.template.centerContent};
  ${({ height }) => height && `height: ${height}px`};
  ${({ width }) => width && `width: ${width}px`};
  ${({ borderRadius }) => handleBorderRadius(borderRadius)};
`

export const LoaderWrapper = styled.View`
  background-color: ${({ theme }) => theme.color.palette.gray150};
  position: absolute;

  ${({ theme }) => theme.template.fullWH};
  ${({ theme }) => theme.template.centerContent};
`
