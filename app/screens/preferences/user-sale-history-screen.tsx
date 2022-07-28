import React, { FC, useEffect, useState } from "react"
import { View, FlatList, TextStyle, ViewStyle, ImageStyle, Dimensions } from "react-native"

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
  AutoImage
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
    const firmApi = new FirmApi;    
    const [sales, setSales] = useState([])
    const [salesWithStructure, setSalesWithStructure] = useState([]);
    const [isFetching, setIsFetching] = useState<boolean>(true)

    useEffect(() => {
      fetchData();
    }, [])

    const fetchData = async () => {
      const { user } = route.params;
      const sales = await firmApi.getUserSales(user.id, false)
      const salesWithStructure = await firmApi.getUserSales(user.id, true)

      setSales(sales.data)
      setSalesWithStructure(salesWithStructure.data)
      setIsFetching(false)
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
            keyExtractor={(item) => `event_${item.id}`}
            data={[]}
            renderItem={({item}) => renderItem(item)}
            refreshing={false}
            onRefresh={() => fetchData()}
            contentContainerStyle={{ flexGrow: 1 }}
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
