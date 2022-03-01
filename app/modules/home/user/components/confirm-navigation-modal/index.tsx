import React from 'react'
// libs
import styled from 'styled-components/native'
// hooks
// import { useModal } from '@md-shared/hooks/use-modal'
import { useReduxModal } from '@md-shared/hooks'
import { useNavigation } from '@react-navigation/native'
// components
import { Button, Modal, Text } from '@md-shared/components'
// constants
import { CONFIRM_NAV_MODAL } from '@md-shared/constants/modal'
// types
import { ConfirmNavModalData } from '@md-shared/types/modals'
import { PrimaryParamList, ROUTES } from '@md-navigation/constants'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

// styled
const Wrapper = styled.SafeAreaView`
  flex: 1;
  justify-content: space-between;
`

// constants
const TEXT_STYLES = { align: 'center' as const, fs: 20, mt: 30 }

// types
type UserScreenProp = NativeStackNavigationProp<PrimaryParamList, 'USER'>

const ConfirmNavigationModal = () => {
  const navigation = useNavigation<UserScreenProp>()

  // const { isOpen, toggleModal } = useModal()
  const { closeModal, modalData } = useReduxModal<ConfirmNavModalData>({ modalType: CONFIRM_NAV_MODAL })

  const goToSettings = () => {
    closeModal()
    navigation.navigate(ROUTES.settings.ROOT)
  }

  return (
    <Modal size={'half'} onClose={closeModal} open={modalData.isOpen} headerText={'Confirm Navigation'}>
      <Wrapper>
        <Text textStyle={TEXT_STYLES}>Navigate to Settings Screen?</Text>
        <Button text={'Navigate'} onPress={goToSettings} />
      </Wrapper>
    </Modal>
  )
}

export { ConfirmNavigationModal }
