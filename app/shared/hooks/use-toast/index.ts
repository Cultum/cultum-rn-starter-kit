import * as React from 'react'
// types
import { RootStore } from '@md-store/modules'
// hooks
import { useDispatch, useSelector } from 'react-redux'
// store
import { OpenToastParams, resetToastAction, setOpenToastAction, setHideToastAction } from '@md-store/modules/ui/toast'

const useToast = () => {
  const dispatch = useDispatch()

  const toastData = useSelector<RootStore, RootStore['ui']['toast']>((state) => state.ui.toast)

  const openToast = React.useCallback(
    (params: OpenToastParams) => {
      dispatch(setOpenToastAction(params))
    },
    [dispatch],
  )

  const hideToast = React.useCallback(() => {
    dispatch(setHideToastAction())
  }, [dispatch])

  const resetToastData = React.useCallback(() => {
    dispatch(resetToastAction())
  }, [dispatch])

  return { openToast, hideToast, toastData, resetToastData }
}

export type ToastActions = ReturnType<typeof useToast>

export { useToast }
