import { combineReducers } from 'redux'
// local
import toastReducer from './toast'
import modalReducer from './modal'

const uiReducers = combineReducers({
  toast: toastReducer,
  modal: modalReducer,
})

export default uiReducers
