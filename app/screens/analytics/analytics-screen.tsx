import React, { FC, useEffect } from "react"
import { View, TextStyle, ViewStyle } from "react-native"

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
  UserAnalytics,
  ContentLoader
} from "../../components"

// Styles
import { color, spacing } from "../../theme"

import { useStores } from "../../models"

const FULL: ViewStyle = {
  flex: 1,
}

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
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

export const AnalyticsScreen: FC<StackScreenProps<NavigatorParamList, "analytics">> = observer(function AnalyticsScreen() {
  const { profileStore } = useStores()
  const { profile, profileStats, isProfileFetching } = profileStore

  useEffect(() => {
    async function fetchData() {
      await profileStore.getProfile()
    }

    fetchData()
  }, [])

  return (
    <View testID="AnalyticsScreen" style={FULL}>
      <SimpleBackground />
      {isProfileFetching
        ? <ContentLoader />
        : (
          <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
            <Header
              headerTx="analyticsScreen.title"
              style={HEADER}
              titleStyle={HEADER_TITLE}
            />

            <UserAnalytics profile={profile} profileStats={profileStats} />
          </Screen>
        )
      }
    </View>
  )
})
