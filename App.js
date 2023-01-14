import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RegisrationeScreen from "./Screens/RegistrationScreen";
import Navigation from "./Screens/Navigation";

export default function App() {
  return <NavigationContainer>{<Navigation />}</NavigationContainer>;
  // return <RegisrationeScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  // text: {
  //   color: "red",
  // },
  // image: {
  //   flex: 1,
  //   // resizeMode: "contain",
  //   // justifyContent: "center",
  //   position: "absolute",
  //   top: 0,
  //   width: "100%",
  //   height: "130%",
  // },
});
