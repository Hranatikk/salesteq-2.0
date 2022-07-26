import React, { FC } from "react"
import { View, TouchableOpacity, TextStyle, ViewStyle, Dimensions } from "react-native"

// State
import { observer } from "mobx-react-lite"

// Navigation
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"

// Components
import {
  Screen,
  SimpleBackground,
  Header,
  Text,
  TouchableRow,
  Divider
} from "../../components"

// Utils
import { getColorByString } from "../../utils/get-color-by-string"
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

const PROFILE_WRAPPER: ViewStyle = {
  flexDirection: "column",
  marginBottom: spacing[4]
}

const PROFILE_AVATAR_WRAPPER: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  marginBottom: spacing[5],
}

const PROFILE_AVATAR_CONTAINER: ViewStyle = {
  width: 100,
  height: 100,
  borderRadius: 50,
  justifyContent: "center",
  alignItems: "center",
}

const PROFILE_INFO: ViewStyle = {
  marginTop: spacing[4],
  marginHorizontal: spacing[4],
  flexDirection: "row",
  justifyContent: "space-between",
}

const PROFILE_INFO_CONTAINER: ViewStyle = {
  flexDirection: "column",
  width: (Dimensions.get('window').width - 30)/2,
  marginBottom: 15,
}

const SETTINGS_CONTAINER: ViewStyle = {
  marginHorizontal: spacing[4],
}

const LOGOUT_BUTTON: ViewStyle = {
  alignSelf: 'center',
  marginBottom: spacing[7],
}

export const SettingsScreen: FC<StackScreenProps<NavigatorParamList, "settings">> = observer(function SettingsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const renderInfoItem = (title:string, subtitle:string) => {
    return (
      <View style={PROFILE_INFO_CONTAINER}>
        <Text preset="description">{title}</Text>
        <Text preset="title">{subtitle}</Text>
      </View>
    );
  }


  return (
    <View testID="SettingsScreen" style={FULL}>
      <SimpleBackground />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header
          headerTx="settingsScreen.title"
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />

        <View style={PROFILE_WRAPPER}>
          <View style={PROFILE_AVATAR_WRAPPER}>
            <View style={[PROFILE_AVATAR_CONTAINER, { backgroundColor: getColorByString("John Doee") }]}>
              <Text preset="header" style={{color: color.palette.white}}>{"John".slice(0, 1)} {"Doee".slice(0, 1)}</Text>
            </View>
          </View>

          <View style={PROFILE_INFO}>
            {renderInfoItem(translate("settingsScreen.name"), "John")}
            {renderInfoItem(translate("settingsScreen.surname"), "Doee")}
          </View>
          <View style={PROFILE_INFO}>
            {renderInfoItem(translate("settingsScreen.company"), "SmartUp")}
            {renderInfoItem(translate("settingsScreen.status"), "Level 2")}
          </View>
          <View style={PROFILE_INFO}>
            {renderInfoItem(translate("settingsScreen.email"), "head@smartup.com")}
          </View>
        </View>

        <Divider horizontal={spacing[4]} bottom={spacing[5]} style={{ backgroundColor: color.palette.grey }} />

        <View style={SETTINGS_CONTAINER}>
          <TouchableRow
            icon="hieroglyph_character_outline_28"
            title={translate("settingsScreen.language")}
            description="English"
            isLast={false}
            onPress={() => {}}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {}}
            style={LOGOUT_BUTTON}
          >
            <Text preset="title" style={{ color: color.palette.lightRed }}>{translate("settingsScreen.logout")}</Text>
          </TouchableOpacity>
        </View>
        
      </Screen>
    </View>
  )
})