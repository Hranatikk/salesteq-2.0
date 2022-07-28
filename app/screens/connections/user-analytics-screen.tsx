import React, { FC, useEffect, useState } from "react"
import { View, TextStyle, ViewStyle } from "react-native"

// State
import { observer } from "mobx-react-lite"
import { Profile, ProfileStatsOnly } from "../../models/profile/profile"

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
  UserAnalytics,
  ContentLoader
} from "../../components"

// Utils
import { translate } from "../../i18n/"

// Styles
import { color, spacing } from "../../theme"

const FULL: ViewStyle = {
  flex: 1,
}

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}

const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[0],
  paddingTop: spacing[3],
}

const HEADER_TITLE: TextStyle = {
  fontSize: 18,
  textAlign: "center",
}

export const UserAnalyticsScreen: FC<StackScreenProps<NavigatorParamList, "userAnalytics">> = observer(
  ({ navigation, route }) => {
    const profileApi = new ProfileApi;
    const [user, setUser] = useState<Profile | null>(null);
    const [userStats, setUserStats] = useState<ProfileStatsOnly | null>(null)
    const [isUserStatsFetching, setUserStatsFetching] = useState<boolean>(true)

    useEffect(() => {  
      fetchData()
    }, [])

    const fetchData = async () => {
      const { user } = route.params;
      setUser(user ? user : {});

      const response = await profileApi.getProfileStats(user.id);
      setUserStats(response.data)
      setUserStatsFetching(false)
    }

    return (
      <View testID="AnalyticsScreen" style={FULL}>
        <SimpleBackground />
        {isUserStatsFetching
          ? <ContentLoader />
          : (
            <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
              <Header
                headerText={`${user.first_name}'s ${translate("analyticsScreen.analytics")}`}
                style={HEADER}
                titleStyle={HEADER_TITLE}
                leftIcon="arrow_left_outline_28"
                onLeftPress={() => navigation.goBack()}
              />

              <UserAnalytics profile={user} profileStats={userStats} />
            </Screen>
          )
        }
      </View>
    )
})
