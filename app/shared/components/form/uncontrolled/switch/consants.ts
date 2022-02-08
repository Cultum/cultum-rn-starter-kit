// dimensions
import { color } from '@md-shared/theme'
import { ViewStyle } from 'react-native'

const THUMB_SIZE = 30
const WIDTH = 56
const MARGIN = 2
export const OFF_POSITION = -0.5
export const ON_POSITION = WIDTH - THUMB_SIZE - MARGIN
const BORDER_RADIUS = (THUMB_SIZE * 3) / 4

// colors
export const ON_COLOR = color.primary
export const OFF_COLOR = color.palette.offWhite
export const BORDER_ON_COLOR = ON_COLOR
export const BORDER_OFF_COLOR = 'rgba(0, 0, 0, 0.1)'

// animation
export const DURATION = 250

// the track always has these props
export const TRACK = {
  backgroundColor: color.background,
  borderRadius: BORDER_RADIUS,
  borderWidth: MARGIN / 2,
  height: THUMB_SIZE + MARGIN,
  width: WIDTH,
}

// the thumb always has these props
export const THUMB: ViewStyle = {
  backgroundColor: color.background,
  borderColor: BORDER_OFF_COLOR,
  borderRadius: THUMB_SIZE / 2,
  borderWidth: MARGIN / 2,
  elevation: 2,
  height: THUMB_SIZE,
  position: 'absolute',
  shadowColor: BORDER_OFF_COLOR,
  shadowOffset: { width: 1, height: 2 },
  shadowOpacity: 1,
  shadowRadius: 2,
  width: THUMB_SIZE,
}
