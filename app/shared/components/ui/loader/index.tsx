import React from 'react'
// libs
import styled from 'styled-components/native'
import { Animated, Easing } from 'react-native'
// types
import { Padding } from '@md-shared/types/css'
import { LoaderPresets, presets } from './presets'
// assets
import LoaderSvg from './svg/loader'

// styled
const Wrapper = styled.View<Padding>`
  ${({ theme }) => theme.template.padding}
`

// types
interface Props {
  preset?: LoaderPresets
  wrapperStyles?: Padding
}

const Loader: React.FC<Props> = ({ wrapperStyles, preset = 'default' }) => {
  const spinAnimation = React.useRef(new Animated.Value(0)).current

  React.useMemo(() => {
    Animated.loop(
      Animated.timing(spinAnimation, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start()
  }, [spinAnimation])

  const rotate = spinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  const loaderStyles = presets[preset]

  const animatedStyle = {
    transform: [{ rotate: rotate ?? '0deg' }],
    width: loaderStyles.width,
    height: loaderStyles.height,
  }

  return (
    <Wrapper {...wrapperStyles}>
      <Animated.View style={animatedStyle}>
        <LoaderSvg {...loaderStyles} />
      </Animated.View>
    </Wrapper>
  )
}

export { Loader }
