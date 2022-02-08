import * as React from 'react'
// components
import { Users } from '@md-modules/home'
import { Screen } from '@md-shared/components'
// theme
import { styles } from '@md-shared/theme'

const UsersScreen = () => {
  return (
    <Screen style={styles.SCREEN_CONTAINER}>
      <Users />
    </Screen>
  )
}

export { UsersScreen }
