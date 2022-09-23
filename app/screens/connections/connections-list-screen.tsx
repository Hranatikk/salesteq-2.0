import React, { FC, useEffect } from "react"
import { View, FlatList, TextStyle, ViewStyle } from "react-native"

// State
import { observer } from "mobx-react-lite"
import { useStores } from "../../models"

// Navigation
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"

// Components
import { Screen, SimpleBackground, Header, Card, EmptyContent } from "../../components"

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

export const ConnectionsScreen: FC<StackScreenProps<NavigatorParamList, "connectionsList">> =
  observer(({ navigation }) => {
    const { profileStore } = useStores()
    const { profileConnections, isConnectionsFetching, errorGetConnections } = profileStore

    useEffect(() => {
      fetchData()
    }, [])

    const fetchData = async () => {
      await profileStore.getProfileConnections()
    }

    const renderItem = (item) => {
      return (
        <Card
          title={`${item.first_name} ${item.last_name}`}
          subtitle={item.email}
          onPress={() => navigation.push("userConnectionList", { user: item })}
          statusText="Status: Gold"
          statusTextColor={color.success}
          iconName={item.data.turnover ? "money_wad_outline_28" : null}
          iconText={item.data?.turnover ? `${item.data.turnover} BYN` : null}
          iconTextColor={color.dim}
        />
      )
    }

    return (
      <View testID="ConnectionsScreen" style={FULL}>
        <SimpleBackground />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Header headerTx="connectionsScreen.title" style={HEADER} titleStyle={HEADER_TITLE} />

          {errorGetConnections !== null ? (
            <EmptyContent
              title={translate("errors.somethingWentWrong")}
              subtitle={errorGetConnections}
              imageURI={require("../../../assets/images/mascot/mascot-404.png")}
              primaryButtonText={translate("common.tryAgain")}
              onPrimaryButtonClick={() => fetchData()}
            />
          ) : (
            <FlatList
              keyExtractor={(item) => `event_${item.id}`}
              data={profileConnections}
              renderItem={({ item }) => renderItem(item)}
              refreshing={isConnectionsFetching}
              onRefresh={() => fetchData()}
              contentContainerStyle={{ flexGrow: 1 }}
              ListEmptyComponent={() => (
                <EmptyContent
                  title={translate("connectionsScreen.noConnectionsInOwnNetwork")}
                  imageURI={require("../../../assets/images/mascot/mascot-empty_box.png")}
                  primaryButtonText={translate("connectionsScreen.addPartner")}
                  onPrimaryButtonClick={() => navigation.navigate("productsList")}
                />
              )}
            />
          )}
        </Screen>
      </View>
    )
  })
