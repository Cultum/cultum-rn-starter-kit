import { combineReducers } from 'redux'
// local
import * as logIn from './log-in'
import * as signUp from './sign-up'

export type AuthAPIReducers = {
  logIn: logIn.InitialState
  signUp: signUp.InitialState
}

export const authReducers = combineReducers<AuthAPIReducers>({
  logIn: require('./log-in').reducer,
  signUp: require('./sign-up').reducer,
})

export { logIn, signUp }
