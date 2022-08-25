import * as React from "react"
import { View, ViewStyle, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing } from "../../theme"

const CONTAINER: ViewStyle = {
  marginHorizontal: spacing[4],
  paddingHorizontal: spacing[4],
  paddingVertical: spacing[3],
  backgroundColor: color.palette.white,
  borderRadius: 9,
  marginBottom: spacing[4],
}

export interface ComponentWrapperProps {
  children?: React.ReactNode
  isTouchable: boolean
  onPress?: () => void
}

/**
 * White wrapper for components
 */
export const ComponentWrapper = observer(function ComponentWrapper(props: ComponentWrapperProps) {
  return props.isTouchable ? (
    <TouchableOpacity
      style={CONTAINER}
      activeOpacity={0.7}
      onPress={() => (props.onPress ? props.onPress() : {})}
    >
      {props.children}
    </TouchableOpacity>
  ) : (
    <View style={CONTAINER}>{props.children}</View>
  )
})
