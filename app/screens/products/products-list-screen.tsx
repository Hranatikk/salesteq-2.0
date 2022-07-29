import React, { FC, useEffect, useState, useRef } from "react"
import { View, FlatList, TextStyle, ViewStyle, ImageStyle, Dimensions } from "react-native"

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
  Text,
  AutoImage,
  RadioButton,
  HorizontalSlider,
  Button
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
  paddingHorizontal: spacing[4],
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

const BUTTON_SAVE: ViewStyle = {
  position: "absolute",
  bottom: 30,
  left: spacing[4],
  right: spacing[4]
}

const EMPTY_TEXT: TextStyle = {
  textAlign: "center",
  marginTop: spacing[7]
}

const LIST_CONTAINER: TextStyle = {
  width: Dimensions.get("window").width,
  paddingHorizontal: spacing[4]
}

export const ProductsListScreen: FC<StackScreenProps<NavigatorParamList, "productsList">> = observer(
  ({ navigation }) =>  {
    const [activeRadio, setActiveRadio] = useState<number|null>(null)
    const sliderRef = useRef(null)
    const { firmStore } = useStores()
    const { firmProducts, isProductsFetching } = firmStore

    useEffect(() => {
      fetchData();
    }, [])

    const fetchData = async () => {
      await firmStore.getFirmProducts()
    }

    const renderItem = (item) => {
      return (
        <RadioButton
          title={item.title}
          subtitle={item.description}
          isActive={activeRadio === item.id}
          onPress={() => setActiveRadio(item.id)}
        />
      )
    }

    return (
      <View testID="ProductsListScreen" style={FULL}>
        <SimpleBackground />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Header
            headerTx="productsScreen.title"
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />

          <HorizontalSlider innerRef={sliderRef}>
            <FlatList
              keyExtractor={(item) => `radio_prod_${item.id}`}
              data={firmProducts}
              renderItem={({item}) => renderItem(item)}
              refreshing={isProductsFetching}
              contentContainerStyle={LIST_CONTAINER}
              ListEmptyComponent={() => (
                <View style={EMPTY_CONTAINER}>
                  <AutoImage source={require("../../../assets/images/mascot/mascot-empty_box.png")} style={EMPTY_IMAGE} />
                  <Text preset="title" style={EMPTY_TEXT}>{translate("productsScreen.noProducts")}</Text>
                </View>
              )}
            />

            <View style={{ width: Dimensions.get("window").width }}>
              <Text>'asdasd</Text>
            </View>
          </HorizontalSlider>

          <Button
            text={translate("common.save")}
            preset="primary"
            style={BUTTON_SAVE}
            activeOpacity={0.8}
          />
        </Screen>
      </View>
    )
  }
)
