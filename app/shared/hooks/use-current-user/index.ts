// hooks
import { useAppSelector } from '@md-store'
// store
import { userSelector } from '@md-store/modules/user'
// types
import { User } from '@md-shared/types/entities'

const useCurrentUser = () => {
  const { data, authorized } = useAppSelector(userSelector)

  return { user: data as User, authorized }
}

export { useCurrentUser }
