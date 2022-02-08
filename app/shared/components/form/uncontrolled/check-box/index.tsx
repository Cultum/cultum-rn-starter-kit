import * as React from 'react'
// libs
import { TouchableOpacity, View, ViewStyle, StyleProp } from 'react-native'
// components
import { Text } from '@md-shared/components'
// constants
import { FILL, LABEL, OUTLINE, ROOT } from '@md-shared/components/form/uncontrolled/check-box/constants'

export interface CheckboxProps {
  text?: string
  value?: boolean
  style?: StyleProp<ViewStyle>
  onToggle?: (newValue: boolean) => void
  fillStyle?: StyleProp<ViewStyle>
  multiline?: boolean
  outlineStyle?: StyleProp<ViewStyle>
}

const Checkbox: React.FC<CheckboxProps> = ({ text, style, value, multiline, fillStyle, outlineStyle, onToggle }) => {
  const numberOfLines = multiline ? 0 : 1

  const onPress = () => onToggle?.(!value)

  return (
    <TouchableOpacity activeOpacity={1} disabled={!onToggle} onPress={onPress} style={[ROOT, style]}>
      <View style={[OUTLINE, outlineStyle]}>{value && <View style={[FILL, fillStyle]} />}</View>
      <Text text={text} numberOfLines={numberOfLines} style={LABEL} />
    </TouchableOpacity>
  )
}

export { Checkbox }
