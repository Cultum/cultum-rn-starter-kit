import React from 'react'
// libs
import {
  Keyboard,
  Platform,
  Modal as RNModal,
  useWindowDimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native'
// hooks
import { useSafeAreaInsets } from 'react-native-safe-area-context'
// components
import { Text } from '@md-shared/components'
// assets
import CloseSvg from '@md-assets/images/svg/close'
// views
import { Adornment, Header, Wrapper, IWrapper, BWrapper, ModalSize, MODAL_SIZE } from './views'

// constants
const TEXT_STYLES = { fs: 20, fw: '700' }

// types
interface Props {
  open: boolean
  size: ModalSize
  onClose: () => void
  fullscreen?: boolean
  headerText?: string
  headerComponent?: React.ReactElement
}

const Modal: React.FC<Props> = ({ open, size, onClose, children, fullscreen = false, headerText, headerComponent }) => {
  const insets = useSafeAreaInsets()
  const windowHeight = useWindowDimensions().height

  if (!open) {
    return null
  }

  return (
    <RNModal animated animationType={'fade'} transparent visible={open}>
      <Wrapper>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Adornment />
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <IWrapper offsetTop={insets.top} fullscreen={fullscreen} height={windowHeight / MODAL_SIZE[size]}>
              <Header>
                {headerText ? <Text textStyle={TEXT_STYLES}>{headerText}</Text> : null}
                {headerComponent}
                <BWrapper onPress={onClose}>
                  <CloseSvg height={16} width={16} />
                </BWrapper>
              </Header>
              {children}
            </IWrapper>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Wrapper>
    </RNModal>
  )
}

export { Modal }
