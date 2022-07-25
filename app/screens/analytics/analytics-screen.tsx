import React, { FC } from "react"
import { View, TextStyle } from "react-native"

// State
import { observer } from "mobx-react-lite"

// Navigation
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"

// Components
import {
  Screen,
  SimpleBackground,
  Header,
  ComponentWrapper,
  Text,
  TextRow,
  FlatLineChart,
  TouchableRow,
  BezierChart,
  PieChart,
  Card
} from "../../components"

// Utils
import { getColorByString } from "../../utils/get-color-by-string"

// Styles
import { color, spacing } from "../../theme"
import { FULL, HEADER, HEADER_TITLE, CONTAINER } from './styles';

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

export const AnalyticsScreen: FC<StackScreenProps<NavigatorParamList, "analytics">> = observer(function AnalyticsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

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


  return (
    <View testID="AnalyticsScreen" style={FULL}>
      <SimpleBackground />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header
          headerTx="analyticsScreen.title"
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />

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

        <Card
          title="Title"
          subtitle="Subtitle"
          onPress={() => console.log('e')}
          iconName="game_outline_28"
          iconText="Icon description"
          iconTextColor={color.palette.grey}
          statusText="Status: Gold"
          statusTextColor={color.palette.red}
        />
        
      </Screen>
    </View>
  )
})
