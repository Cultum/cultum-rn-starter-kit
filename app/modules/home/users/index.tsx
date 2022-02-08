import * as React from 'react'
// hooks
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
// components
import { UserCard } from '@md-modules/home/shared/components/user-card'
import { PaginatedList } from '@md-shared/components'
// store
import * as API from '@md-store/modules/api'
// types
import { User } from '@md-shared/types/entities'
import { RootStore } from '@md-store/modules'
import { ThunkDispatch } from '@md-store/helpers'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
// constants
import { PrimaryParamList, ROUTES } from '@md-navigation/constants'

type StoreSelector = {
  users: RootStore['api']['user']['getUsers']['data']
  isLoading: RootStore['api']['user']['getUsers']['loading']
  isLoadMore: RootStore['api']['user']['getUsers']['loadMore']
}

type UsersScreenProp = NativeStackNavigationProp<PrimaryParamList, 'SIGN_UP'>

const Users = () => {
  const dispatch = useDispatch<ThunkDispatch>()
  const navigation = useNavigation<UsersScreenProp>()

  const { users, isLoading, isLoadMore } = useSelector<RootStore, StoreSelector>((state) => ({
    users: state.api.user.getUsers.data,
    isLoading: state.api.user.getUsers.loading,
    isLoadMore: state.api.user.getUsers.loadMore,
  }))

  const loadUsers = async (page, shouldLoadMore) =>
    dispatch(API.user.getUsers?.performAPIGetUsers({ page }, shouldLoadMore))

  const goToUserDetails = (user) => navigation.navigate(ROUTES.home.DETAILS, { user })

  const renderItem = React.useCallback(({ item }) => <UserCard user={item} onCardPress={goToUserDetails} />, [])

  return (
    <PaginatedList<User>
      data={users?.data}
      loadData={loadUsers}
      isLoading={isLoading}
      isLoadMore={isLoadMore}
      renderItem={renderItem}
      dataCount={users?.total}
    />
  )
}

export { Users }
