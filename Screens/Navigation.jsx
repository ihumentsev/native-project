import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Button } from "react-native";
import RegisrationeScreen from "./auth/RegistrationScreen";
import LoginScreen from "./auth/LoginScreen";
import PostScreen from "./main/PostSScreen";
import CreateScreen from "./main/CreateScreen";
import ProfileScreen from "./main/ProfileScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const useRout = (isAuth) => {
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
        headerShown: false,
      }}
    >
      <Tab.Screen name="Post" component={PostScreen} />
      <Tab.Screen name="Create" component={CreateScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default function Navigation() {
  const routing = useRout(null);
  return <>{routing}</>;
}

// <Stack.Navigator
//   screenOptions={{
//     headerShown: false,
//   }}
// >
//   <Stack.Screen name="Register" component={RegisrationeScreen} />
//   <Stack.Screen name="Login" component={LoginScreen} />
// </Stack.Navigator>
