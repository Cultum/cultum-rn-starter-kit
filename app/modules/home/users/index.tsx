import * as React from 'react'
// hooks
import { useNavigation } from '@react-navigation/native'
// components
import { UserCard } from '@md-modules/home/shared/components/user-card'
import { PaginatedList } from '@md-shared/components'
// types
import { User } from '@md-shared/types/entities'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
// constants
import { PrimaryParamList, ROUTES } from '@md-navigation/constants'
// api
import { useLazyGetUsersQuery } from '@md-store/middlewares/api/endpoints'

type UsersScreenProp = NativeStackNavigationProp<PrimaryParamList, 'SIGN_UP'>

const Users = () => {
  const navigation = useNavigation<UsersScreenProp>()

  const [getUsers, { data, isFetching }] = useLazyGetUsersQuery()

  const loadUsers = async (page) => getUsers({ page })

  const goToUserDetails = (user) => navigation.navigate(ROUTES.home.DETAILS, { user })

  const renderItem = React.useCallback(({ item }) => <UserCard user={item} onCardPress={goToUserDetails} />, [])

  return (
    <PaginatedList<User>
      data={data?.data}
      loadData={loadUsers}
      isLoading={isFetching}
      renderItem={renderItem}
      dataCount={data?.total}
      useRefreshControl={false}
    />
  )
}

export { Users }
