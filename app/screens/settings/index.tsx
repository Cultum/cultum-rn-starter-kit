import * as React from 'react'
// components
import { Screen } from '@md-shared/components'
import { Settings } from '@md-modules/settings'
// theme
import { styles } from '@md-shared/theme'

const SettingsScreen = () => {
  return (
    <Screen style={styles.SCREEN_CONTAINER}>
      <Settings />
    </Screen>
  )
}

export { SettingsScreen }
