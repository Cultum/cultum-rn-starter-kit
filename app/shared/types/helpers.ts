import { DefaultTheme, FlattenInterpolation } from 'styled-components'
import { ThemeProps } from 'styled-components/native'

export type StyledCss = FlattenInterpolation<ThemeProps<DefaultTheme>>
