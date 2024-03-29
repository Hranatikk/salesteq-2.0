import React, { FC, useEffect, useState, useRef } from "react"
import { View, FlatList, TextStyle, ViewStyle, Dimensions, Keyboard } from "react-native"

// Libs
import { showMessage } from "react-native-flash-message"

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
  RadioButton,
  HorizontalSlider,
  Button,
  STIcon,
  TextField,
  Loader,
  EmptyContent,
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

const BACK_BUTTON: ViewStyle = {
  position: "absolute",
  width: 50,
  height: 50,
  backgroundColor: color.dim,
  borderRadius: 25,
  top: spacing[7],
  left: spacing[4],
  marginHorizontal: spacing[0],
  justifyContent: "center",
  alignItems: "center",
}

const INPUT_CONTAINER: ViewStyle = {
  width: Dimensions.get("window").width,
  marginTop: spacing[5],
}

const BUTTON_SAVE: ViewStyle = {
  position: "absolute",
  bottom: 30,
  left: spacing[0],
  right: spacing[0],
}

const BUTTON_SAVE_DISABLED: ViewStyle = {
  position: "absolute",
  bottom: 30,
  left: spacing[0],
  right: spacing[0],
  opacity: 0.7,
}

const LIST_CONTAINER: TextStyle = {
  width: Dimensions.get("window").width,
  paddingHorizontal: spacing[4],
}

export const ProductsListScreen: FC<StackScreenProps<NavigatorParamList, "productsList">> =
  observer(() => {
    const [activeRadio, setActiveRadio] = useState<number | null>(null)
    const [currentStep, setStep] = useState<number>(1)
    const [invitedMail, changeInvitedMail] = useState<string>("")
    const sliderRef = useRef(null)
    const { firmStore } = useStores()
    const { firmProductsList, isProductsListFetching, isProductInProgressOfSaving } = firmStore

    useEffect(() => {
      fetchData()
    }, [])

    const fetchData = async () => {
      await firmStore.getFirmProducts()
    }

    const onSavePress = () => {
      if (currentStep === 1 && (activeRadio === 4 || activeRadio === 5)) {
        firmStore.sellProduct(
          activeRadio,
          firmProductsList.filter((i) => i.id === activeRadio)[0].price,
          () => onSuccessfullSave(),
        )
      }
      if (currentStep === 1 && activeRadio !== 4 && activeRadio !== 5) {
        setStep(2)
        sliderRef.current.scrollTo({ x: Dimensions.get("window").width })
      }
      if (currentStep === 2) {
        const isMailVaild = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(invitedMail)

        if (isMailVaild) {
          firmStore.inviteUserToNetwork(invitedMail, () =>
            firmStore.sellProduct(
              activeRadio,
              firmProductsList.filter((i) => i.id === activeRadio)[0].price,
              () => onSuccessfullSave(),
              "User successfully invited to your network",
            ),
          )
        } else {
          showMessage({
            message: "Please, enter a vaild user email",
            type: "danger",
            icon: "danger",
            position: "bottom",
          })
        }
      }
    }

    const onSuccessfullSave = () => {
      onBackPress()
      setActiveRadio(null)
      changeInvitedMail("")
    }

    const onBackPress = () => {
      setStep(1)
      sliderRef.current.scrollTo({ x: 0 })
      Keyboard.dismiss()
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

    const isButtonDisabled =
      activeRadio === null ||
      (activeRadio !== 4 && activeRadio !== 5 && currentStep === 2 && invitedMail.length <= 0)

    return (
      <View testID="ProductsListScreen" style={FULL}>
        {isProductInProgressOfSaving ? <Loader /> : null}
        <SimpleBackground />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Header headerTx="productsScreen.title" style={HEADER} titleStyle={HEADER_TITLE} />

          {currentStep === 2 ? (
            <Button activeOpacity={0.8} onPress={() => onBackPress()} style={BACK_BUTTON}>
              <STIcon icon="chevron_back_28" color={color.palette.white} size={25} />
            </Button>
          ) : null}

          <HorizontalSlider innerRef={sliderRef}>
            <FlatList
              keyExtractor={(item) => `radio_prod_${item.id}`}
              data={firmProductsList}
              renderItem={({ item }) => renderItem(item)}
              refreshing={isProductsListFetching}
              contentContainerStyle={LIST_CONTAINER}
              ListEmptyComponent={() => (
                <EmptyContent
                  title={translate("productsScreen.noProducts")}
                  imageURI={require("../../../assets/images/vector/tired.png")}
                />
              )}
            />

            <View style={INPUT_CONTAINER}>
              <TextField
                placeholder={translate("settingsScreen.email")}
                label={translate("productsScreen.inviteUser")}
                value={invitedMail}
                onChangeText={(text: string) => changeInvitedMail(text)}
                icon="mail_outline_28"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </HorizontalSlider>

          <Button
            key={`button_save_${isButtonDisabled ? "disabled" : "enabled"}`}
            text={translate(
              activeRadio === 4 || activeRadio === 5 || currentStep === 2
                ? "common.save"
                : "common.nextStep",
            )}
            preset="primary"
            style={isButtonDisabled ? BUTTON_SAVE_DISABLED : BUTTON_SAVE}
            activeOpacity={0.8}
            disabled={isButtonDisabled}
            onPress={() => (isButtonDisabled ? {} : onSavePress())}
          />
        </Screen>
      </View>
    )
  })
