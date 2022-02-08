import AsyncStorage from '@react-native-community/async-storage'

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1.0',
  storeConfig: {
    key: 'primary',
    storage: AsyncStorage,
    // Reducer keys that you do NOT want stored to persistence here.
    blacklist: ['api', 'ui', 'app', 'profile'],
  },
}

export default REDUX_PERSIST
