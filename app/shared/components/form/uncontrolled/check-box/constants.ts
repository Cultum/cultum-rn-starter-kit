// libs
import { TextStyle, ViewStyle } from 'react-native'
// theme
import { color, spacing } from '@md-shared/theme'

export const ROOT: ViewStyle = {
  flexDirection: 'row',
  paddingVertical: spacing[1],
  alignSelf: 'flex-start',
}

const DIMENSIONS = { width: 16, height: 16 }

export const OUTLINE: ViewStyle = {
  ...DIMENSIONS,
  marginTop: 2, // finicky and will depend on font/line-height/baseline/weather
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: color.primary,
  borderRadius: 1,
}

export const FILL: ViewStyle = {
  width: DIMENSIONS.width - 4,
  height: DIMENSIONS.height - 4,
  backgroundColor: color.primary,
}

export const LABEL: TextStyle = { paddingLeft: spacing[2] }
