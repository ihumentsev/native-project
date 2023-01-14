import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Camera, CameraType } from "expo-camera";
// import { TouchableOpacity } from "react-native-gesture-handler";

export default function CreateScreen() {
  //   const [snap, setSnap] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  async function takePhoto() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
    const data = await camera.takePictureAsync();
    console.log("data", data);
    console.log("type+>", type);
    console.log("permission+>", permission);
  }
  return (
    <View style={styles.coontainer}>
      <Camera style={styles.camera} type={type}>
        <View>
          <TouchableOpacity onPress={takePhoto} style={styles.snapBox}>
            <Text style={styles.snap}>SNAP</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  coontainer: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  camera: {
    height: 300,
    marginTop: 50,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  snap: {
    color: "#fff",
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
  },
});
