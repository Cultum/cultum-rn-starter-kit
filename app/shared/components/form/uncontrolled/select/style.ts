import { theme } from '@md-shared/theme'
import { StyleSheet } from 'react-native'

const selectSharedStyles = {
  backgroundColor: theme.color.background,
  color: theme.color.text,
  fontSize: 16,
  height: 52,
  margin: 2,
  padding: 16,
  paddingRight: 35, // to ensure the text is never behind the icon
}

const pickerSelectStyles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  inputAndroid: {
    ...selectSharedStyles,
    overflow: 'hidden',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  inputIOS: selectSharedStyles,
})

export const style = {
  ...pickerSelectStyles,
  iconContainer: { right: 20, top: 26 },
  modalViewBottom: { backgroundColor: theme.color.background },
}
