import React, { FC, useEffect } from "react"
import { View, TextStyle, ViewStyle, FlatList } from "react-native"

// State
import { observer } from "mobx-react-lite"
import { useStores } from "../../models"

// Navigation
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"

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
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}

const HEADER_TITLE: TextStyle = {
  fontSize: 18,
  textAlign: "center",
}

export const AnalyticsScreen: FC<StackScreenProps<NavigatorParamList, "analytics">> = observer(
  function AnalyticsScreen() {
    const { profileStore } = useStores()
    const { profile, profileStats, isProfileFetching, errorGetProfile } = profileStore

    useEffect(() => {
      fetchData()
    }, [])

    const fetchData = async () => {
      await profileStore.getProfile()
    }

    return (
      <View testID="AnalyticsScreen" style={FULL}>
        <SimpleBackground />
        {isProfileFetching ? (
          <ContentLoader />
        ) : (
          <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
            <Header headerTx="analyticsScreen.title" style={HEADER} titleStyle={HEADER_TITLE} />

            {errorGetProfile !== null ? (
              <EmptyContent
                title={translate("errors.somethingWentWrong")}
                subtitle={errorGetProfile}
                imageURI={require("../../../assets/images/mascot/mascot-404.png")}
                primaryButtonText={translate("common.tryAgain")}
                onPrimaryButtonClick={() => fetchData()}
              />
            ) : (
              <FlatList
                keyExtractor={(item) => `event_${item.id}`}
                data={[]}
                renderItem={() => <></>}
                refreshing={isProfileFetching}
                onRefresh={() => fetchData()}
                contentContainerStyle={{ flexGrow: 1 }}
                ListHeaderComponent={() => (
                  <UserAnalytics profile={profile} profileStats={profileStats} />
                )}
              />
            )}
          </Screen>
        )}
      </View>
    )
  },
)
