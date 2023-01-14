import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import RegisrationeScreen from "./RegistrationScreen";
import { NavigationContainer } from "@react-navigation/native";
import { Button } from "react-native";

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    // <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Register"
        component={RegisrationeScreen}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        // options={{
        //   title: "Home screen",
        //   headerStyle: {
        //     backgroundColor: "#f4511e",
        //   },
        //   headerTintColor: "#fff",
        //   headerTitleStyle: {
        //     fontWeight: "bold",
        //     fontSize: 20,
        //   },
        //   headerRight: () => (
        //     <Button
        //       onPress={() => alert("This is a button!")}
        //       title="Press me"
        //       color="#fff"
        //     />
        //   ),
        // }}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}
