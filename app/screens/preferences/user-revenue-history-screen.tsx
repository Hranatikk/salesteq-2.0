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
import { FirmApi } from "../../services/api/firm-api"

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


export const UserRevenueHistoryScreen: FC<StackScreenProps<NavigatorParamList, "userRevenueHistory">> = observer(
  ({ navigation, route }) =>  {
    const firmApi = new FirmApi;   
    const [currentTab, setCurrentTab] = useState<"revenue" | "revenue_with_structure">("revenue")
    const [revenues, setRevenues] = useState([])
    const [revenuesWithStructure, setRevenuesWithStructure] = useState([]);
    const [isFetching, setIsFetching] = useState<boolean>(true)

    useEffect(() => {
      fetchData();
    }, [])

    const fetchData = async () => {
      const { user } = route.params;
      const revenues = await firmApi.getUserRevenues(user.id, false)
      const revenuesWithStructure = await firmApi.getUserRevenues(user.id, true)

      setRevenues(revenues.data)
      setRevenuesWithStructure(revenuesWithStructure.data)
      setIsFetching(false)
    }

    const renderItem = (item) => {
      return (
        <Card
          title={`Revenue #${item.id} ${currentTab === "revenue" ? "" : `to ${item.user.first_name} ${item.user.last_name}`}`}
          subtitle={`Revenue at ${dayjs(item.datetime).format("DD MMMM YYYY hh:mm")}`}
          onPress={() => {}}
          statusText={`${item.status === "pending" ? "Status: Pending" : "Status: Processed"}`}
          statusTextColor={item.status === "pending" ? color.palette.blue : color.palette.green}
          iconName="money_wad_outline_28"
          iconText={`${item.amount.toFixed(2)} BYN`}
          iconTextColor={color.palette.grey}
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

          <FlatList
            keyExtractor={(item) => `revenue_h_${item.id}`}
            data={currentTab === "revenue" ? revenues : revenuesWithStructure}
            renderItem={({item}) => renderItem(item)}
            refreshing={isFetching}
            onRefresh={() => fetchData()}
            contentContainerStyle={{ flexGrow: 1 }}
            ListHeaderComponent={() => (
              <ScrollView horizontal={true} style={TAB_WRAPPER} showsHorizontalScrollIndicator={false}>
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
              <View style={EMPTY_CONTAINER}>
                <AutoImage source={require("../../../assets/images/mascot/mascot-empty_box.png")} style={EMPTY_IMAGE} />
                <Text preset="title" style={EMPTY_TEXT}>{translate("userSaleHistory.noRevenues")}</Text>
              </View>
            )}
          />        
        </Screen>
      </View>
    )
  }
)