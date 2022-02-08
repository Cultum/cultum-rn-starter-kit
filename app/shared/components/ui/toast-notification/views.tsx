// libs
import styled, { css } from 'styled-components/native'
import { Animated } from 'react-native'
// types
import { NotificationType } from '@md-shared/components/ui'

export const InnerWrapper = styled(Animated.View)<{ type: NotificationType }>`
  border-radius: 13px;
  min-height: 72px;

  ${({ type }) => {
    switch (type) {
      case 'ERROR':
        return css`
          background-color: ${({ theme }) => theme.color.error};
        `
      case 'SUCCESS':
        return css`
          background-color: #86cc44;
        `
      case 'WARNING':
        return css`
          background-color: ${({ theme }) => theme.color.palette.orange200};
        `
      case 'INFO':
        return css`
          background-color: #7c7c7c;
        `
    }
  }};
`

export const Wrapper = styled.View<{ top?: number }>`
  align-items: center;
  background-color: ${({ theme }) => theme.color.transparent};
  left: 0;
  position: absolute;
  right: 0;
  top: ${({ top = 0 }) => top}px;
  z-index: 999999;
`

export const TouchableOpacityExt = styled.TouchableOpacity`
  flex: 1;
  ${({ theme }) => theme.template.centerContent};
`

export const AnimatedText = styled(Animated.Text)`
  color: ${({ theme }) => theme.color.palette.white};
  font-family: ${({ theme }) => theme.typography.primaryMedium};
  text-align: center;
  font-weight: 500;
`
