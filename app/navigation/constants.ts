// types
import { User } from '@md-shared/types/entities'

export const ROUTES = {
  root: {
    ROOT_STACK: 'ROOT',
  },
  auth: {
    LOG_IN: 'LOG_IN',
    SIGN_UP: 'SIGN_UP',
  },
  home: {
    ROOT: 'USERS',
    DETAILS: 'USER_DETAILS',
    TABS: {
      USER: 'USER',
      USERS: 'USERS_LIST',
    },
  },
  settings: {
    ROOT: 'SETTINGS',
  },
} as const

// ROOT
export type RootParamList = {
  [ROUTES.auth.LOG_IN]: undefined
  [ROUTES.auth.SIGN_UP]: undefined
  [ROUTES.root.ROOT_STACK]: undefined
  [ROUTES.home.DETAILS]: { user: User }
}

// USERS
export type HomeParamList = {
  [ROUTES.home.ROOT]: undefined
  [ROUTES.home.TABS.USER]: undefined
  [ROUTES.home.TABS.USERS]: undefined
}

// USERS TABS
export type UserParamList = {
  [ROUTES.home.TABS.USER]: undefined
}

export type UsersParamList = {
  [ROUTES.home.TABS.USERS]: undefined
}

// SETTINGS
export type SettingsParamList = {
  [ROUTES.settings.ROOT]: undefined
}

// PRIMARY
export type PrimaryParamList = RootParamList & HomeParamList & UserParamList & UsersParamList & SettingsParamList
