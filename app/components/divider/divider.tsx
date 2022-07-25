import * as React from "react"
import { View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color } from "../../theme"

const DIVIDER: ViewStyle = {
  height: 1,
  backgroundColor: color.palette.lightGrey,
}

export interface DividerProps {
  horizontal: number
  bottom: number
  style?: ViewStyle
}

/**
 * Divider component
 */
export const Divider = observer(function Divider(props: DividerProps) {
  return (
    <View  style={[
      DIVIDER,
      props.style ? props.style : {},
      { marginHorizontal: props.horizontal, marginBottom: props.bottom }
    ]} />
  )
})
