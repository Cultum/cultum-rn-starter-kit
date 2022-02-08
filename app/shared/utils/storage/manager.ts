// utils
import { saveString, loadString } from './storage'
// constants
import { accessTokenKey } from '@md-shared/constants/common'

interface StorageManager {
  setAuthToken: (token: string) => Promise<boolean>
  getAuthToken: () => Promise<string | null>
}

const storageManager: StorageManager = {
  setAuthToken: (token: string) => saveString(accessTokenKey, token),
  getAuthToken: () => loadString(accessTokenKey),
}

export { storageManager }
