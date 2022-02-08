import * as React from 'react'
// libs
import Picker, { Item, PickerSelectProps } from 'react-native-picker-select'
// components
import { Text } from '@md-shared/components'
import { ErrorMessage } from '@md-shared/components/form/error-message'
// assets
import DownArrowSvg from '@md-assets/images/svg/down-arrow'
// views
import { PickerWrapper, Wrapper, labelTextOverrides, WrapperStyle } from './views'
// style
import { style } from './style'

export interface SelectProps extends Omit<PickerSelectProps, 'onValueChange' | 'items'> {
  label?: string
  options: Item[]
  errorText?: string
  isInvalid?: boolean
  selectRef?: React.RefObject<Picker>
  placeholder?: Item | Record<string, unknown>
  defaultValue?: string
  wrapperStyle?: WrapperStyle
  onSelectChange?: (value: string) => void
}

const renderIcon = () => <DownArrowSvg width={13} />

const Select: React.FC<SelectProps> = ({
  label,
  options,
  errorText,
  isInvalid,
  selectRef,
  placeholder,
  defaultValue,
  wrapperStyle,
  onSelectChange,
  ...rest
}) => {
  const [selected, setSelected] = React.useState('')

  const handleOnSelectChange = (value: string) => {
    onSelectChange?.(value)
    setSelected(value)
  }

  React.useEffect(() => {
    if (defaultValue) {
      handleOnSelectChange(defaultValue)
    }
  }, [defaultValue])

  return (
    <Wrapper wrapperStyle={wrapperStyle}>
      {label && (
        <Text preset={'fieldLabel'} overrides={labelTextOverrides}>
          {label}
        </Text>
      )}
      <PickerWrapper isValid={!isInvalid}>
        <Picker
          style={style}
          items={options}
          ref={selectRef}
          value={selected}
          Icon={renderIcon}
          placeholder={placeholder ?? {}}
          InputAccessoryView={() => null}
          onValueChange={handleOnSelectChange}
          {...rest}
        />
      </PickerWrapper>
      <ErrorMessage errorText={errorText} />
    </Wrapper>
  )
}

export { Select }
