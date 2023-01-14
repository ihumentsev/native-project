import React, { useCallback, useEffect, useRef, useState } from "react";
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
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Constants from "expo-constants";
import ImagePickerAvatar from "../components/pickImage";

SplashScreen.preventAutoHideAsync();

export default function RegisrationeScreen({ navigation }) {
  const initialState = {
    login: "",
    email: "",
    password: "",
  };

  const [state, setState] = useState(initialState);
  console.log(state);
  const [isHidden, setisHidden] = useState(true);
  // const scrollComponent = useRef(null);
  // useEffect(() => {
  //   Keyboard.addListener("keyboardDidShow", () => {
  //     scrollComponent.current.scrollToEnd();
  //   });
  // });

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
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.screenContainer}
        >
          {/* <ScrollView
            showsVerticalScrollIndicator={false}
            ref={scrollComponent}
            style={styles.content}
          > */}
          <View style={styles.container}>
            <View style={styles.wraperBox}>
              <ImagePickerAvatar />
              <View style={{ marginTop: 0 }} onLayout={onLayoutRootView}>
                <Text style={styles.title}>Регистрация</Text>
              </View>

              <View style={styles.form}>
                <View style={{ marginTop: 33 }}>
                  <TextInput
                    value={state.login}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        login: value,
                      }))
                    }
                    style={styles.input}
                    placeholder={"Логин"}
                    placeholderTextColor="#BDBDBD"
                  ></TextInput>
                </View>
                <View style={{ marginTop: 16 }}>
                  <TextInput
                    value={state.email}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        email: value,
                      }))
                    }
                    style={styles.input}
                    placeholder={"Адрес электронной почты"}
                    placeholderTextColor="#BDBDBD"
                  ></TextInput>
                </View>
                <View style={{ marginTop: 16 }}>
                  <TextInput
                    value={state.password}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                    style={styles.input}
                    placeholder={"Пароль"}
                    placeholderTextColor="#BDBDBD"
                    secureTextEntry={isHidden}
                  />
                  <TouchableOpacity
                    style={{
                      height: "100%",
                      position: "absolute",
                      right: 20,
                    }}
                    onPress={() => {
                      setisHidden(!isHidden);
                    }}
                  >
                    {isHidden ? (
                      <Text
                        style={{
                          color: "#1B4371",
                          fontFamily: "Robo-Regular",
                          fontSize: 16,
                          marginTop: "auto",
                          marginBottom: "auto",
                        }}
                      >
                        Показать
                      </Text>
                    ) : (
                      <Text
                        style={{
                          color: "#1B4371",
                          fontFamily: "Robo-Regular",
                          fontSize: 16,
                          marginTop: "auto",
                          marginBottom: "auto",
                        }}
                      >
                        Скрыть
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.btn} onPress={onRegister}>
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontWeight: "400",
                      fontSize: 16,
                      fontFamily: "Robo-Regular",
                    }}
                  >
                    Зарегистрироваться
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    marginTop: 16,
                    alignItems: "center",
                    marginBottom: 45,
                  }}
                >
                  <Text
                    textAlign={"center"}
                    style={{
                      color: "#1B4371",
                      fontWeight: "400",
                      fontSize: 16,
                    }}
                    onPress={() => navigation.navigate("Login")}
                  >
                    Уже есть аккаунт? Войти
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* </ScrollView> */}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  wraperBox: {
    flex: 0.7,
    position: "relative",
    backgroundColor: "#ffff",
    height: 549,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    justifyContent: "flex-end",
  },
  form: {
    flex: 0.75,
    justifyContent: "flex-start",
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
    // justifyContent: "flex-end",
  },
  screenContainer: {
    flex: 1,
    justifyContent: "flex-end",
    padding: "0%",
    marginTop: Constants.statusBarHeight,
    // backgroundColor: "#F8F8F8",
  },

  content: {
    overflow: "scroll",
  },
});
