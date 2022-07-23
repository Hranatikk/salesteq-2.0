import React, { FC } from "react"
import { View } from "react-native"

// State
import { observer } from "mobx-react-lite"

// Navigation
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"

// Components
import { Screen, SimpleBackground, Header, ComponentWrapper, Text } from "../../components"

// Styles
import { color } from "../../theme"
import { FULL, HEADER, HEADER_TITLE, CONTAINER } from './styles';


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

        <Text preset="header" style={{ marginHorizontal: 15, marginBottom: 10 }}>John Doe Doeee</Text>
        <Text preset="description" style={{ marginHorizontal: 15, marginBottom: 10 }}>head@smartup.com</Text>

        <ComponentWrapper
          isTouchable={true}
          onPress={() => {}}
        >
          <Text>asd</Text>
        </ComponentWrapper>
        
      </Screen>
    </View>
  )
})
