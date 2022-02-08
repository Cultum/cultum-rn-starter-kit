import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { palette } from '@md-shared/theme/palette'

interface CloseSvg {
  color?: string
  width?: number
  height?: number
}

const CloseSvg: React.FC<CloseSvg> = ({ color, width, height }) => (
  <Svg width={width || 18} height={height || 18} fill='none' viewBox='0 0 18 18'>
    <Path
      fill={color || palette.blue900}
      d='M10.6491 9.01472L17.6579 2.00567C18.1141 1.54976 18.1141 0.812613 17.6579 0.356703C17.202 -0.099207 16.4649 -0.099207 16.009 0.356703L8.99991 7.36576L1.99106 0.356703C1.53493 -0.099207 0.798004 -0.099207 0.342093 0.356703C-0.114031 0.812613 -0.114031 1.54976 0.342093 2.00567L7.35095 9.01472L0.342093 16.0238C-0.114031 16.4797 -0.114031 17.2168 0.342093 17.6727C0.569301 17.9002 0.868045 18.0144 1.16658 18.0144C1.46511 18.0144 1.76364 17.9002 1.99106 17.6727L8.99991 10.6637L16.009 17.6727C16.2364 17.9002 16.5349 18.0144 16.8335 18.0144C17.132 18.0144 17.4305 17.9002 17.6579 17.6727C18.1141 17.2168 18.1141 16.4797 17.6579 16.0238L10.6491 9.01472Z'
    />
  </Svg>
)

export default CloseSvg
