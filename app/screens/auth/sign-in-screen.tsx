import React, { FC, useState } from "react"
import { View, ViewStyle, Dimensions, ImageStyle, TextStyle, TouchableOpacity } from "react-native"

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
  Loader,
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
  flex: 1,
}

const BUTTON_SIGN_IN: ViewStyle = {
  position: "absolute",
  bottom: 30,
  left: spacing[0],
  right: spacing[0],
}

const LOGO: ImageStyle = {
  height: Dimensions.get("window").height / 5,
  width: (Dimensions.get("window").height / 5) * 1.16,
  alignSelf: "center",
}

const INPUT: ViewStyle = {
  marginTop: 0,
}

const SIGN_UP_TEXT_CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  marginTop: spacing[4],
  marginHorizontal: spacing[6],
  maxWidth: "80%",
  flexWrap: "wrap",
}

const SIGN_UP_BUTTON: ViewStyle = {
  marginLeft: spacing[2],
  marginTop: spacing[1],
  paddingBottom: spacing[0],
}

const SIGN_UP_BUTTON_TEXT: TextStyle = {
  color: color.primary,
  fontSize: 16,
}

const ERROR_MESSAGE: TextStyle = {
  marginHorizontal: spacing[4]
}

export const SignInScreen: FC<StackScreenProps<NavigatorParamList, "signIn">> = observer(
  function SignInScreen({ navigation }) {
    const [email, changeEmail] = useState<string>("")
    const [password, changePassword] = useState<string>("")
    const { profileStore } = useStores()

    const onSignInPress = async () => {
      await profileStore.signIn(email, password)
    }

    return (
      <View testID="SignInScreen" style={FULL}>
        <SimpleBackground />
        {profileStore.isTokenFetching ? <Loader /> : null}

        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <AutoImage source={require("../../../assets/images/logo.png")} style={LOGO} />
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
          {profileStore.errorGetAccessToken !== null ? <Text preset="error" style={ERROR_MESSAGE}>{profileStore.errorGetAccessToken}</Text> : null}

          <View style={SIGN_UP_TEXT_CONTAINER}>
            <Text preset="description" style={{ marginTop: 5 }}>
              {translate("authScreen.haveAnInvitationCode")}
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("settings")}
              style={SIGN_UP_BUTTON}
              activeOpacity={0.8}
            >
              <Text style={SIGN_UP_BUTTON_TEXT}>{translate("authScreen.signUp")}</Text>
            </TouchableOpacity>
          </View>

          <Button
            text={translate("authScreen.signIn")}
            preset="primary"
            style={BUTTON_SIGN_IN}
            activeOpacity={0.8}
            onPress={() => onSignInPress()}
          />
        </Screen>
      </View>
    )
  },
)
