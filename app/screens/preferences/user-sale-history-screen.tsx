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

export const UserSaleHistoryScreen: FC<StackScreenProps<NavigatorParamList, "userSaleHistory">> =
  observer(({ navigation, route }) => {
    const profileApi = new ProfileApi()
    const [currentTab, setCurrentTab] = useState<"sale" | "sale_with_structure">("sale")
    const [sales, setSales] = useState([])
    const [salesWithStructure, setSalesWithStructure] = useState([])
    const [isFetching, setIsFetching] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
      fetchData()
    }, [])

    const fetchData = async () => {
      const { user } = route.params

      if (user) {
        const sales = await profileApi.getUserSales(user.id, false)
        const salesWithStructure = await profileApi.getUserSales(user.id, true)

        if (sales.kind === "ok" && salesWithStructure.kind === "ok") {
          setSales(sales.data)
          setSalesWithStructure(salesWithStructure.data)
        } else {
          setError(
            translate("errors.errorOccured", {
              name: translate("common.userSalesLoading", { name: user?.first_name }),
            }),
          )
        }
        setIsFetching(false)
      } else {
        setIsFetching(false)
        setError(translate("errors.errorOccured", { name: translate("common.userSalesLoading") }))
      }
    }

    const renderItem = (item) => {
      return (
        <Card
          title={`${item.product.title} ${
            currentTab === "sale" ? "" : `from ${item.user.first_name} ${item.user.last_name}`
          }`}
          subtitle={`Sale #${item.id} at ${dayjs(item.datetime).format("DD MMMM YYYY hh:mm")}`}
          statusText={`Sale #${item.id}`}
          statusTextColor={color.palette.green}
          iconName="money_wad_outline_28"
          iconText={`${item.price} BYN`}
          iconTextColor={color.palette.grey}
        />
      )
    }

    return (
      <View testID="UserSaleHistoryScreen" style={FULL}>
        <SimpleBackground />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Header
            headerTx="userSaleHistory.title"
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
              keyExtractor={(item) => `sale_h_${item.id}`}
              data={currentTab === "sale" ? sales : salesWithStructure}
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
                    isActive={currentTab === "sale"}
                    text={translate("analyticsScreen.saleHistory")}
                    onPress={() => setCurrentTab("sale")}
                  />
                  <Tab
                    isActive={currentTab === "sale_with_structure"}
                    text={translate("analyticsScreen.saleHistoryWithStructure")}
                    onPress={() => setCurrentTab("sale_with_structure")}
                  />
                </ScrollView>
              )}
              ListEmptyComponent={() => (
                <EmptyContent
                  title={translate("userSaleHistory.noSales")}
                  imageURI={require("../../../assets/images/mascot/mascot-empty_box.png")}
                />
              )}
            />
          )}
        </Screen>
      </View>
    )
  })
