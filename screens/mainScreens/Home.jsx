import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import PostsScreen from "./PostsScreen";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

export default function Home({ navigation, route }) {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarShowLabel: false }}
      backBehavior="firstRoute"
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image source={require("../../assets/images/postIcon.png")} />
          ),
        }}
      />
      <Tab.Screen
        name="CreatePost"
        component={CreatePostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image source={require("../../assets/images/new.png")} />
          ),
          tabBarStyle: {
            display: "none",
          },
        }}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image source={require("../../assets/images/user.png")} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}
