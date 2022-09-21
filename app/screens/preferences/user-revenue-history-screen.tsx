import React, { FC, useEffect, useState } from "react"
import { View, FlatList, TextStyle, ViewStyle, ScrollView } from "react-native"

// Libs
import dayjs from "dayjs"

// State
import { observer } from "mobx-react-lite"

// Navigation
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"

// API
import { ProfileApi } from "../../services/api/profile-api"

// Components
import { Screen, SimpleBackground, Header, Card, EmptyContent, Tab } from "../../components"

// Utils
import { translate } from "../../i18n/"

// Styles
import { color, spacing } from "../../theme"

const FULL: ViewStyle = {
  flex: 1,
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

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}

const TAB_WRAPPER: ViewStyle = {
  backgroundColor: color.transparent,
  flexDirection: "row",
  marginHorizontal: spacing[4],
  marginBottom: spacing[5],
}

export const UserRevenueHistoryScreen: FC<
  StackScreenProps<NavigatorParamList, "userRevenueHistory">
> = observer(({ navigation, route }) => {
  const profileApi = new ProfileApi()
  const [currentTab, setCurrentTab] = useState<"revenue" | "revenue_with_structure">("revenue")
  const [revenues, setRevenues] = useState([])
  const [revenuesWithStructure, setRevenuesWithStructure] = useState([])
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { user } = route.params

    if (user) {
      const revenues = await profileApi.getUserRevenues(user.id, false)
      const revenuesWithStructure = await profileApi.getUserRevenues(user.id, true)

      if (revenues.kind === "ok" && revenuesWithStructure.kind === "ok") {
        setRevenues(revenues.data)
        setRevenuesWithStructure(revenuesWithStructure.data)
      } else {
        setError(
          translate("errors.errorOccured", {
            name: translate("common.userRevenueLoading", { name: user?.first_name }),
          }),
        )
      }
      setIsFetching(false)
    } else {
      setIsFetching(false)
      setError(translate("errors.errorOccured", { name: translate("common.userRevenueLoading") }))
    }
  }

  const renderItem = (item) => {
    return (
      <Card
        title={`Revenue #${item.id} ${
          currentTab === "revenue" ? "" : `to ${item.user.first_name} ${item.user.last_name}`
        }`}
        subtitle={`Revenue at ${dayjs(item.datetime).format("DD MMMM YYYY hh:mm")}`}
        statusText={`${item.status === "pending" ? "Status: Pending" : "Status: Processed"}`}
        statusTextColor={item.status === "pending" ? color.pending : color.success}
        iconName="money_wad_outline_28"
        iconText={`${item.amount.toFixed(2)} BYN`}
        iconTextColor={color.dim}
      />
    )
  }

  return (
    <View testID="UserRevenueHistoryScreen" style={FULL}>
      <SimpleBackground />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerTx="userSaleHistory.revenueHistory"
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
            keyExtractor={(item) => `revenue_h_${item.id}`}
            data={currentTab === "revenue" ? revenues : revenuesWithStructure}
            renderItem={({ item }) => renderItem(item)}
            refreshing={isFetching}
            onRefresh={() => fetchData()}
            contentContainerStyle={{ flexGrow: 1 }}
            ListHeaderComponent={() => (
              <ScrollView
                horizontal={true}
                style={TAB_WRAPPER}
                showsHorizontalScrollIndicator={false}
              >
                <Tab
                  isActive={currentTab === "revenue"}
                  text={translate("analyticsScreen.revenueHistory")}
                  onPress={() => setCurrentTab("revenue")}
                />
                <Tab
                  isActive={currentTab === "revenue_with_structure"}
                  text={translate("analyticsScreen.revenueHistoryWithStructure")}
                  onPress={() => setCurrentTab("revenue_with_structure")}
                />
              </ScrollView>
            )}
            ListEmptyComponent={() => (
              <EmptyContent
                title={translate("userSaleHistory.noRevenues")}
                imageURI={require("../../../assets/images/mascot/mascot-empty_box.png")}
              />
            )}
          />
        )}
      </Screen>
    </View>
  )
})
