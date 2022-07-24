import React, { FC } from "react"
import { View, TextStyle, Dimensions } from "react-native"

// Libs
import { LineChart } from 'react-native-chart-kit';

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
} from "../../components"

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

          <LineChart
            data={{
              labels: ["January", "February", "March", "April", "May", "June"],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100
                  ]
                }
              ]
            }}
            width={Dimensions.get('window').width-30}
            height={330}
            style={{marginLeft: -30}}
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
        </ComponentWrapper>
        
      </Screen>
    </View>
  )
})
