import * as React from "react"
import { View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "../text/text"
import { Divider } from "../divider/divider"
import { spacing } from "../../theme"

const VIEW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 10,
}

export interface TextRowProps {
  leftText: string;
  rightText: string;
  isLast: boolean;
}

/**
 * Describe your component here
 */
export const TextRow = observer(function TextRow(props: TextRowProps) {
  return (
    <>
      <View style={VIEW}>
        <Text preset="title">{props.leftText}</Text>
        <Text preset="description">{props.rightText}</Text>
      </View>
      {props.isLast ? null : <Divider horizontal={spacing[0]} bottom={spacing[3]} />}
    </>
  )
})
