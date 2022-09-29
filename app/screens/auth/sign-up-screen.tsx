import React, { FC, useState, useRef } from "react"
import {
  View,
  ViewStyle,
  Dimensions,
  Keyboard,
  TextStyle,
  TouchableOpacity,
  ScrollView,
} from "react-native"

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
  Button,
  TextField,
  AutoImage,
  Text,
  CodeInput,
  Loader,
  HorizontalSlider,
} from "../../components"

// Utils
import { translate } from "../../i18n/"

// Styles
import { color, spacing } from "../../theme"
// import { ScrollView } from "react-native-gesture-handler"

const FULL: ViewStyle = {
  flex: 1,
}

const STEP_CONTAINER: TextStyle = {
  width: Dimensions.get("window").width,
  paddingHorizontal: spacing[4],
  paddingTop: Dimensions.get("window").height / 4,
}

const SECOND_STEP_CONTAINER: ViewStyle = {
  width: Dimensions.get("window").width,
  // paddingHorizontal: spacing[4],
}

const CODE_DESCRIPTION: TextStyle = {
  textAlign: "center",
  marginBottom: spacing[6],
}

const BUTTON_SIGN_UP: ViewStyle = {
  position: "absolute",
  bottom: 30,
  left: spacing[0],
  right: spacing[0],
}

const BUTTON_SIGN_UP_DISABLED: ViewStyle = {
  position: "absolute",
  bottom: 30,
  left: spacing[0],
  right: spacing[0],
  opacity: 0.7,
}

const INPUT: ViewStyle = {
  marginTop: 0,
}

const SIGN_IN_TEXT_CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  marginTop: spacing[6],
  marginHorizontal: spacing[6],
  maxWidth: "80%",
  flexWrap: "wrap",
}

const SIGN_IN_BUTTON: ViewStyle = {
  marginLeft: spacing[2],
  marginTop: spacing[1],
  paddingBottom: spacing[0],
}

const SIGN_IN_BUTTON_TEXT: TextStyle = {
  color: color.primary,
  fontSize: 16,
}

const ERROR_MESSAGE: TextStyle = {
  marginHorizontal: spacing[4],
}

export const SignUpScreen: FC<StackScreenProps<NavigatorParamList, "signUp">> = observer(
  function SignUpScreen({ navigation }) {
    const sliderRef = useRef(null)
    const [currentStep, setCurrentStep] = useState<number>(1)
    const [code, changeCode] = useState<string>("")
    const [email, changeEmail] = useState<string>("")
    const [password, changePassword] = useState<string>("")
    const { profileStore } = useStores()

    const onSignUpPress = async () => {
      if (currentStep === 1) {
        setCurrentStep(2)
        sliderRef.current.scrollTo({ x: Dimensions.get("window").width })
        Keyboard.dismiss()
      }
    }

    const isButtonDisabled = currentStep === 1 && code.length < 8

    return (
      <View testID="SignUpScreen" style={FULL}>
        <SimpleBackground />
        {profileStore.isTokenFetching ? <Loader /> : null}
        <Screen preset="fixed" backgroundColor={color.transparent}>
          <HorizontalSlider innerRef={sliderRef}>
            <View style={STEP_CONTAINER}>
              <Text preset="description" style={CODE_DESCRIPTION}>
                {translate("authScreen.enterInvitationCode")}
              </Text>

              <CodeInput value={code} setValue={changeCode} />

              {profileStore.errorGetAccessToken !== null ? (
                <Text preset="error" style={ERROR_MESSAGE}>
                  {profileStore.errorGetAccessToken}
                </Text>
              ) : null}

              <View style={SIGN_IN_TEXT_CONTAINER}>
                <Text preset="description" style={{ marginTop: 5 }}>
                  {translate("authScreen.alreadyHaveAnAccount")}
                </Text>

                <TouchableOpacity
                  onPress={() => navigation.navigate("signIn")}
                  style={SIGN_IN_BUTTON}
                  activeOpacity={0.8}
                >
                  <Text style={SIGN_IN_BUTTON_TEXT}>{translate("authScreen.signIn")}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView style={SECOND_STEP_CONTAINER}>
              <TextField
                placeholder={translate("authScreen.enterEmail")}
                value={email}
                onChangeText={(text: string) => changeEmail(text)}
                icon="mail_outline_28"
                keyboardType="email-address"
                autoCapitalize="none"
                textContentType="emailAddress"
                autoComplete="off"
                style={INPUT}
              />
              <TextField
                placeholder={translate("authScreen.enterEmail")}
                value={email}
                onChangeText={(text: string) => changeEmail(text)}
                icon="mail_outline_28"
                keyboardType="email-address"
                autoCapitalize="none"
                textContentType="emailAddress"
                autoComplete="off"
                style={INPUT}
              />
              <TextField
                placeholder={translate("authScreen.enterEmail")}
                value={email}
                onChangeText={(text: string) => changeEmail(text)}
                icon="mail_outline_28"
                keyboardType="email-address"
                autoCapitalize="none"
                textContentType="emailAddress"
                autoComplete="off"
                style={INPUT}
              />
              <TextField
                placeholder={translate("authScreen.enterPassword")}
                value={password}
                onChangeText={(text: string) => changePassword(text)}
                icon="key_outline_28"
                secureTextEntry={true}
                autoCapitalize="none"
                autoComplete="off"
                textContentType="password"
                style={INPUT}
              />
            </ScrollView>
          </HorizontalSlider>

          <Button
            disabled={isButtonDisabled}
            key={`button_${isButtonDisabled ? "disabled" : "enabled"}`}
            text={currentStep === 1 ? translate("common.nextStep") : translate("authScreen.signUp")}
            preset="primary"
            style={isButtonDisabled ? BUTTON_SIGN_UP_DISABLED : BUTTON_SIGN_UP}
            activeOpacity={0.8}
            onPress={() => onSignUpPress()}
          />
        </Screen>
      </View>
    )
  },
)
