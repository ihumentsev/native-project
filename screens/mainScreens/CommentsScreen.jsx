import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import appFirebase from "../../firebase/firebaseConfig";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";

export default function CommentsScreen({ navigation, route }) {
  const [comment, setComment] = useState("");
  const { login, imageAvatar, email } = useSelector((state) => state.auth);
  const { postId, photoUrl, coments } = route.params;

  const ggg = {
    login,
    imageAvatar,
    email,
    date: Date.now(),
    comment,
  };
  const data = {
    coments: [...coments, ggg],
  };

  const updateConentsFireStore = async (postId) => {
    try {
      const db = getFirestore(appFirebase);
      const docRef = await doc(db, "posts", postId);
      setDoc(docRef, data, { merge: true });
      console.log("Document written with ID: ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getDate = (date) => {
    const dateString = new Date(date).toString();
    const newDate = dateString.slice(4, 21);
    return newDate;
  };

  const createComment = async () => {
    updateConentsFireStore(postId);
    setComment("");
  };

  useEffect(() => {
    console.log("coments==>", coments);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerFlex}>
          <TouchableOpacity
            style={styles.exit}
            onPress={() => navigation.navigate("Posts")}
          >
            <Image source={require("../../assets/images/arrow-left.png")} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Комментарии</Text>
          </View>
          <View></View>
        </View>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.postImgWrapper}>
          <Image style={styles.postImg} source={{ uri: photoUrl }} />
        </View>
        <View style={{ height: 280 }}>
          <FlatList
            data={coments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.comment}>
                <View style={styles.commentAvatar}>
                  <Image
                    style={{ width: 28, height: 28, borderRadius: 50 }}
                    source={{ uri: item.photoUrl }}
                  />
                </View>
                <View style={styles.commentBody}>
                  <Text style={styles.commentText}>{item.comment}</Text>
                  <Text style={styles.commentDate}>{getDate(item.date)}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Комментировать..."
          placeholderTextColor="#BDBDBD"
          value={comment}
          onChangeText={(value) => setComment(value)}
        />
        <TouchableOpacity style={styles.postBtn} onPress={createComment}>
          <Image
            style={styles.postBtnImg}
            source={require("../../assets/images/Vector.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 350,
    backgroundColor: "#FFFFFF",
  },
  header: {
    height: 90,
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
  wrapper: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
  },
  postImgWrapper: {
    marginBottom: 32,
    height: 240,
    borderRadius: 8,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  postImg: {
    width: "100%",
    height: "100%",
  },
  comment: {
    marginBottom: 24,
    flexDirection: "row",
  },
  commentAvatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5E5E5",
  },
  commentBody: {
    flexGrow: 1,
    padding: 16,
    borderRadius: 6,
    borderTopLeftRadius: 0,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  commentText: {
    fontSize: 13,
    color: "#212121",
  },
  commentDate: {
    marginTop: 8,
    alignSelf: "flex-end",
    fontSize: 10,
    color: "#BDBDBD",
  },
  inputWrapper: {
    position: "relative",
    flexDirection: "row",
    height: 50,
    marginTop: 7,
    borderWidth: 1,
    borderRadius: 100,
    padding: 16,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  input: {
    fontSize: 16,
    color: "#212121",
  },
  postBtn: {
    position: "absolute",
    right: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 34,
    height: 34,
    alignSelf: "center",
    borderRadius: 50,
    backgroundColor: "#FF6C00",
  },
  postBtnImg: {
    width: 8,
    height: 14,
  },
});
