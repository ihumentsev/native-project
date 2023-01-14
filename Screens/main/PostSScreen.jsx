import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function PostScreen() {
  return (
    <View style={styles.coontainer}>
      <Text>Post</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  coontainer: {
    flex: 1,
    justifyContent: "center",
  },
});
