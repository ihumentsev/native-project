import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Linking,
  ImageBackground,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function LoginScreen({ navigation }) {
  const initialState = {
    login: "",
    email: "",
    password: "",
  };

  const [state, setState] = useState(initialState);
  console.log(state);

  const onRegister = (e) => {
    Alert.alert(
      "Register",
      `${state.login}+ ${state.email} + ${state.password}`
    );
  };

  const [fontsLoaded] = useFonts({
    "Robo-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Robo-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    console.log(Platform.OS);
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={require("../../native-project/assets/image/photo.png")}
      style={styles.image}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <View style={styles.form}>
            {/* <View
              style={{
                width: 120,
                height: 120,
                position: "absolute",
                top: -60,
                alignSelf: "center",
                backgroundColor: "#F6F6F6",
                borderRadius: 16,
              }}
            ></View> */}

            <View style={{ marginTop: 32 }}>
              <Text style={styles.title}>Войти</Text>
            </View>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              {/* <View style={{ marginTop: 33 }}>
                <TextInput
                  value={state.login}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                  style={styles.input}
                  //   textAlign={"center"}
                  placeholder={"Логин"}
                  placeholderTextColor="#BDBDBD"
                  // keyboardType="visible-password"
                ></TextInput>
              </View> */}
              <View style={{ marginTop: 33 }}>
                <TextInput
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                  style={styles.input}
                  //   textAlign={"center"}
                  placeholder={"Адрес электронной почты"}
                  placeholderTextColor="#BDBDBD"
                  // keyboardType="visible-password"
                ></TextInput>
              </View>
              <View style={{ marginTop: 16 }}>
                <TextInput
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                  style={styles.input}
                  //   textAlign={"center"}
                  placeholder={"Пароль"}
                  placeholderTextColor="#BDBDBD"
                  // keyboardType="visible-password"
                  secureTextEntry={true}
                ></TextInput>
              </View>
            </KeyboardAvoidingView>
            <TouchableOpacity style={styles.btn} onPress={onRegister}>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "400",
                  fontSize: 16,
                  fontFamily: "Robo-Regular",
                }}
              >
                Войти
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 16, alignItems: "center" }}>
              <Text
                textAlign={"center"}
                style={{ color: "#1B4371", fontWeight: "400", fontSize: 16 }}
                onPress={() => navigation.navigate("Register")}
              >
                Нет аккаунта? Зарегистрироваться
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  form: {
    position: "relative",
    backgroundColor: "#ffff",
    flex: 0.7,
    justifyContent: "flex-start",
    // height: 549,
    // top: 180,

    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
  },
  title: {
    fontFamily: "Robo-Medium",
    fontStyle: "normal",
    fontSize: 30,
    // fontWeight: "bold",
    lineHeight: 35,
    textAlign: "center",
    color: "#212121",
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#f0f8ff",
    borderRadius: 8,
    height: 50,
    color: "#212121",
    fontFamily: "Robo-Regular",
    fontWeight: "400",
    fontSize: 16,
    marginHorizontal: 16,
    paddingRight: 16,
    paddingStart: 16,
  },
  btn: {
    backgroundColor: "#FF6C00",
    height: 51,
    borderRadius: 100,
    marginHorizontal: 16,
    marginTop: 43,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    height: "130%",
    resizeMode: "cover",
  },
});
