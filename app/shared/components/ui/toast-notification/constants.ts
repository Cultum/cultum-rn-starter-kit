// libs
import { Dimensions } from 'react-native'
// theme
import { spacing } from '@md-shared/theme'

const { width } = Dimensions.get('window')

export const TOASTER_DISPLAY_DURATION = 3000
export const BOUNCE_DURATION = 300

const DEFAULT_INPUT_RANGE = [0, 1]

export const ANIMATED_STYLES = {
  height: {
    inputRange: DEFAULT_INPUT_RANGE,
    outputRange: [30, 42],
  },
  width: {
    inputRange: DEFAULT_INPUT_RANGE,
    outputRange: [width - spacing[6] * 2, width - spacing[6]],
  },
}

export const TEXT_SIZE = {
  inputRange: DEFAULT_INPUT_RANGE,
  outputRange: [12, 16],
}
