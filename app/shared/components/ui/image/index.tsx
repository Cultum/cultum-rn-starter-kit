import React from 'react'
import { Image as RNImage, Animated } from 'react-native'
// components
import { Loader } from '@md-shared/components'
// views
import { FastImageExt, LoaderWrapper, ImageWrapper } from './views'
// types
import { StyledCss } from '@md-shared/types/helpers'
import { BorderRadius } from '@md-shared/utils/borderRadiusHandler'
import { FastImageProps } from 'react-native-fast-image'
import { LoaderPresets } from '@md-shared/components/ui/loader/presets'

const photo = require('@md-assets/images/png/photo.png')

export interface ImageProps extends FastImageProps {
  width?: number
  height?: number
  borderRadius?: BorderRadius
  loaderPreset?: LoaderPresets
  wrapperStyles?: StyledCss
}

const Image: React.FC<ImageProps> = ({ width, height, source, borderRadius, wrapperStyles, ...rest }) => {
  const [isError, setIsError] = React.useState(false)

  const animation = React.useRef(new Animated.Value(0)).current
  const animatedOpacity = { opacity: animation }

  const fadeIn = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }

  const fadeOut = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }

  React.useEffect(() => {
    if (typeof source !== 'number') {
      setIsError(!source?.uri)
    }
  }, [source])

  const handleLoadEnd = () => fadeOut()
  const handleLoadStart = () => fadeIn()
  const handleError = () => setIsError(true)

  return (
    <ImageWrapper width={width} height={height} isError={isError} overrides={wrapperStyles} borderRadius={borderRadius}>
      {isError ? (
        <RNImage source={photo} />
      ) : (
        <>
          <FastImageExt
            {...rest}
            source={source}
            onError={handleError}
            onLoadEnd={handleLoadEnd}
            onLoadStart={handleLoadStart}
          />

          <LoaderWrapper style={animatedOpacity}>
            <Loader preset={'default'} />
          </LoaderWrapper>
        </>
      )}
    </ImageWrapper>
  )
}

export { Image }
