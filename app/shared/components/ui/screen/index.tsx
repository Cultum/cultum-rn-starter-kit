import * as React from 'react'
// libs
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, View, ViewStyle } from 'react-native'
// hooks
import { useSafeAreaInsets } from 'react-native-safe-area-context'
// presets
import { KeyboardOffsets, ScreenPresets, isNonScrolling, offsets, presets } from './presets'
// components
import { ToastNotification } from '@md-shared/components/ui/toast-notification'

const isIos = Platform.OS === 'ios'

interface Props {
  style?: ViewStyle
  unsafe?: boolean
  preset?: ScreenPresets
  statusBar?: 'light-content' | 'dark-content'
  keyboardOffset?: KeyboardOffsets
  backgroundColor?: string
}

const ScreenWithoutScrolling: React.FC<Props> = (props) => {
  const insets = useSafeAreaInsets()

  const preset = presets.fixed
  const style = props.style || {}
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}

  const TOAST_TOP_MARGIN = insets.top < 12 ? 12 : insets.top

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}
    >
      <StatusBar barStyle={props.statusBar || 'light-content'} />
      <View style={[preset.inner, style, insetStyle]}>
        <ToastNotification top={TOAST_TOP_MARGIN} />
        {props.children}
      </View>
    </KeyboardAvoidingView>
  )
}

const ScreenWithScrolling: React.FC<Props> = (props) => {
  const insets = useSafeAreaInsets()

  const preset = presets.scroll
  const style = props.style || {}
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}

  const TOAST_TOP_MARGIN = insets.top < 12 ? 12 : insets.top

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}
    >
      <StatusBar barStyle={props.statusBar || 'light-content'} />
      <View style={[preset.outer, backgroundStyle, insetStyle]}>
        <ToastNotification top={TOAST_TOP_MARGIN} />
        <ScrollView style={[preset.outer, backgroundStyle]} contentContainerStyle={[preset.inner, style]}>
          {props.children}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

/**
 * The starting component on every screen in the app.
 */

const Screen: React.FC<Props> = (props) => {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />
  } else {
    return <ScreenWithScrolling {...props} />
  }
}

export { Screen }
