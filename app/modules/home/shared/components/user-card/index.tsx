import React from 'react'
// libs
import styled from 'styled-components/native'
// components
import { Avatar, Text } from '@md-shared/components'
import { TouchableWithoutFeedback } from 'react-native'
// types
import { User } from '@md-shared/types/entities'

// styled
const Wrapper = styled.View`
  align-items: center;
  background: ${({ theme }) => theme.color.palette.white};
  border-radius: 4px;
  flex-direction: row;
  height: 90px;
  margin-bottom: 12px;
  padding: 12px;
`

const UserInfo = styled.View`
  flex-direction: column;
  margin-left: 16px;
`

// types
interface Props {
  user: User
  onCardPress?: (user: User) => void
}

const UserCard: React.FC<Props> = ({ user, onCardPress }) => {
  return (
    <TouchableWithoutFeedback onPress={() => onCardPress?.(user)}>
      <Wrapper>
        <Avatar source={user.avatar} />
        <UserInfo>
          <Text>{`${user.first_name} ${user.last_name}`}</Text>
          <Text preset={'secondary'}>{user.email}</Text>
        </UserInfo>
      </Wrapper>
    </TouchableWithoutFeedback>
  )
}

const memoized = React.memo(UserCard)

export { memoized as UserCard }
