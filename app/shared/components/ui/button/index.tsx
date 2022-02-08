import React from 'react'
// components
import { Text, TextProps, Loader } from '@md-shared/components'
// views
import { InnerWrapper, LoaderWrapper, Wrapper, ButtonStyle } from './views'
// presets
import { textPresets, ButtonPresets } from './presets'
// types
import { StyledCss } from '@md-shared/types/helpers'
import { TouchableOpacityProps } from 'react-native'

interface Props extends TouchableOpacityProps {
  text?: string
  preset?: ButtonPresets
  textStyle?: TextProps['textStyle']
  isLoading?: boolean
  overrides?: StyledCss
  buttonStyle?: ButtonStyle
}

const Button: React.FC<Props> = ({ preset = 'default', text, textStyle, children, isLoading, ...rest }) => {
  const textPreset = textPresets[preset]

  const content = children || <Text text={text} textStyle={textStyle} overrides={textPreset} />

  return (
    <Wrapper preset={preset} {...rest}>
      <InnerWrapper>
        {content}
        {isLoading && (
          <LoaderWrapper>
            <Loader preset={'button'} />
          </LoaderWrapper>
        )}
      </InnerWrapper>
    </Wrapper>
  )
}

export { Button }
