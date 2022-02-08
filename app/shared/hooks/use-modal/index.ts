import * as React from 'react'
// types
import * as modalTypes from '@md-shared/constants/modal'
import { RootStore } from '@md-store/modules'
// hooks
import { useDispatch, useSelector } from 'react-redux'
// store
import { setCloseModalAction, setOpenModalAction } from '@md-store/modules/ui/modal'

export type ModalType = keyof typeof modalTypes

interface ReturnType<T = Record<string, unknown>> {
  openModal: (modalData?: T) => void
  modalData: { open: boolean; data: T }
  closeModal: () => void
}

const useModal = <T>(modalType: ModalType): ReturnType<T> => {
  const dispatch = useDispatch()

  const modalData = useSelector<RootStore, RootStore['ui']['modal'][typeof modalType]>(
    (state) => state.ui.modal[modalType],
  )

  const openModal = React.useCallback(
    (modalData) => {
      dispatch(setOpenModalAction({ modalType, modalData }))
    },
    [dispatch, modalType],
  )

  const closeModal = React.useCallback(() => {
    dispatch(setCloseModalAction({ modalType }))
  }, [dispatch, modalType])

  return {
    modalData,
    openModal,
    closeModal,
  }
}

export { useModal }
