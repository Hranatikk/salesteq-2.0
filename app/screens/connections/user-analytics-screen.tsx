import React, { FC, useEffect, useState } from "react"
import { View, TextStyle, ViewStyle, FlatList } from "react-native"

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
  UserAnalytics,
  ContentLoader,
  EmptyContent,
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

export const UserAnalyticsScreen: FC<StackScreenProps<NavigatorParamList, "userAnalytics">> =
  observer(({ navigation, route }) => {
    const profileApi = new ProfileApi()
    const [user, setUser] = useState<Profile | null>(null)
    const [userStats, setUserStats] = useState(null)
    const [isUserStatsFetching, setUserStatsFetching] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
      fetchData()
    }, [])

    const fetchData = async () => {
      const { user } = route.params
      setUser(user ? user : {})

      if (user) {
        const response = await profileApi.getProfileStats(user.id)

        if (response.kind === "ok") {
          setUserStats(response.data)
        } else {
          setError(
            translate("errors.errorOccured", {
              name: translate("common.userProfileStatsLoading", { name: user?.first_name }),
            }),
          )
        }
        setUserStatsFetching(false)
      } else {
        setError(
          translate("errors.errorOccured", { name: translate("common.userProfileStatsLoading") }),
        )
        setUserStatsFetching(false)
      }
    }

    return (
      <View testID="UserAnalyticsScreen" style={FULL}>
        <SimpleBackground />
        {isUserStatsFetching ? (
          <ContentLoader />
        ) : (
          <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
            <Header
              headerText={`${user.first_name}'s ${translate("analyticsScreen.analytics")}`}
              style={HEADER}
              titleStyle={HEADER_TITLE}
              leftIcon="arrow_left_outline_28"
              onLeftPress={() => navigation.goBack()}
            />

            {error !== null ? (
              <EmptyContent
                title={translate("errors.somethingWentWrong")}
                subtitle={error}
                imageURI={require("../../../assets/images/mascot/mascot-404.png")}
                primaryButtonText={translate("common.tryAgain")}
                onPrimaryButtonClick={() => fetchData()}
              />
            ) : (
              <FlatList
                keyExtractor={(item) => `event_${item.id}`}
                data={[]}
                renderItem={() => <></>}
                refreshing={isUserStatsFetching}
                onRefresh={() => fetchData()}
                contentContainerStyle={{ flexGrow: 1 }}
                ListHeaderComponent={() => (
                  <UserAnalytics profile={user} profileStats={userStats} />
                )}
              />
            )}
          </Screen>
        )}
      </View>
    )
  })
