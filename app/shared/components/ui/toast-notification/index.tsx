import * as React from 'react'
// libs
import { Animated, Easing } from 'react-native'
// hooks
import { useToast } from '@md-shared/hooks'
// views
import { Wrapper, InnerWrapper, AnimatedText, TouchableOpacityExt } from './views'
// constants
import { TEXT_SIZE, BOUNCE_DURATION, ANIMATED_STYLES, TOASTER_DISPLAY_DURATION } from './constants'

export type NotificationType = 'ERROR' | 'SUCCESS' | 'WARNING' | 'INFO'
export type NotificationPresets = 'TEMPORARY' | 'CONSTANT'

interface Props {
  top?: number
}

const ToastNotification: React.FC<Props> = ({ top }) => {
  const { hideToast, toastData, resetToastData } = useToast()

  const [isToastVisible, handleVisibleChange] = React.useState(false)

  const bounceAnim = React.useRef(new Animated.Value(0)).current

  // bounce animation for elements
  const startBounceAnimation = (isOutAnimation = false) => {
    bounceAnim.setValue(isOutAnimation ? 1 : 0)

    Animated.timing(bounceAnim, {
      useNativeDriver: false,
      duration: BOUNCE_DURATION,
      toValue: isOutAnimation ? 0 : 1,
      easing: isOutAnimation ? Easing.out(Easing.ease) : Easing.in(Easing.ease),
    }).start()
  }

  React.useEffect(() => {
    if (toastData.open) {
      handleVisibleChange(true)
    }
  }, [toastData.open])

  React.useEffect(
    () => {
      let hideToastTimeout

      if (!toastData.open && isToastVisible) {
        startBounceAnimation(true)

        hideToastTimeout = setTimeout(() => {
          handleVisibleChange(false)
          resetToastData()
        }, BOUNCE_DURATION)
      }

      return () => {
        hideToastTimeout && clearTimeout(hideToastTimeout)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isToastVisible, toastData.open],
  )

  React.useEffect(
    () => {
      if (isToastVisible) {
        startBounceAnimation()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isToastVisible],
  )

  React.useEffect(
    () => {
      let hideToastTimeout

      if (toastData.preset === 'TEMPORARY' && isToastVisible) {
        hideToastTimeout = setTimeout(() => {
          hideToast()
        }, TOASTER_DISPLAY_DURATION)
      }

      return () => {
        hideToastTimeout && clearTimeout(hideToastTimeout)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isToastVisible],
  )

  const animatedViewStyle = {
    opacity: bounceAnim,
    height: bounceAnim.interpolate(ANIMATED_STYLES.height),
    width: bounceAnim.interpolate(ANIMATED_STYLES.width),
  }

  const animatedTextStyles = {
    opacity: bounceAnim,
    fontSize: bounceAnim.interpolate(TEXT_SIZE),
  }

  if (!isToastVisible) {
    return null
  }

  return (
    <Wrapper top={top}>
      <InnerWrapper style={animatedViewStyle} type={toastData.type}>
        <TouchableOpacityExt onPress={toastData.onPress} activeOpacity={0.5}>
          <AnimatedText style={animatedTextStyles}>{toastData.message}</AnimatedText>
        </TouchableOpacityExt>
      </InnerWrapper>
    </Wrapper>
  )
}

export { ToastNotification }
