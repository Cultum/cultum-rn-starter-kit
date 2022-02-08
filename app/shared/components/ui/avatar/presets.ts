import { theme } from '@md-shared/theme'

export const avatarPresets = {
  extraLarge: {
    size: 80,
    borderColor: theme.color.palette.gray100,
    borderWidth: 2,
  },
  large: {
    size: 65,
    borderColor: theme.color.palette.whiteRGBA7,
    borderWidth: 2,
  },
  medium: {
    size: 50,
    borderColor: theme.color.palette.whiteRGBA7,
    borderWidth: 0,
  },
  small: {
    size: 44,
    borderColor: theme.color.palette.whiteRGBA7,
    borderWidth: 2,
  },
}

export type AvatarPresets = keyof typeof avatarPresets
