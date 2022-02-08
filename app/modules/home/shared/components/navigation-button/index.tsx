import React from 'react'
// libs
import styled from 'styled-components/native'
// components
import { Button } from '@md-shared/components'

// styled
const Wrapper = styled.View`
  align-items: center;
`

// constants
const TEXT_STYLES = { align: 'center' as const }

// types
interface Props {
  text: string
  onPress: () => void
}

const NavigationButton: React.FC<Props> = ({ text, onPress }) => {
  return (
    <Wrapper>
      <Button preset={'link'} textStyle={TEXT_STYLES} text={text} onPress={onPress} />
    </Wrapper>
  )
}

export { NavigationButton }
