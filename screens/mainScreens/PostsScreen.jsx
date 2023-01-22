import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import appFirebase from "../../firebase/firebaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import LogoutBtn from "../../components/LogOutBtn";
import Posts from "../../components/Posts";

export default function PostsScreen({ route, navigation }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getDataFromFirestore = async () => {
    try {
      setIsLoading(true);
      const db = getFirestore(appFirebase);
      const querySnapshot = await getDocs(collection(db, "posts"));

      const allPosts = querySnapshot.docs
        .map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
            create: doc._document.createTime.timestamp,
          };
        })
        .sort((a, b) => a.create?.seconds < b.create?.seconds);
      setPosts(allPosts);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataFromFirestore();
  }, []);

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
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.header}>
        <View style={styles.headerFlex}>
          <View>
            <Text style={styles.headerTitle}>Публикации</Text>
          </View>
          <LogoutBtn />
        </View>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={getDataFromFirestore}
            />
          }
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Posts item={item} navigation={navigation} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  header: {
    height: 88,
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
    marginLeft: 130,
    justifyContent: "center",
  },
  exit: {
    width: 24,
    height: 24,
  },
  postBox: {
    paddingBottom: 10,
    marginBottom: 34,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  postImg: {
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  postTitle: {
    fontFamily: "Robo-Medium",
    fontSize: 16,
    marginBottom: 11,
  },
  detailsBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
