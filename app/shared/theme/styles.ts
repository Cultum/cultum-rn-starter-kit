import { ViewStyle } from 'react-native'
import { color } from './color'
import { spacing } from './spacing'

const SCREEN_CONTAINER: ViewStyle = {
  backgroundColor: color.backgroundContent,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[1],
  paddingBottom: spacing[4],
}

export const styles = {
  SCREEN_CONTAINER,
}
