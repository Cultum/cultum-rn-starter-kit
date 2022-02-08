import * as React from 'react'
// components
import { User } from '@md-modules/home'
import { Screen } from '@md-shared/components'
// theme
import { styles } from '@md-shared/theme'

const UserScreen = () => {
  return (
    <Screen style={styles.SCREEN_CONTAINER} statusBar={'dark-content'}>
      <User />
    </Screen>
  )
}

export { UserScreen }
