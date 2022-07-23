import * as React from "react"
import { View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color } from "../../theme"

const CONTAINER: ViewStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: color.background,
}

/**
 * Simple Background Component
 */
export const SimpleBackground = observer(function SimpleBackground() {
  return (
    <View style={CONTAINER} />
  )
})
