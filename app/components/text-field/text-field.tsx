import React from "react"
import { StyleProp, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native"
import { color, spacing, typography } from "../../theme"
import { translate, TxKeyPath } from "../../i18n"
import { Text } from "../text/text"
import { STIcon } from "../st-icon/st-icon"

const CONTAINER: ViewStyle = {
  marginHorizontal: spacing[4],
  marginBottom: spacing[2]
}

const INPUT_CONTAINER: ViewStyle = {
  backgroundColor: color.palette.white,
  borderRadius: 9,
  paddingVertical: spacing[1],
  paddingHorizontal: spacing[1],
}

const DESCRIPTION: TextStyle = {
  marginBottom: spacing[2],
}

const INPUT: TextStyle = {
  fontFamily: typography.primary,
  color: color.text,
  minHeight: 40,
  fontSize: 18,
}

const INPUT_WITH_ICON = {
  marginLeft: spacing[7]
}

const ICON: ViewStyle = {
  position: "absolute",
  left: spacing[2],
  top: spacing[2]
}

const ERROR_TEXT: TextStyle = {
  marginTop: spacing[2],
}

const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
}

export interface TextFieldProps extends TextInputProps {
  /**
   * The placeholder i18n key.
   */
  placeholderTx?: TxKeyPath

  /**
   * The Placeholder text if no placeholderTx is provided.
   */
  placeholder?: string

  /**
   * The label i18n key.
   */
  labelTx?: TxKeyPath

  /**
   * The label text if no labelTx is provided.
   */
  label?: string

  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: StyleProp<ViewStyle>

  /**
   * Optional style overrides for the input.
   */
  inputStyle?: StyleProp<TextStyle>

  /**
   * Various look & feels.
   */
  preset?: keyof typeof PRESETS

  /**
   * Icon for text field
   */
  icon?: string

  /**
   * Error text for field
   */
  error?: string
}

/**
 * A component which has a label and an input together.
 */
export function TextField(props: TextFieldProps) {
  const {
    placeholderTx,
    placeholder,
    labelTx,
    label,
    preset = "default",
    icon,
    style: styleOverride,
    inputStyle: inputStyleOverride,
    error,
    ...rest
  } = props

  const containerStyles = [CONTAINER, PRESETS[preset], styleOverride]
  const inputStyles = [INPUT, inputStyleOverride, icon && INPUT_WITH_ICON]
  const actualPlaceholder = placeholderTx ? translate(placeholderTx) : placeholder

  return (
    <View style={containerStyles}>
      <Text preset="fieldLabel" tx={labelTx} text={label} style={DESCRIPTION} />

      <View style={INPUT_CONTAINER}>
        {icon ? <STIcon icon={icon} color={color.primary} size={30} style={ICON} /> : null}
        <TextInput
          placeholder={actualPlaceholder}
          placeholderTextColor={color.palette.lighterGrey}
          underlineColorAndroid={color.transparent}
          {...rest}
          style={inputStyles}
        />
      </View>

      {error ? <Text preset="error" style={ERROR_TEXT}>{error}</Text> : null}
    </View>
  )
}
