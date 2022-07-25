import * as React from "react"
import { LineChart } from "react-native-chart-kit";
import { ViewStyle, Dimensions } from "react-native"
import { observer } from "mobx-react-lite"

const CONTAINER: ViewStyle = {
  marginLeft: -30
}

export interface BezierChartProps {
  data: ChartData
}

export interface ChartData {
  labels: string[]
  datasets: Dataset[]
}

export interface Dataset {
  data: number[]
  color?: (opacity: number) => string
  colors?: Array<(opacity: number) => string>
  strokeWidth?: number
  withDots?: boolean
  withScrollableDot?: boolean
  key?: string | number
  strokeDashArray?: number[]
  strokeDashOffset?: number
}

/**
 * Bezier chart
 */
export const BezierChart = observer(function BezierChart(props: BezierChartProps) {
  

  return (
    <LineChart
      data={props.data}
      width={Dimensions.get('window').width-30}
      height={330}
      style={CONTAINER}
      verticalLabelRotation={60}
      chartConfig={{
        color: () => 'rgba(90, 84, 202, 1)',
        strokeWidth: 1,
        backgroundGradientFrom: '#fff',
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: '#fff',
        barPercentage: 1,
        decimalPlaces: 0,
      }}
      bezier={true}
      // onDataPointClick={({value, dataset, getColor}) => Alert.alert(`value: ${value}, dataset: ${dataset}`)}
    />
  )
})
