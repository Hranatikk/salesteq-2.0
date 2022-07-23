/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { WelcomeScreen, DemoScreen, DemoListScreen } from "../screens"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import { STIcon } from "../components";
import { color } from "../theme"

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
  welcome: undefined
  demo: undefined
  demoList: undefined
}

const Stack = createNativeStackNavigator<NavigatorParamList>();
const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="welcome"
    >
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name="demo" component={DemoScreen} />
      <Stack.Screen name="demoList" component={DemoListScreen} />
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
        name="demoStack"
        component={AppStack}
        options={{
          tabBarIcon: ({focused}) => (
            <STIcon icon="statistics_outline_28" color={focused ? color.palette.black : color.palette.grey} size={focused ? 30 : 29} />
          ),
        }}
      />
      <Tab.Screen
        name="demoStack1"
        component={AppStack}
        options={{
          tabBarIcon: ({focused}) => (
            <STIcon icon="calendar_outline_28" color={focused ? color.palette.black : color.palette.grey} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="demoStack2"
        component={AppStack}
        options={{
          tabBarIcon: ({focused}) => (
            <STIcon icon="add_square_outline_28" color={focused ? color.palette.black : color.palette.grey} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="demoStack23"
        component={AppStack}
        options={{
          tabBarIcon: ({focused}) => (
            <STIcon icon="users_outline_28" color={focused ? color.palette.black : color.palette.grey} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="demoStack24"
        component={AppStack}
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
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
