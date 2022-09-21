import "./i18n"
import "./utils/ignore-warnings"
import React, { useState, useEffect } from "react"
import { View, ViewStyle, TextStyle, Dimensions, Text } from "react-native"
import FlashMessage from "react-native-flash-message"
import SplashScreen from "react-native-splash-screen"
import { PortalProvider } from "@gorhom/portal"
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"
import * as storage from "./utils/storage"
import { AppNavigator, useNavigationPersistence } from "./navigators"
import { RootStore, RootStoreProvider, setupRootStore } from "./models"
import { ToggleStorybook } from "../storybook/toggle-storybook"
import { ErrorBoundary } from "./screens/error/error-boundary"
import { STIcon } from "./components"
import { spacing, color } from "./theme"

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

const MESSAGE_CONTAINER: ViewStyle = {
  width: Dimensions.get("window").width - spacing[6],
  height: spacing[8],
  borderRadius: spacing[2],
  marginHorizontal: spacing[4],
  marginBottom: 108,
  paddingVertical: spacing[1],
  paddingHorizontal: spacing[2],
  justifyContent: "center",
}

const MESSAGE_CONTENT: ViewStyle = {
  flexDirection: "row",
}

const MESSAGE_TEXT: TextStyle = {
  color: color.palette.white,
  fontSize: 16,
}

const MESSAGE_DANGER: ViewStyle = {
  backgroundColor: color.error,
}

const MESSAGE_SUCCESS: ViewStyle = {
  backgroundColor: color.success,
}

const ICON_CONTAINER: ViewStyle = {
  marginRight: spacing[1],
  width: spacing[5],
  height: spacing[5],
}

function App() {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    (async () => {
      // SplashScreen.hide()
      setupRootStore().then(setRootStore)
    })()
  }, [])

  const renderFlashMessage = (props) => {
    return (
      <View
        style={[
          MESSAGE_CONTAINER,
          props.icon.icon === "danger" && MESSAGE_DANGER,
          props.icon.icon === "success" && MESSAGE_SUCCESS,
        ]}
      >
        <View style={MESSAGE_CONTENT}>
          {props.icon ? (
            <View style={ICON_CONTAINER}>
              <STIcon
                icon={props.icon.icon === "danger" ? "error_outline_28" : "check_circle_outline_28"}
                color={color.palette.white}
                size={spacing[5]}
              />
            </View>
          ) : null}
          <Text style={MESSAGE_TEXT}>{props.message.message}</Text>
        </View>
      </View>
    )
  }

  if (!rootStore || !isNavigationStateRestored) return null

  return (
    <ToggleStorybook>
      <RootStoreProvider value={rootStore}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <PortalProvider>
            <ErrorBoundary catchErrors={"always"}>
              <AppNavigator
                initialState={initialNavigationState}
                onStateChange={onNavigationStateChange}
              />

              <FlashMessage MessageComponent={renderFlashMessage} />
            </ErrorBoundary>
          </PortalProvider>
        </SafeAreaProvider>
      </RootStoreProvider>
    </ToggleStorybook>
  )
}

export default App
