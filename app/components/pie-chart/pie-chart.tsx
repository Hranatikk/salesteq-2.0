import * as React from "react"
import { Text, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { PieChart as PieChartComponent } from "react-native-svg-charts"
import { spacing } from "../../theme"

const PIE_CHART: ViewStyle = {
  height: 280,
}

const DESCRIPTION_CONTAINER: ViewStyle = {
  marginTop: spacing[5],
}

const DESCRIPTION_ITEM: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: spacing[2],
}

const DESCRIPTION_CIRCLE: ViewStyle = {
  width: 10,
  height: 10,
  borderRadius: 10,
  marginRight: spacing[1],
}

export interface PieChartProps {
  data: any
  showList: boolean
}

/**
 * Pie chart
 */
export const PieChart = observer(function PieChart(props: PieChartProps) {
  return (
    <>
      <PieChartComponent style={PIE_CHART} data={props.data} innerRadius="0" padAngle={0} />

      {props.showList && (
        <View style={DESCRIPTION_CONTAINER}>
          {props.data.map((item, index) => (
            <View key={`chart_${index}`} style={DESCRIPTION_ITEM}>
              <View style={[DESCRIPTION_CIRCLE, { backgroundColor: item.svg.fill }]} />
              <Text>
                {item.name} - {item.value} BYN
              </Text>
            </View>
          ))}
        </View>
      )}
    </>
  )
})
