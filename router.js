import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RegisrationeScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import PostScreen from "./Screens/main/PostSScreen";
import CreateScreen from "./Screens/main/CreateScreen";
import ProfileScreen from "./Screens/main/ProfileScreen";
import { Image } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function useRoute(isAuth) {
  if (!isAuth) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Register" component={RegisrationeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    );
  }
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: "flex",
            height: 83,
            paddingTop: 9,
            paddingHorizontal: 40,
          },
          null,
        ],
      }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image source={require("./assets/image/grid.png")} />
          ),
        }}
        name="Post"
        component={PostScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image source={require("./assets/image/new.png")} />
          ),
        }}
        name="Create"
        component={CreateScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image source={require("./assets/image/user.png")} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}
