import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from "react-native";
import ImagePickerAvatar from "../../components/Avatar";
import appFirebase from "../../firebase/firebaseConfig";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import UserPosts from "../../components/UserPosts";
import { signOutUser } from "../../redux/auth/authOperations";

export default function ProfileScreen({ navigation }) {
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);
  const [photo, setPhoto] = useState(null);
  const { userId, login, imageAvatar } = useSelector((state) => state.auth);
  const [userPosts, setUserPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signOutUser());
  };

  const getDataFromFirestore = async () => {
    try {
      setIsLoading(true);
      const db = getFirestore(appFirebase);
      const q = query(collection(db, "posts"), where("owner", "==", userId));
      const querySnapshot = await getDocs(q);

      const allPosts = querySnapshot.docs
        .map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
            create: doc._document.createTime.timestamp,
          };
        })
        .sort((a, b) => a.create?.seconds < b.create?.seconds);
      setUserPosts(allPosts);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const imageHandler = async (image) => {
    console.log("handlerImage=>", image);
    await setPhoto(image);
  };

  useEffect(() => {
    getDataFromFirestore();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBgr}
        source={require("../../assets/bg.jpg")}
      >
        <View style={{ ...styles.wrapper, width: dimensions }}>
          <ImagePickerAvatar
            imageHandler={imageHandler}
            imageAvatar={imageAvatar}
          />
          <TouchableOpacity style={styles.photoExit} onPress={signOut}>
            <Image
              style={styles.photoIconExit}
              source={require("../../assets/images/log-out.png")}
              activeOpacity={0.8}
            />
          </TouchableOpacity>
          <View style={styles.user}>
            <Text style={styles.userName}>{login}</Text>
          </View>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={getDataFromFirestore}
              />
            }
            data={userPosts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <UserPosts item={item} navigation={navigation} />
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBgr: {
    flex: 1,
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    resizeMode: "stretch",
  },
  wrapper: {
    marginTop: 147,
    height: "100%",
    paddingHorizontal: 16,
    paddingTop: 92,
    paddingBottom: 138,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
  },
  photoExit: {
    position: "absolute",
    top: 18,
    right: 18,
    width: 25,
    height: 25,
  },
  photoIconExit: {
    width: 25,
    height: 25,
  },
  user: {
    alignItems: "center",
    marginBottom: 32,
  },
  userName: {
    fontWeight: "500",
    fontSize: 30,
    color: "#212121",
  },
});
