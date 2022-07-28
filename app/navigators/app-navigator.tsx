/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import { STIcon } from "../components";
import { color } from "../theme"
import {
  DemoListScreen,
  AnalyticsScreen,
  SettingsScreen,
  CalendarScreen,
  ConnectionsScreen,
  UserConnectionListScreen
} from "../screens"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type NavigatorParamList = {
  demoList: undefined
  analytics: undefined
  settings: undefined
  calendar: undefined
  connectionsList: undefined
  userConnectionList: any
}

const Stack = createNativeStackNavigator<NavigatorParamList>();
const Tab = createBottomTabNavigator();

const AnalyticsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="analytics"
    >
      <Stack.Screen name="analytics" component={AnalyticsScreen} />
      <Stack.Screen name="demoList" component={DemoListScreen} />
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
        tabBarStyle: { backgroundColor: color.background, },
      }}
      initialRouteName=''
    >
      <Tab.Screen
        name="analyticsStack"
        component={AnalyticsStack}
        options={{
          tabBarIcon: ({focused}) => (
            <STIcon icon="statistics_outline_28" color={focused ? color.palette.black : color.palette.grey} size={focused ? 30 : 29} />
          ),
        }}
      />
      <Tab.Screen
        name="calendarStack"
        component={CalendarStack}
        options={{
          tabBarIcon: ({focused}) => (
            <STIcon icon="calendar_outline_28" color={focused ? color.palette.black : color.palette.grey} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="demoStack2"
        component={AnalyticsStack}
        options={{
          tabBarIcon: ({focused}) => (
            <STIcon icon="add_square_outline_28" color={focused ? color.palette.black : color.palette.grey} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="connections"
        component={ConnectionsStack}
        options={{
          tabBarIcon: ({focused}) => (
            <STIcon icon="users_outline_28" color={focused ? color.palette.black : color.palette.grey} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="settingsStack"
        component={SettingsStack}
        options={{
          tabBarIcon: ({focused}) => (
            <STIcon icon="settings_outline_28" color={focused ? color.palette.black : color.palette.grey} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  useBackButtonHandler(canExit)
  return (
    <NavigationContainer
      ref={navigationRef}
      {...props}
    >
      <TabNavigator />
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["analytics"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
