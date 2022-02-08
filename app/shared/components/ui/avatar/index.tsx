import React from 'react'
// libs
import FastImage from 'react-native-fast-image'
// constants
import { avatarPresets, AvatarPresets } from './presets'
// views
import { Wrapper } from './views'

export interface AvatarProps {
  source?: string
  preset?: AvatarPresets
}

const defaultAvatar = require('@md-assets/images/png/default-avatar.png')

const Avatar: React.FC<AvatarProps> = ({ preset = 'medium', source }) => {
  const avatarStyle = {
    width: avatarPresets[preset]?.size,
    height: avatarPresets[preset]?.size,
    borderRadius: avatarPresets[preset]?.size * 0.5,
  }

  const sourceValue = { uri: source }
  const wrapperSize = avatarPresets[preset]?.size + avatarPresets[preset]?.borderWidth

  return (
    <Wrapper width={wrapperSize} height={wrapperSize} borderColor={avatarPresets[preset]?.borderColor}>
      <FastImage
        style={avatarStyle}
        resizeMode={FastImage.resizeMode.cover}
        source={source ? sourceValue : defaultAvatar}
      />
    </Wrapper>
  )
}

export { Avatar }
