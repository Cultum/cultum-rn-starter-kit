import * as React from 'react'
// components
import { SignUp } from '@md-modules/auth'
import { Screen } from '@md-shared/components'
// theme
import { styles } from '@md-shared/theme'

const SignUpScreen = () => {
  return (
    <Screen style={styles.SCREEN_CONTAINER}>
      <SignUp />
    </Screen>
  )
}

export { SignUpScreen }
