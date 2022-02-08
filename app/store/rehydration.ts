import { Store } from 'redux'
import { persistStore } from 'redux-persist'
// local
import AsyncStorage from '@react-native-community/async-storage'
import ReduxPersist from './redux-persist'

const updateReducers = (store: Store) => {
  const reducerVersion = ReduxPersist.reducerVersion
  // const startup = () => store.dispatch(StartupActions.startup())

  // Check to ensure latest reducer version
  AsyncStorage.getItem('reducerVersion')
    .then((localVersion) => {
      if (localVersion !== reducerVersion) {
        // eslint-disable-next-line no-console
        console.log({
          name: 'PURGE',
          value: {
            'Old Version:': localVersion,
            'New Version:': reducerVersion,
          },
          preview: 'Reducer Version Change Detected',
          important: true,
        })

        // Purge store
        persistStore(store, null).purge()
        AsyncStorage.setItem('reducerVersion', reducerVersion)
      } else {
        persistStore(store, null)
      }
    })
    .catch(() => {
      persistStore(store, null)
      AsyncStorage.setItem('reducerVersion', reducerVersion)
    })
}

export default { updateReducers }
