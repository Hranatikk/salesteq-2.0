import React, { FC, useEffect, useState } from "react"
import { View, FlatList, TextStyle, ViewStyle } from "react-native"

// State
import { observer } from "mobx-react-lite"
import { Profile } from "../../models/profile/profile-model"

// Navigation
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"

// API
import { ProfileApi } from "../../services/api/profile-api"

// Components
import {
  Screen,
  SimpleBackground,
  Header,
  ComponentWrapper,
  Card,
  Text,
  STIcon,
  EmptyContent
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
  paddingHorizontal: spacing[1],
  paddingTop: spacing[3],
}

const HEADER_TITLE: TextStyle = {
  fontSize: 18,
  textAlign: "center",
}

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}

const COMPONENT_TITLE: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
  marginBottom: spacing[3],
}

const COMPONENT_SUBTITLE: TextStyle = {
  fontSize: 14,
}

const COMPONENT_ICON: ViewStyle = {
  position: "absolute",
  right: spacing[2],
  top: spacing[2],
}

export const UserConnectionListScreen: FC<
  StackScreenProps<NavigatorParamList, "userConnectionList">
> = observer(({ navigation, route }) => {
  const profileApi = new ProfileApi()
  const [connections, setConnections] = useState<Profile[]>([])
  const [user, setUser] = useState<Profile | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { user } = route.params
    setUser(user ? user : {})

    if (user) {
      const response = await profileApi.getProfileConnectionsByUserId(user.id)
      setConnections(response.data)
    }
  }

  const renderItem = (item) => {
    return (
      <Card
        title={`${item.first_name} ${item.last_name}`}
        subtitle={item.email}
        onPress={() => navigation.push("userConnectionList", { user: item })}
        statusText="Status: Gold"
        statusTextColor={color.palette.green}
        iconName={item.data.turnover ? "money_wad_outline_28" : null}
        iconText={item.data?.turnover ? `${item.data.turnover} BYN` : null}
        iconTextColor={color.palette.grey}
      />
    )
  }

  return (
    <View testID="UserConnectionListScreen" style={FULL}>
      <SimpleBackground />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerText={`${user?.first_name}'s ${translate("userConnectionsScreen.title")}`}
          style={HEADER}
          titleStyle={HEADER_TITLE}
          leftIcon="arrow_left_outline_28"
          onLeftPress={() => navigation.goBack()}
        />

        <ComponentWrapper
          isTouchable={true}
          onPress={() => navigation.navigate("userAnalytics", { user: user })}
        >
          <Text preset="title" style={COMPONENT_TITLE}>
            {user?.first_name} {user?.last_name}
          </Text>
          <Text preset="description" style={COMPONENT_SUBTITLE}>
            {translate("userConnectionsScreen.partnerDescription")}
          </Text>
          <STIcon
            icon="arrow_right_outline_28"
            size={20}
            color={color.palette.grey}
            style={COMPONENT_ICON}
          />
        </ComponentWrapper>

        <FlatList
          keyExtractor={(item) => `event_${item.id}`}
          data={connections}
          renderItem={({ item }) => renderItem(item)}
          refreshing={false}
          onRefresh={() => fetchData()}
          contentContainerStyle={{ marginTop: spacing[4] }}
          ListEmptyComponent={() => (
            <EmptyContent
              title={translate("userConnectionsScreen.noConnectionsInNetwork")}
              imageURI={require("../../../assets/images/mascot/mascot-empty_box.png")}
            />
          )}
        />
      </Screen>
    </View>
  )
})
