// hooks
import { useSelector } from 'react-redux'
// types
import { User } from '@md-shared/types/entities'
import { RootStore } from '@md-store/modules'

const useCurrentUser = () => {
  return useSelector<RootStore, RootStore['profile']['user']>((state) => state.profile.user) as User
}

export { useCurrentUser }
