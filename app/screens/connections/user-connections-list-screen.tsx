import React, { FC, useEffect, useState } from "react"
import { View, FlatList, TextStyle, ViewStyle, ImageStyle, Dimensions } from "react-native"

// State
import { observer } from "mobx-react-lite"
import { Profile } from "../../models/profile/profile"

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
  AutoImage,
  STIcon
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

const COMPONENT_TITLE: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
  marginBottom: spacing[3]
}

const COMPONENT_SUBTITLE: TextStyle = {
  fontSize: 14,
}

const COMPONENT_ICON: ViewStyle = {
  position: "absolute",
  right: spacing[2],
  top: spacing[2],
}


export const UserConnectionListScreen: FC<StackScreenProps<NavigatorParamList, "userConnectionList">> = observer(
  ({ navigation, route }) =>  {
    const profileApi = new ProfileApi;
    const [connections, setConnections] = useState<Profile[]>([]);
    const [user, setUser] = useState<Profile | null>(null);
    
    useEffect(() => {
      fetchData();
    }, [])

    const fetchData = async () => {
      const { user } = route.params;
      setUser(user ? user : {});

      if(user) {
        const response = await profileApi.getProfileConnectionsByUserId(user.id);
        setConnections(response.connections)
      }
    }

    const renderItem = (item) => {
      return (
        <Card
          title={`${item.first_name} ${item.last_name}`}
          subtitle={item.email}
          onPress={() => navigation.push("userConnectionList", {user: item})}
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
            // headerTx="userConnectionsScreen.title"
            headerText={`${user?.first_name}'s ${translate("userConnectionsScreen.title")}`}
            style={HEADER}
            titleStyle={HEADER_TITLE}
            leftIcon="arrow_left_outline_28"
            onLeftPress={() => navigation.goBack()}
          />

          <ComponentWrapper isTouchable={true} onPress={() => {}}>
            <Text preset="title" style={COMPONENT_TITLE}>{user?.first_name} {user?.last_name}</Text>
            <Text preset="description" style={COMPONENT_SUBTITLE}>{translate("userConnectionsScreen.partnerDescription")}</Text>
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
            renderItem={({item}) => renderItem(item)}
            refreshing={false}
            onRefresh={() => fetchData()}
            contentContainerStyle={{ marginTop: spacing[4] }}
            ListEmptyComponent={() => (
              <View style={EMPTY_CONTAINER}>
                <AutoImage source={require("../../../assets/images/mascot/mascot-empty_box.png")} style={EMPTY_IMAGE} />
                <Text preset="title" style={EMPTY_TEXT}>{translate("userConnectionsScreen.noConnectionsInNetwork")}</Text>
              </View>
            )}
          />        
        </Screen>
      </View>
    )
  }
)
