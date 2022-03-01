// store
import {
  OpenToastParams,
  hideToast as hide,
  openToast as open,
  resetToast,
  toastSelector,
} from '@md-store/modules/ui/toast'
import { useAppDispatch, useAppSelector } from '@md-store'

const useToast = () => {
  const dispatch = useAppDispatch()

  const toastData = useAppSelector(toastSelector)

  const openToast = (params: OpenToastParams) => dispatch(open(params))
  const hideToast = () => dispatch(hide())
  const resetToastData = () => dispatch(resetToast())

  return { openToast, hideToast, toastData, resetToastData }
}

export { useToast }
