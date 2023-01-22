import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/mainScreens/Home";
import RegistrationScreen from "./screens/authScreens/RegistrationScreen";
import LoginScreen from "./screens/authScreens/LoginScreen.jsx";
import CreatePostsScreen from "./screens/mainScreens/CreatePostsScreen.jsx";
import ProfileScreen from "./screens/mainScreens/ProfileScreen.jsx";
import { Image } from "react-native";
import CommentsScreen from "./screens/mainScreens/CommentsScreen";
import PostsScreen from "./screens/mainScreens/ProfileScreen.jsx";
import MapScreen from "./screens/mainScreens/MapScreen";

const Stack = createStackNavigator();
const MainStack = createBottomTabNavigator();

const images = {
  ProfileIcon: require("./assets/images/user.png"),
  PostsIcon: require("./assets/images/postIcon.png"),
  createPostIcon: require("./assets/images/new.png"),
};

export default function useRoute(isAuth) {
  if (!isAuth) {
    return (
      <Stack.Navigator initialRouteName="Registration">
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Comments"
        component={CommentsScreen}
      />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  );
}
