import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../redux/auth/authOperations";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  uploadBytes,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import appFirebase from "../../firebase/firebaseConfig";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import ImagePickerAvatar from "../../components/Avatar";

SplashScreen.preventAutoHideAsync();

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const [photo, setPhoto] = useState(null);
  const [state, setstate] = useState(initialState);
  const [isHidden, setisHidden] = useState(true);
  console.log(photo);

  const uploadPhoto = async () => {
    if (!photo) {
      console.log("hren;}");
      return;
    }
    try {
      const storage = getStorage(appFirebase);
      const response = await fetch(photo);
      const file = await response.blob();
      const avatarId = Date.now().toString();
      const reference = ref(storage, `avatars/${avatarId}`);

      const result = await uploadBytesResumable(reference, file);
      const processedPhoto = await getDownloadURL(result.ref);
      return processedPhoto;
    } catch (error) {
      Alert.alert("Something went wrong. Try again, please");
      console.log(error.message);
    }
  };
  const dispatch = useDispatch();

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  const submitForm = async () => {
    const avatarImage = await uploadPhoto();
    console.log("ava=>", avatarImage);
    dispatch(signUpUser({ ...state, avatarImage }));
    // setstate(initialState);
  };

  const imageHandler = async (image) => {
    await setPhoto(image);
  };

  const [fontsLoaded] = useFonts({
    "Robo-Regular": require("../../assets/fonts/roboto/Roboto-Regular.ttf"),
    "Robo-Medium": require("../../assets/fonts/roboto/Roboto-Medium.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground style={styles.bg} source={require("../../assets/bg.jpg")}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.container}>
          <View style={styles.regBox}>
            <ImagePickerAvatar imageHandler={imageHandler} />
            <View onLayout={onLayoutRootView}>
              <Text style={styles.formTitle}>Регистрация</Text>
            </View>

            <View style={styles.form}>
              <View style={{ marginBottom: 16 }}>
                <TextInput
                  style={styles.input}
                  placeholder="Логин"
                  placeholderTextColor="#BDBDBD"
                  keyboardType="visible-password"
                  value={state.login}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, login: value }))
                  }
                />
              </View>
              <View style={{ marginBottom: 16 }}>
                <TextInput
                  style={styles.input}
                  placeholder="Адрес электронной почты"
                  placeholderTextColor="#BDBDBD"
                  keyboardType="visible-password"
                  value={state.email}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={{ marginBottom: 43 }}>
                <TextInput
                  style={styles.input}
                  placeholder="Пароль"
                  placeholderTextColor="#BDBDBD"
                  secureTextEntry={isHidden}
                  value={state.password}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, password: value }))
                  }
                />
                <TouchableOpacity
                  style={styles.viewPassword}
                  onPress={() => {
                    setisHidden(!isHidden);
                  }}
                >
                  {isHidden ? (
                    <Text style={styles.viewPasswordTitle}>Показать</Text>
                  ) : (
                    <Text style={styles.viewPasswordTitle}>Скрыть</Text>
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.button} onPress={submitForm}>
                <Text style={styles.buttonTitle}>Зарегистрироваться</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text style={styles.footerLoginLink}>
                  Уже есть аккаунт? Войти
                </Text>
              </TouchableOpacity>
            </View>
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
  bg: {
    flex: 1,
    resizeMode: "cover",
  },
  regBox: {
    position: "relative",
    flex: 0.7,
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF",
    height: 549,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  form: {
    flex: 0.75,
    justifyContent: "flex-start",
    marginHorizontal: 16,
  },
  formTitle: {
    marginBottom: 33,
    color: "#212121",
    fontSize: 30,
    fontFamily: "Robo-Medium",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    color: "#212121",
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 16,
    fontFamily: "Robo-Regular",
  },
  button: {
    height: 51,
    backgroundColor: "#FF6C00",
    color: "#FFFFFF",
    borderRadius: 100,
    paddingHorizontal: 32,
    paddingVertical: 15,
    marginBottom: 16,
  },
  buttonTitle: {
    textAlign: "center",
    color: "#FFFFFF",
    fontFamily: "Robo-Regular",
    fontSize: 16,
  },
  footerLoginLink: {
    textAlign: "center",
    color: "#1B4371",
  },
  viewPassword: {
    height: "100%",
    position: "absolute",
    right: 16,
  },
  viewPasswordTitle: {
    color: "#1B4371",
    fontFamily: "Robo-Regular",
    fontSize: 16,
    marginTop: "auto",
    marginBottom: "auto",
  },
});
