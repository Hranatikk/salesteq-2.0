import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing } from "../../theme"
import { Text } from "../text/text"
import { TextRow } from "../text-row/text-row"
import { Divider } from "../divider/divider"

const CONTAINER: ViewStyle = {
  height: 4,
  width: "100%",
  borderRadius: 3,
  backgroundColor: color.dim,
  marginTop: spacing[1],
  marginBottom: spacing[2],
}

const DESCRIPTION: TextStyle = {
  marginBottom: spacing[2]
}

const CHART_LINE: ViewStyle = {
  position: "absolute",
  left: 0,
  top: 0,
  height: 4,
  backgroundColor: color.primary,
  borderRadius: 3,
}

export interface FlatLineChartProps {
  title: string
  description: string
  current: number
  needed: number
  isLast: boolean
}

/**
 * Flat line chart
 */
export const FlatLineChart = observer(function FlatLineChart(props: FlatLineChartProps) {
  
  const getWidth = (current, needed) => {
    const onePercent = needed/100;
    const currentPercentage = current/onePercent;
    return `${currentPercentage > 100 ? 100 : currentPercentage}%`;
  };

  return (
    <View style={{marginTop: spacing[3]}}>
      <TextRow leftText={props.title} rightText={`${props.current}/${props.needed}`} isLast={true}/>
      <Text preset="description" style={DESCRIPTION}>{props.description}</Text>

      <View style={[CONTAINER, props.isLast ? {} : {marginBottom: spacing[5]}]}>
        <View style={[CHART_LINE, {width: getWidth(props.current, props.needed)}]} />
      </View>

      {props.isLast ? null : <Divider bottom={spacing[4]} horizontal={spacing[0]} />}
    </View>
  )
})
