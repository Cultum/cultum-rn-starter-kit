import React from 'react'
// libs
import styled from 'styled-components/native'
// components
import { Text } from '@md-shared/components'
import { TouchableOpacity } from 'react-native'

// styled
const Wrapper = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-top: 16px;
`

// constants
const BUTTON_TEXT_STYLES = { color: 'blue500' as const }

// types
interface Props {
  isSignUp: boolean
  onNavButtonPress: () => void
}

const AuthRedirect: React.FC<Props> = ({ isSignUp, onNavButtonPress }) => {
  return (
    <Wrapper>
      <Text>{isSignUp ? 'Have an account?' : 'Dont have an account?'} </Text>
      <TouchableOpacity onPress={onNavButtonPress}>
        <Text textStyle={BUTTON_TEXT_STYLES}>{isSignUp ? 'Log in.' : 'Register.'}</Text>
      </TouchableOpacity>
    </Wrapper>
  )
}

export { AuthRedirect }
