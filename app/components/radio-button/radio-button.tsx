import * as React from "react"
import { TouchableOpacity, View, ViewStyle, TextStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing } from "../../theme"
import { Text } from "../text/text"

const CONTAINER: ViewStyle = {
  marginBottom: spacing[3]
}

const INNER_CONTAINER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center"
}

const RADIO_BUTTON: ViewStyle = {
  width: 25,
  height: 25,
  borderRadius: 25,
  borderColor: color.primary,
  borderWidth: 1,
  marginRight: spacing[4],
  justifyContent: "center",
  alignItems: "center"
}

const RADIO_INNER: ViewStyle = {
  width: 18,
  height: 18,
  borderRadius: 18,
  backgroundColor: color.primary
}

const TEXT_WRAPPER: ViewStyle = {
  flexDirection: "column"
}

const TITLE: TextStyle = {
  fontSize: 15,
}

export interface RadioButtonProps {
  title: string
  subtitle?: string
  isActive: boolean
  onPress: () => void
}

/**
 * Radio button
 */
export const RadioButton = observer(function RadioButton(props: RadioButtonProps) {

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => props.onPress()}
      style={CONTAINER}
    >
      <View style={INNER_CONTAINER}>
        <View style={RADIO_BUTTON}>
          {props.isActive ? <View style={RADIO_INNER} /> : null}
        </View>

        <View style={TEXT_WRAPPER}>
          <Text preset="title" style={TITLE}>{props.title}</Text>
          {props.subtitle ? <Text preset="description">{props.subtitle}</Text> : null}
        </View>
      </View>
    </TouchableOpacity>
  )
})
