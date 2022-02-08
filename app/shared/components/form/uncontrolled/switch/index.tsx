import React from 'react'
// libs
import { ViewStyle, Animated, Easing, StyleProp, TouchableWithoutFeedback } from 'react-native'
// constants
import {
  THUMB,
  TRACK,
  DURATION,
  ON_COLOR,
  OFF_COLOR,
  OFF_POSITION,
  ON_POSITION,
  BORDER_ON_COLOR,
  BORDER_OFF_COLOR,
} from '@md-shared/components/form/uncontrolled/switch/consants'

export interface SwitchProps {
  value: boolean
  style?: StyleProp<ViewStyle>
  onToggle?: (newValue: boolean) => void
  trackOnStyle?: StyleProp<ViewStyle>
  thumbOnStyle?: StyleProp<ViewStyle>
  trackOffStyle?: StyleProp<ViewStyle>
  thumbOffStyle?: StyleProp<ViewStyle>
}

const makeAnimatedValue = (switchOn) => new Animated.Value(switchOn ? 1 : 0)

const Switch: React.FC<SwitchProps> = ({
  value,
  style,
  onToggle,
  trackOnStyle,
  thumbOnStyle,
  trackOffStyle,
  thumbOffStyle,
}) => {
  const [timer] = React.useState<Animated.Value>(makeAnimatedValue(value))
  const [previousValue, setPreviousValue] = React.useState(value)

  const startAnimation = React.useMemo(
    () => (newValue: boolean) => {
      const toValue = newValue ? 1 : 0
      const easing = Easing.out(Easing.circle)
      Animated.timing(timer, {
        toValue,
        duration: DURATION,
        easing,
        useNativeDriver: true,
      }).start()
    },
    [timer],
  )

  React.useEffect(() => {
    if (value !== previousValue) {
      startAnimation(value)
      setPreviousValue(value)
    }
  }, [value])

  const handlePress = React.useMemo(() => () => onToggle && onToggle(!value), [onToggle, value])

  if (!timer) {
    return null
  }

  const translateX = timer.interpolate({
    inputRange: [0, 1],
    outputRange: [OFF_POSITION, ON_POSITION],
  })

  const trackStyle = [
    TRACK,
    {
      backgroundColor: value ? ON_COLOR : OFF_COLOR,
      borderColor: value ? BORDER_ON_COLOR : BORDER_OFF_COLOR,
    },
    value ? trackOnStyle : trackOffStyle,
  ]

  const thumbStyle = [
    THUMB,
    {
      transform: [{ translateX }],
    },
    value ? thumbOnStyle : thumbOffStyle,
  ]

  return (
    <TouchableWithoutFeedback onPress={handlePress} style={style}>
      <Animated.View style={trackStyle}>
        <Animated.View style={thumbStyle} />
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

export { Switch }
