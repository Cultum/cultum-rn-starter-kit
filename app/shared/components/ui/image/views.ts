// libs
import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import { Animated } from 'react-native'
// types
import { StyledCss } from '@md-shared/types/helpers'
// utils
import { BorderRadius, handleBorderRadius } from '@md-shared/utils/borderRadiusHandler'

interface ImageWrapper {
  width?: number
  height?: number
  isError: boolean
  overrides?: StyledCss
  borderRadius?: BorderRadius
}

export const ImageWrapper = styled.View<ImageWrapper>`
  overflow: hidden;
  position: relative;
  background-color: ${({ theme, isError }) => (isError ? theme.color.palette.gray150 : theme.color.palette.white)};

  ${({ height, width }) => Boolean(!height && !width) && `flex: 1`};
  ${({ theme }) => theme.template.centerContent};
  ${({ height }) => height && `height: ${height}px`};
  ${({ width }) => width && `width: ${width}px`};
  ${({ borderRadius }) => handleBorderRadius(borderRadius)};
  ${({ overrides }) => overrides && overrides};
`

export const LoaderWrapper = styled(Animated.View)`
  background-color: rgba(225, 229, 239, 0.5);
  position: absolute;

  ${({ theme }) => theme.template.fullWH};
  ${({ theme }) => theme.template.centerContent};
`

export const FastImageExt = styled(FastImage)`
  ${({ theme }) => theme.template.fullWH};
`
