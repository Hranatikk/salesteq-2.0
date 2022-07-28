import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing } from "../../theme"
import { Text } from "../text/text"
import { ComponentWrapper } from "../component-wrapper/component-wrapper"
import { Divider } from "../divider/divider"
import { STIcon } from "../st-icon/st-icon"

const ICON_WRAPPER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center"
}

const TITLE_TEXT: TextStyle = {
  marginBottom: spacing[3]
}

const STATUS_TEXT: TextStyle = {
  marginBottom: spacing[2],
  color: color.palette.lightRed
}

const ICON_TEXT: TextStyle = {
  marginLeft: spacing[1]
}

const MAIN_CONTENT: ViewStyle = {
  marginBottom: spacing[4]
}

export interface CardProps {
  title: string;
  subtitle?: string;
  onPress: () => void;
  iconName?: string;
  iconText?: string;
  iconTextColor?: string;
  statusText?: string;
  statusTextColor?: string;
}

/**
 * Touchable card item
 */
export const Card = observer(function Card(props: CardProps) {

  return (
    <ComponentWrapper isTouchable={true} onPress={() => props.onPress()}>
      {props.statusText ? (
        <>
          <Text preset="description" style={[STATUS_TEXT, props.statusTextColor && {color: props.statusTextColor}]}>{props.statusText}</Text>
          <Divider horizontal={spacing[0]} bottom={spacing[3]} />
        </>
      ) : null}

      <View style={props.iconName ? MAIN_CONTENT : {}}>
        <Text preset="title" style={[props.subtitle ? TITLE_TEXT : {}]}>{props.title}</Text>
        {props.subtitle ? <Text preset="description">{props.subtitle}</Text> : null}
      </View>
      
      {props.iconName ? (
        <>
          <Divider horizontal={spacing[0]} bottom={spacing[3]} />
          <View style={ICON_WRAPPER}>
            <STIcon icon={props.iconName} size={24} color={color.text} />
            <Text preset="description" style={[ICON_TEXT, props.iconTextColor && {color: props.iconTextColor}]}>{props.iconText}</Text>
          </View>
        </>
      ) : null}

    </ComponentWrapper>
  )
})
