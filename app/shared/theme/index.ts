import { DefaultTheme } from 'styled-components'
import { color } from './color'
import { timing } from './timing'
import { spacing } from './spacing'
import { template } from './template'
import { typography } from './typography'

export * from './color'
export * from './spacing'
export * from './typography'
export * from './timing'
export * from './timing'
export * from './styles'

export const theme: DefaultTheme = {
  color,
  timing,
  spacing,
  template,
  typography,
}

declare module 'styled-components' {
  export interface DefaultTheme {
    color: typeof color
    timing: typeof timing
    spacing: typeof spacing
    template: typeof template
    typography: typeof typography
  }
}
