import React, { FC, useEffect } from "react"
import { View, TouchableOpacity, TextStyle, ViewStyle, Dimensions } from "react-native"

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

const HEADER_DESCRIPTION: TextStyle = {
  marginBottom: spacing[1]
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
  const { profileStore, firmStore } = useStores()
  const { profile, profileStats } = profileStore;
  const { firm } = firmStore;

  useEffect(() => {
    async function fetchData() {
      await firmStore.getFirm()
    }

    fetchData();
  }, [])

  const renderInfoItem = (title:string, subtitle:string) => {
    return (
      <View style={PROFILE_INFO_CONTAINER}>
        <Text preset="description" style={HEADER_DESCRIPTION}>{title}</Text>
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
            <View style={[PROFILE_AVATAR_CONTAINER, { backgroundColor: getColorByString(`${profile?.first_name} ${profile?.last_name}`) }]}>
              <Text preset="header" style={{color: color.palette.white}}>{profile?.first_name.slice(0, 1)} {profile?.last_name.slice(0, 1)}</Text>
            </View>
          </View>

          <View style={PROFILE_INFO}>
            {renderInfoItem(translate("settingsScreen.name"), profile?.first_name)}
            {renderInfoItem(translate("settingsScreen.surname"), profile?.last_name)}
          </View>
          <View style={PROFILE_INFO}>
            {renderInfoItem(translate("settingsScreen.company"), firm?.title)}
            {renderInfoItem(translate("settingsScreen.status"), profileStats?.leveling.current.title.toString())}
          </View>
          <View style={PROFILE_INFO}>
            {renderInfoItem(translate("settingsScreen.email"), profile?.email)}
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
