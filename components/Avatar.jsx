import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const images = {
  addButton: require("../assets/images/add.png"),
  resetButton: require("../assets/images/reset.png"),
};

export default function ImagePickerAvatar({ imageHandler, imageAvatar }) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [120, 120],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  useEffect(() => {
    imageHandler(image);
  }, [image]);

  const deleteAvatar = () => {
    setImage(null);
  };

  return (
    <>
      <View style={styles.avatarBox}>
        {image ? (
          <Image style={styles.avatarImage} source={{ uri: image }} />
        ) : (
          <Image style={styles.avatarImage} source={{ uri: imageAvatar }} />
        )}
        <TouchableOpacity
          style={styles.addAvatarButton}
          onPress={!image ? pickImage : deleteAvatar}
        >
          <Image source={!image ? images.addButton : images.resetButton} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  avatarBox: {
    position: "absolute",
    top: -60,
    left: Dimensions.get("window").width / 2 - 60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addAvatarButton: {
    position: "absolute",
    bottom: 14,
    right: -12.5,
    width: 25,
    height: 25,
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
});
