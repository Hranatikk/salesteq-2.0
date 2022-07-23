import React, { FC } from "react"
import { View, TextStyle } from "react-native"

// State
import { observer } from "mobx-react-lite"

// Navigation
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"

// Components
import { Screen, SimpleBackground, Header, ComponentWrapper, Text, TextRow } from "../../components"

// Styles
import { color, spacing } from "../../theme"
import { FULL, HEADER, HEADER_TITLE, CONTAINER } from './styles';

const HEADER_TEXT: TextStyle = {
  marginHorizontal: spacing[4],
  marginBottom: spacing[2]
}

const CONTAINER_TITLE: TextStyle = {
  marginBottom: spacing[4]
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
          <TextRow leftText="leftText" rightText="rightText" isLast={false} />
          <TextRow leftText="leftText" rightText="rightText" isLast={true} />
        </ComponentWrapper>
        
      </Screen>
    </View>
  )
})
