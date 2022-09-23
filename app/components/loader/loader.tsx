import * as React from "react"
import { ActivityIndicator, View, ViewStyle } from "react-native"
import { Portal } from "@gorhom/portal"
import { observer } from "mobx-react-lite"
import { color } from "../../theme"

const CONTAINER: ViewStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
}

const INNER_CONTAINER: ViewStyle = {
  backgroundColor: color.text,
  opacity: 0.4,
}

/**
 * Describe your component here
 */
export const Loader = observer(function Loader() {
  return (
    <Portal>
      <View style={CONTAINER}>
        <View style={[CONTAINER, INNER_CONTAINER]} />

        <ActivityIndicator size="large" color={color.primary} />
      </View>
    </Portal>
  )
})
