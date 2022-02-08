import { combineReducers } from 'redux'
// local
import * as auth from '@md-store/modules/api/auth'
import * as user from '@md-store/modules/api/user'

export type ApiReducers = {
  auth: auth.AuthAPIReducers
  user: user.UserAPIReducers
}

export const apiReducers = combineReducers<ApiReducers>({
  auth: auth.authReducers,
  user: user.userReducers,
})

export { auth, user }
