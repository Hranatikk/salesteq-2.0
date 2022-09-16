import React, { useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import { showMessage } from "react-native-flash-message"
import * as storage from "../utils/storage"
import { useStores } from "../models"
import { translate } from "../i18n"
import { ProfileApi } from "../services/api/profile-api"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import { STIcon, Loader } from "../components"
import { color } from "../theme"
import {
  AnalyticsScreen,
  SettingsScreen,
  CalendarScreen,
  ConnectionsScreen,
  UserConnectionListScreen,
  UserAnalyticsScreen,
  UserSaleHistoryScreen,
  UserRevenueHistoryScreen,
  ProductsListScreen,
  SignInScreen,
} from "../screens"

export type NavigatorParamList = {
  analytics: any
  settings: any
  calendar: any
  connectionsList: any
  userConnectionList: any
  userAnalytics: any
  userSaleHistory: any
  userRevenueHistory: any
  productsList: any
  signIn: any
}

const ACCESS_TOKEN_KEY = "@access_token"
const REFRESH_TOKEN_KEY = "@refresh_token"
const Stack = createNativeStackNavigator<NavigatorParamList>()
const Tab = createBottomTabNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="signIn"
    >
      <Stack.Screen name="signIn" component={SignInScreen} />
    </Stack.Navigator>
  )
}

const AnalyticsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="analytics"
    >
      <Stack.Screen name="analytics" component={AnalyticsScreen} />
      <Stack.Screen name="userSaleHistory" component={UserSaleHistoryScreen} />
      <Stack.Screen name="userRevenueHistory" component={UserRevenueHistoryScreen} />
    </Stack.Navigator>
  )
}

const CalendarStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="calendar"
    >
      <Stack.Screen name="calendar" component={CalendarScreen} />
    </Stack.Navigator>
  )
}

const ProductsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="productsList"
    >
      <Stack.Screen name="productsList" component={ProductsListScreen} />
    </Stack.Navigator>
  )
}

const ConnectionsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="connectionsList"
    >
      <Stack.Screen name="connectionsList" component={ConnectionsScreen} />
      <Stack.Screen name="userConnectionList" component={UserConnectionListScreen} />
      <Stack.Screen name="userAnalytics" component={UserAnalyticsScreen} />
      <Stack.Screen name="userSaleHistory" component={UserSaleHistoryScreen} />
      <Stack.Screen name="userRevenueHistory" component={UserRevenueHistoryScreen} />
    </Stack.Navigator>
  )
}

const SettingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="settings"
    >
      <Stack.Screen name="settings" component={SettingsScreen} />
    </Stack.Navigator>
  )
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: color.background },
      }}
      initialRouteName=""
    >
      <Tab.Screen
        name="analyticsStack"
        component={AnalyticsStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <STIcon
              icon="statistics_outline_28"
              color={focused ? color.palette.black : color.palette.grey}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="calendarStack"
        component={CalendarStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <STIcon
              icon="calendar_outline_28"
              color={focused ? color.palette.black : color.palette.grey}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="productsStack"
        component={ProductsStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <STIcon
              icon="add_square_outline_28"
              color={focused ? color.palette.black : color.palette.grey}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="connections"
        component={ConnectionsStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <STIcon
              icon="users_outline_28"
              color={focused ? color.palette.black : color.palette.grey}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="settingsStack"
        component={SettingsStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <STIcon
              icon="settings_outline_28"
              color={focused ? color.palette.black : color.palette.grey}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

type NavigationProps = Partial<React.ComponentProps<typeof NavigationContainer>>

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const [isContentLoading, setIsContentLoading] = useState<boolean>(true)
  const { profileStore } = useStores()
  const profileApi = new ProfileApi()

  useEffect(() => {
    checkUserCredentials()
  }, [])

  const checkUserCredentials = async () => {
    const authToken = await storage.load(ACCESS_TOKEN_KEY)
    if (authToken !== null && authToken !== "") {
      const refreshToken = await storage.load(REFRESH_TOKEN_KEY)
      const refreshingResult = await profileApi.refreshToken(refreshToken)

      if (refreshingResult.kind === "ok" && refreshingResult.data.access) {
        setIsContentLoading(false)
        storage.save(ACCESS_TOKEN_KEY, refreshingResult.data.access)
        await profileStore.saveAccessToken(refreshingResult.data.access)
      } else {
        setIsContentLoading(false)
        storage.remove(ACCESS_TOKEN_KEY)
        storage.remove(REFRESH_TOKEN_KEY)
        showMessage({
          message: translate("errors.sessionExpired"),
          type: "danger",
          icon: "danger",
          position: "bottom",
        })
      }
    } else {
      setIsContentLoading(false)
    }
  }

  useBackButtonHandler(canExit)
  return (
    <NavigationContainer ref={navigationRef} {...props}>
      {(!isContentLoading && profileStore.accessToken) === null ? <AuthStack /> : <TabNavigator />}

      {isContentLoading ? <Loader /> : null}
    </NavigationContainer>
  )
})

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 */
const exitRoutes = ["analytics"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
