import * as React from 'react'
// components
import { LogIn } from '@md-modules/auth/log-in'
import { Screen } from '@md-shared/components'
// theme
import { styles } from '@md-shared/theme'

const LogInScreen = () => {
  return (
    <Screen style={styles.SCREEN_CONTAINER}>
      <LogIn />
    </Screen>
  )
}

export { LogInScreen }
