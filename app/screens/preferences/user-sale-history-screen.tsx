import React, { FC, useEffect, useState } from "react"
import { View, FlatList, TextStyle, ViewStyle, ImageStyle, Dimensions, ScrollView } from "react-native"

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
import {
  Screen,
  SimpleBackground,
  Header,
  Card,
  Text,
  AutoImage,
  Tab
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
  marginBottom: spacing[5]
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


export const UserSaleHistoryScreen: FC<StackScreenProps<NavigatorParamList, "userSaleHistory">> = observer(
  ({ navigation, route }) =>  {
    const profileApi = new ProfileApi;   
    const [currentTab, setCurrentTab] = useState<"sale" | "sale_with_structure">("sale")
    const [sales, setSales] = useState([])
    const [salesWithStructure, setSalesWithStructure] = useState([]);
    const [isFetching, setIsFetching] = useState<boolean>(true)

    useEffect(() => {
      fetchData();
    }, [])

    const fetchData = async () => {
      const { user } = route.params;
      const sales = await profileApi.getUserSales(user.id, false)
      const salesWithStructure = await profileApi.getUserSales(user.id, true)

      setSales(sales.data)
      setSalesWithStructure(salesWithStructure.data)
      setIsFetching(false)
    }

    const renderItem = (item) => {
      return (
        <Card
          title={`${item.product.title} ${currentTab === "sale" ? "" : `from ${item.user.first_name} ${item.user.last_name}`}`}
          subtitle={`Sale #${item.id} at ${dayjs(item.datetime).format("DD MMMM YYYY hh:mm")}`}
          onPress={() => {}}
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

          <FlatList
            keyExtractor={(item) => `sale_h_${item.id}`}
            data={currentTab === "sale" ? sales : salesWithStructure}
            renderItem={({item}) => renderItem(item)}
            refreshing={isFetching}
            onRefresh={() => fetchData()}
            contentContainerStyle={{ flexGrow: 1 }}
            ListHeaderComponent={() => (
              <ScrollView horizontal={true} style={TAB_WRAPPER} showsHorizontalScrollIndicator={false}>
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
              <View style={EMPTY_CONTAINER}>
                <AutoImage source={require("../../../assets/images/mascot/mascot-empty_box.png")} style={EMPTY_IMAGE} />
                <Text preset="title" style={EMPTY_TEXT}>{translate("userSaleHistory.noSales")}</Text>
              </View>
            )}
          />        
        </Screen>
      </View>
    )
  }
)
