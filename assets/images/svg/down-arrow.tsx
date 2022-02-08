import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { palette } from '@md-shared/theme/palette'

interface DownArrowSvgProps {
  color?: string
  width?: number
  height?: number
}

const DownArrowSvg: React.FC<DownArrowSvgProps> = ({ color = palette.blue500, width = 12, height = 7 }) => (
  <Svg width={width} height={height} viewBox='0 0 15 9' fill='none'>
    <Path d='M13.5 1L7.25 7.25 1 1' stroke={color} strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' />
  </Svg>
)

export default DownArrowSvg
