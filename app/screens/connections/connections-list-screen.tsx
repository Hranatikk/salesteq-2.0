import React, { FC } from "react"
import { View, FlatList, TextStyle, ViewStyle, ImageStyle, Dimensions } from "react-native"

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
  Button,
  Card,
  Text,
  AutoImage
} from "../../components"

// Utils
import { translate } from "../../i18n/"

// Styles
import { color, spacing } from "../../theme"

const FULL: ViewStyle = {
  flex: 1,
}

const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}

const HEADER_TITLE: TextStyle = {
  fontSize: 18,
  textAlign: "center",
}

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}

const EMPTY_IMAGE: ImageStyle = {
  height: Dimensions.get("window").height/4,
  width: (Dimensions.get("window").height/4)*1.5
}

const EMPTY_CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const EMPTY_TEXT: TextStyle = {
  textAlign: "center",
  marginTop: spacing[7]
}

const BUTTON_ADD: ViewStyle = {
  marginTop: spacing[4],
  width: Dimensions.get("window").width/1.5
}

const fakeUsers = [
  {
    id: 0,
    data: {
      turnover: 100
    },
    first_name: "Gleb",
    last_name: "Skrypinski",
    email: "g.skripinsky@gmail.com",
  },
];


export const ConnectionsScreen: FC<StackScreenProps<NavigatorParamList, "connectionsList">> = observer(function ConnectionsScreen() {
  const renderItem = (item) => {
    return (
      <Card
        title={`${item.first_name} ${item.last_name}`}
        subtitle={item.email}
        onPress={() => {}}
        statusText="Status: Gold"
        statusTextColor={color.palette.green}
        iconName="dollar_outline_28"
        iconText={item.data?.turnover ? `${item.data.turnover} BYN` : "text"}
        iconTextColor={color.palette.grey}
      />
    )
  }

  return (
    <View testID="ConnectionsScreen" style={FULL}>
      <SimpleBackground />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerTx="connectionsScreen.title"
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />

        <FlatList
          keyExtractor={(item) => `event_${item.id}`}
          data={[]}
          renderItem={({item}) => renderItem(item)}
          // refreshing={isFetching}
          // onRefresh={() => this.loadInfo()}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={() => (
            <View style={EMPTY_CONTAINER}>
              <AutoImage source={require("../../../assets/images/mascot/mascot-empty_box.png")} style={EMPTY_IMAGE} />
              <Text preset="title" style={EMPTY_TEXT}>{translate("connectionsScreen.noConnectionsInOwnNetwork")}</Text>
              <Button
                preset="primary"
                text={translate("connectionsScreen.addPartner")}
                onPress={() => console.log("e")}
                activeOpacity={0.8}
                style={BUTTON_ADD}
              />
            </View>
          )}
        />        
      </Screen>
    </View>
  )
})
