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

const INPUT_CONTAINER: ViewStyle = {
  width: Dimensions.get("window").width,
  paddingHorizontal: spacing[4]
}

const BUTTON_SAVE: ViewStyle = {
  position: "absolute",
  bottom: 30,
  left: spacing[4],
  right: spacing[4]
}

const BUTTON_SAVE_INACTIVE: ViewStyle = {
  position: "absolute",
  bottom: 30,
  left: spacing[4],
  right: spacing[4],
  opacity: 0.7
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
    const [currentStep, setStep] = useState<number>(1)
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

    const onSavePress = () => {
      if(currentStep === 1) {
        setStep(2);
        sliderRef.current.scrollTo({ x: Dimensions.get("window").width })
      }
    }

    const BUTTON_STYLE = activeRadio === null ? BUTTON_SAVE_INACTIVE : BUTTON_SAVE
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

            <View style={INPUT_CONTAINER}>
              <Text>'asdasd</Text>
            </View>
          </HorizontalSlider>

          <Button
            text={translate((activeRadio === 4 || activeRadio === 5) ? "common.save" : "common.nextStep")}
            preset="primary"
            style={BUTTON_STYLE}
            activeOpacity={0.8}
            onPress={() => activeRadio === null ? onSavePress() : {}}
            isDisabled={activeRadio == null}
          />
        </Screen>
      </View>
    )
  }
)
