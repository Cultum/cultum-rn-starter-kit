import React from 'react'
// libs
import { Image as Img } from 'react-native'
import RNVideo, { VideoProperties } from 'react-native-video'
// components
import { Loader } from '@md-shared/components'
// views
import { LoaderWrapper, VideoWrapper } from './views'
// types
import { BorderRadius } from '@md-shared/utils/borderRadiusHandler'

// types
export interface VideoProps extends VideoProperties {
  width?: number
  height?: number
  borderRadius?: BorderRadius
}

// constants
const VIDEO_STYLE = { width: '100%', height: '100%' }

const photo = require('@md-assets/images/png/photo.png')

const Video: React.FC<VideoProps> = ({ width, height, borderRadius, resizeMode = 'contain', ...rest }) => {
  const [isLoading, setLoading] = React.useState<boolean>(true)
  const [videoOnError, setVideoOnError] = React.useState(false)

  const handleError = () => setVideoOnError(true)
  const handleLoadEnd = () => setLoading(false)
  const handleLoadStart = () => setLoading(true)

  return (
    <VideoWrapper width={width} height={height} borderRadius={borderRadius}>
      {videoOnError ? (
        <Img source={photo} />
      ) : (
        <>
          <RNVideo
            {...rest}
            controls={false}
            style={VIDEO_STYLE}
            onError={handleError}
            onLoad={handleLoadEnd}
            resizeMode={resizeMode}
            onLoadStart={handleLoadStart}
          />

          {isLoading && (
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          )}
        </>
      )}
    </VideoWrapper>
  )
}

export { Video }
