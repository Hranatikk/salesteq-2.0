import * as React from "react"
import { TextStyle, ViewStyle, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text } from "../text/text"

const BUTTON: ViewStyle = {
  justifyContent: "center",
  paddingVertical: spacing[2],
  paddingHorizontal: spacing[3],
  marginRight: spacing[2],
  backgroundColor: color.palette.white,
  borderRadius: 6
}

const BUTTON_ACTIVE: ViewStyle = {
  backgroundColor: color.primary
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 16,
  color: color.text
}

const TEXT_ACTIVE: TextStyle = {
  color: color.palette.white
}

export interface TabProps {
  isActive: boolean
  text: string
  onPress: () => void
}

/**
 * Tab compoenent 
 */
export const Tab = observer(function Tab(props: TabProps) {

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[BUTTON, props.isActive && BUTTON_ACTIVE]}
      onPress={() => props.onPress()}
    >
      <Text style={[TEXT, props.isActive && TEXT_ACTIVE]}>{props.text}</Text>
    </TouchableOpacity>
  )
})
