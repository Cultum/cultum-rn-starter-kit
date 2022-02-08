import { combineReducers } from 'redux'
// local
import * as getUser from './get-user'
import * as getUsers from './get-users'

export type UserAPIReducers = {
  getUser: getUser.InitialState
  getUsers: getUsers.InitialState
}

export const userReducers = combineReducers<UserAPIReducers>({
  getUser: require('./get-user').reducer,
  getUsers: require('./get-users').reducer,
})

export { getUser, getUsers }
