// store
import { closeModal as closeAction, modalSelector, openModal as openAction } from '@md-store/modules/ui/modal'
// hooks
import { useAppDispatch, useAppSelector } from '@md-store'
// constants
import * as modalTypes from '@md-shared/constants/modal'
// types
import { BaseModalData } from '@md-shared/types/modals'

interface UseModalProps {
  modalType: keyof typeof modalTypes;
}

interface ReturnType<T> {
  modalData: T;
  openModal: (modalData?: T) => void;
  closeModal: () => void;
}

export const useReduxModal = <T extends BaseModalData>({
  modalType
}: UseModalProps): ReturnType<T> => {
  const dispatch = useAppDispatch();

  const modalData = useAppSelector((state) => modalSelector(state, modalType)) as T;

  const closeModal = () => dispatch(closeAction({ modalType }));
  const openModal = (modalData?: T) => dispatch(openAction({ modalType, modalData }));

  return {
    modalData,
    openModal,
    closeModal,
  };
};
