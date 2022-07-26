import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography, spacing } from "../../theme"
import { Text } from "../text/text"
import { ComponentWrapper } from "../component-wrapper/component-wrapper"
import { TextRow } from "../text-row/text-row"
import { FlatLineChart } from "../flat-line-chart/flat-line-chart"
import { TouchableRow } from "../touchable-row/touchable-row"
import { BezierChart } from "../bezier-chart/bezier-chart"
import { PieChart } from "../pie-chart/pie-chart"
import { getColorByString } from "../../utils/get-color-by-string"

const HEADER_TEXT: TextStyle = {
  marginHorizontal: spacing[4],
  marginBottom: spacing[2]
}

const CONTAINER_TITLE: TextStyle = {
  marginBottom: spacing[3]
}

const CONTAINER_SUBTITLE: TextStyle = {
  marginBottom: spacing[5]
}

export interface UserAnalyticsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

const data = [
  {
    title: 'Ivan Staver',
    amount: 250
  },
  {
    title: 'Hleb Skrypinski',
    amount: 250
  },
  {
    title: 'Nikita Zyl',
    amount: 350
  },
  {
    title: 'Andrei Shaban',
    amount: 100
  },
  {
    title: 'Zubr',
    amount: 500
  },
]

/**
 * User analytics component
 */
export const UserAnalytics = observer(function UserAnalytics(props: UserAnalyticsProps) {

  const getPieChartData = (item) => {
    return item.map((i, index) => ({
      value: i.amount,
      name: `${i.title}`,
      svg: {
        fill: getColorByString(`${i.title}${i.index}`),
      },
      key: `pie-${index}`,
    }));
  }

  return (
    <>
      <Text preset="header" style={HEADER_TEXT}>John Doe Doeee</Text>
      <Text preset="description" style={HEADER_TEXT}>head@smartup.com</Text>

      <ComponentWrapper isTouchable={false}>
        <TextRow leftText="leftText" rightText="rightText" isLast={false} />
        <TextRow leftText="leftText" rightText="rightText" isLast={false} />
        <TextRow leftText="leftText" rightText="rightText" isLast={true} />
      </ComponentWrapper>

      <ComponentWrapper isTouchable={false}>
        <TextRow leftText="leftText" rightText="rightText" isLast={false} />
        <TextRow leftText="leftText" rightText="rightText" isLast={false} />
        <TextRow leftText="leftText" rightText="rightText" isLast={true} />
      </ComponentWrapper>

      <ComponentWrapper isTouchable={false}>
        <Text preset="boldTitle" style={CONTAINER_TITLE}>Progress till next rank: Level 5</Text>
        <FlatLineChart
          current={70}
          needed={100}
          title="title"
          description="description"
          isLast={false}
        />
          <FlatLineChart
          current={20}
          needed={100}
          title="title 2"
          description="description 2"
          isLast={true}
        />
      </ComponentWrapper>

      <ComponentWrapper isTouchable={false}>
        <TouchableRow
          icon="history_backward_outline_28"
          title="title"
          description="description"
          isLast={false}
          onPress={() => {}}
        />
        <TouchableRow
          icon="money_wad_outline_28"
          title="title"
          description="description"
          isLast={true}
          onPress={() => {}}
        />
      </ComponentWrapper>

      <ComponentWrapper isTouchable={false}>
        <Text preset="boldTitle" style={CONTAINER_TITLE}>Graphic example</Text>
        <Text preset="description" style={CONTAINER_SUBTITLE}>Progress till next rank: Level 5</Text>

        <BezierChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [ { data: [25, 50, 33, 44, 10, 70, 88] } ]
          }}
        />
      </ComponentWrapper>

      <ComponentWrapper isTouchable={false}>
        <Text preset="boldTitle" style={CONTAINER_TITLE}>PieChart example</Text>
        <Text preset="description" style={CONTAINER_SUBTITLE}>Pie chart description</Text>

        <PieChart data={getPieChartData(data)} showList={true} />
      </ComponentWrapper>
    </>
  )
})
