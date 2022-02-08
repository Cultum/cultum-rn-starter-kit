import * as React from 'react'
// components
import { Text } from '@md-shared/components'

const ERROR_TEXT_STYLE = { mt: 3 }

interface Props {
  errorText: string | undefined
}

const ErrorMessage: React.FC<Props> = ({ errorText }) => {
  if (!errorText) return null

  return (
    <Text preset={'inputError'} textStyle={ERROR_TEXT_STYLE}>
      {errorText}
    </Text>
  )
}

export { ErrorMessage }
