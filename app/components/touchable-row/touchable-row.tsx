import * as React from "react"
import { View, ViewStyle, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing } from "../../theme"
import { Text } from "../text/text"
import { STIcon } from "../st-icon/st-icon"
import { Divider } from "../divider/divider"

const WRAPPER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const HEADER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center"
}

const ICON_WRAPPER: ViewStyle = {
  width: 35,
  height: 35,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: color.primary,
  borderWidth: 0,
  borderRadius: 9,
}

const HEADER_WRAPPER: ViewStyle = {
  flexDirection: "column",
  marginLeft: spacing[4]
}

const ICON: ViewStyle = {
  position: "absolute",
  right: spacing[0]
}

export interface TouchableRowProps {
  icon: string
  title: string
  description: string
  isLast: boolean
  onPress: () => void
}

/**
 * Describe your component here
 */
export const TouchableRow = observer(function TouchableRow(props: TouchableRowProps) {
  return (
    <>
      <TouchableOpacity
        style={[WRAPPER, props.isLast ? {} : {marginBottom: spacing[3]}]}
        activeOpacity={0.8}
        onPress={() => props.onPress()}
      >
        <View style={HEADER}>
          <View style={ICON_WRAPPER}>
            <STIcon icon={props.icon} size={25} color={color.palette.white} />
          </View>

          <View style={HEADER_WRAPPER}>
            <Text preset="title">{props.title}</Text>
            <Text preset="description">{props.description}</Text>
          </View>
        </View>

        <STIcon icon="arrow_right_outline_28" size={20} color={color.dim} style={ICON}/>
      </TouchableOpacity>
      {props.isLast ? null : <Divider horizontal={spacing[0]} bottom={spacing[3]} />}
    </>
  )
})
