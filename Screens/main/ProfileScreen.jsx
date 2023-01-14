import React from "react";
import { Text, View, StyleSheet } from "react-native";
export default function ProfileScreen() {
  return (
    <View style={styles.coontainer}>
      <Text>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  coontainer: {
    flex: 1,
    justifyContent: "center",
  },
});
