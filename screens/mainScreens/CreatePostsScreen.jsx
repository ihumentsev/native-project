import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import appFirebase from "../../firebase/firebaseConfig";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";

const images = {
  defaultIcon: require("../../assets/images/noPhotoIco.png"),
  editPhotoIcon: require("../../assets/images/editPhotoIco.png"),
  topCamera: require("../../assets/images/TopCamera.png"),
  snapCamera: require("../../assets/images/camera-icon-clip-art--royalty--32.png"),
  aroundCamera: require("../../assets/images/aroundIcon.png"),
  trash: require("../../assets/images/trash-2.png"),
  arrow: require("../../assets/images/arrow-left.png"),
};

SplashScreen.preventAutoHideAsync();

export default function CreateScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState(null);
  const [locationTitle, setLocationTitle] = useState(null);
  const [location, setLocation] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [place, setPlace] = useState(null);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const { login, imageAvatar, email, userId } = useSelector(
    (state) => state.auth
  );
  const writeDataToFirestore = async (data) => {
    try {
      const db = getFirestore(appFirebase);
      const docRef = await addDoc(collection(db, "posts"), data);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    if (photo && title && locationTitle) {
      setIsDisabled(false);
    }
  }, [photo, title, locationTitle]);

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

  const uploadPhotoToServer = async () => {
    if (!photo) {
      console.log("hren;}");
      return;
    }
    try {
      const storage = getStorage(appFirebase);
      const response = await fetch(photo);
      const file = await response.blob();
      const postId = Date.now().toString();
      const reference = ref(storage, `images/${postId}`);

      const result = await uploadBytesResumable(reference, file);
      const processedPhoto = await getDownloadURL(result.ref);
      return processedPhoto;
    } catch (error) {
      Alert.alert("Something went wrong. Try again, please");
      console.log(error.message);
    }
  };

  const takePhoto = async () => {
    try {
      const data = await camera.takePictureAsync();
      setPhoto(data.uri.toString());
      const location = await Location.getCurrentPositionAsync({});
      const place = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setPlace(place);
      setLocationTitle(`${place[0].region}, ${place[0].city}`);
      setLocation(location);

      setIsCameraVisible(false);
    } catch (error) {
      console.log(error);
    }
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [343, 240],
      quality: 1,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    const place = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    setPlace(place);
    setLocationTitle(`${place[0].region}, ${place[0].city}`);
  };

  const sendPhoto = async () => {
    const photoLink = await uploadPhotoToServer();
    writeDataToFirestore({
      UserName: login,
      UserImage: imageAvatar,
      userContact: email,
      photoLink,
      title,
      locationTitle,
      location,
      likes: 0,
      coments: [],
      owner: userId,
    });
    navigation.navigate("Posts");
    // navigation.navigate("Home", {
    //   photo,
    //   title,
    //   locationTitle,
    //   location,
    // });
    setPhoto(null);
    setTitle(null);
    setLocationTitle(null);
    setIsDisabled(true);
    setLocation(null);
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      {!isCameraVisible ? (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerFlex}>
              <TouchableOpacity
                style={styles.exit}
                onPress={() => navigation.navigate("Posts")}
              >
                <Image source={images.arrow} />
              </TouchableOpacity>
              <View>
                <Text style={styles.headerTitle}>Создать публикацию</Text>
              </View>
              <View></View>
            </View>
          </View>
          {photo ? (
            <>
              <View style={styles.takePhotoContainer}>
                <TouchableOpacity
                  onPress={() => setIsCameraVisible(true)}
                  style={styles.snapContainer}
                >
                  <Image source={images.topCamera} style={styles.snapIconTop} />
                </TouchableOpacity>
                <Image source={{ uri: photo }} style={styles.takedPhoto} />
              </View>
            </>
          ) : (
            <View style={styles.cameraBox}>
              <TouchableOpacity
                onPress={() => setIsCameraVisible(true)}
                style={styles.snapContainer}
              >
                <Image source={images.defaultIcon} style={styles.snapIcon} />
              </TouchableOpacity>
            </View>
          )}

          {photo ? (
            <TouchableWithoutFeedback
              onPress={() => {
                pickImage();
              }}
            >
              <Text>Редактировать фото</Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                pickImage();
              }}
            >
              <Text>Загрузите фото</Text>
            </TouchableWithoutFeedback>
          )}

          <View style={styles.titleBox} onLayout={onLayoutRootView}>
            <TextInput
              style={styles.inputTitle}
              placeholder="Название..."
              placeholderTextColor="#BDBDBD"
              keyboardType="visible-password"
              value={title}
              onChangeText={(value) => setTitle(value)}
            />
          </View>
          <View style={styles.locationBox} onLayout={onLayoutRootView}>
            <TextInput
              style={styles.inputLocation}
              placeholder="Местность..."
              placeholderTextColor="#BDBDBD"
              keyboardType="visible-password"
              value={locationTitle}
              onChangeText={(value) => setLocationTitle(value)}
            />
          </View>

          <View>
            <TouchableOpacity
              onPress={sendPhoto}
              style={!isDisabled ? styles.sendBtn : styles.sendBtnDisabled}
              disabled={isDisabled}
            >
              <Text
                style={
                  !isDisabled ? styles.sendLabel : styles.sendLabelDisabled
                }
              >
                Опубликовать
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              setPhoto(null);
              setTitle(null);
              setLocationTitle(null);
              setIsDisabled(true);
              setLocation(null);
            }}
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 70,
              height: 40,
              alignSelf: "center",
              marginTop: "auto",
              borderRadius: 20,
              backgroundColor: "#F6F6F6",
            }}
          >
            <Image source={images.trash} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </View>
      ) : (
        <Camera style={styles.newCam} ref={setCamera} type={type}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={takePhoto}
              style={styles.snapBox}
              disabled={false}
            >
              <Image
                source={images.snapCamera}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setType((current) =>
                  current === CameraType.back
                    ? CameraType.front
                    : CameraType.back
                )
              }
              style={styles.snapBox}
              disabled={false}
            >
              <Image
                source={images.aroundCamera}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
  },
  header: {
    height: 60,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
    marginBottom: 32,
  },
  headerFlex: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "500",
  },
  exit: {
    width: 24,
    height: 24,
  },
  cameraBox: {
    overflow: "hidden",
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#F6F6F6",
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    height: 240,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "red",
  },
  newCam: {
    resizeMode: "cover",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  snapContainer: {
    position: "absolute",
    alignSelf: "center",
    top: 90,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 30,
  },
  snapIcon: {
    position: "absolute",
    width: 60,
  },
  snapIconTop: {
    width: 60,
    position: "absolute",
  },
  takePhotoContainer: {
    position: "relative",
    height: 200,
    borderRadius: 8,
    height: 240,
    marginBottom: 8,
  },
  takedPhoto: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    resizeMode: "cover",
  },
  titleBox: {
    marginTop: 33,
    height: 50,
  },
  inputTitle: {
    borderBottomWidth: 1,
    paddingVertical: 15,
    fontSize: 16,
    fontFamily: "Robo-Regular",
    borderBottomColor: "#E8E8E8",
  },
  locationBox: {
    marginTop: 17,
    height: 50,
  },
  inputLocation: {
    borderBottomWidth: 1,
    paddingVertical: 15,
    fontSize: 16,
    fontFamily: "Robo-Regular",
    borderBottomColor: "#E8E8E8",
  },
  sendBtn: {
    height: 50,
    borderRadius: 10,
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  sendBtnDisabled: {
    height: 50,
    borderRadius: 10,
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },
  sendLabel: {
    color: "#FFFFFF",
    fontSize: 20,
    fontSize: 16,
    fontFamily: "Robo-Regular",
  },
  sendLabelDisabled: {
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "Robo-Regular",
  },
  snapBox: {
    borderWidth: 1,
    borderColor: "#ff0000",
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginRight: 20,
  },
});
