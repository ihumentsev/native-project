import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";

const images = {
  map: require("../assets/images/map.png"),
  comment: require("../assets/images/comment.png"),
  avatar: require("../assets/images/Rectangle.png"),
  logOutIcon: require("../assets/images/log-out.png"),
};
export default function Posts({ item, navigation }) {
  return (
    <View style={styles.postBox}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 32,
        }}
      >
        <Image
          source={{ uri: item.UserImage }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 16,
            marginRight: 8,
          }}
        />
        <View style={{}}>
          <Text>{item.UserName}</Text>
          <Text>{item.userContact}</Text>
        </View>
      </View>
      <Image source={{ uri: item.photoLink }} style={styles.postImg} />
      <Text style={styles.postTitle}>{item.title}</Text>
      <View style={styles.detailsBox}>
        <TouchableOpacity
          style={{ width: 25, height: 25 }}
          onPress={() =>
            navigation.navigate("Comments", {
              postId: item.id,
              photoUrl: item.photoLink,
              coments: item.coments,
            })
          }
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Image source={images.comment} style={{ width: 25, height: 25 }} />
            <Text
              style={{
                fontFamily: "Robo-Regular",
                fontSize: 16,
                color: "#BDBDBD",
                marginLeft: 9,
              }}
            >
              {item.coments.length}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ height: 25, alignItems: "center" }}
          onPress={() => navigation.navigate("Map", { item: item })}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Image
              source={images.map}
              style={{ width: 25, height: 25, marginLeft: 9 }}
            />
            <Text
              style={{
                textDecorationLine: "underline",
                fontFamily: "Robo-Regular",
                fontSize: 16,
              }}
            >
              {item.locationTitle}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  postBox: {
    paddingBottom: 10,
    marginBottom: 34,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  postImg: {
    width: Dimensions.get("window").width - 32,
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
