import * as React from 'react'
// components
import { Screen } from '@md-shared/components'
import { UserDetails } from '@md-modules/home'
// theme
import { styles } from '@md-shared/theme'

const UserDetailsScreen = () => {
  return (
    <Screen style={styles.SCREEN_CONTAINER} statusBar={'dark-content'}>
      <UserDetails />
    </Screen>
  )
}

export { UserDetailsScreen }
