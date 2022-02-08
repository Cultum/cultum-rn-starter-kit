import { color } from '@md-shared/theme'

export const presets = {
  default: {
    width: 50,
    height: 50,
    color: color.palette.blue500,
  },
  medium: {
    width: 30,
    height: 30,
    color: color.palette.blue500,
  },
  button: {
    width: 30,
    height: 30,
    color: color.palette.white,
  },
  small: {
    width: 20,
    height: 20,
    color: color.palette.blue500,
  },
}

export type LoaderPresets = keyof typeof presets
