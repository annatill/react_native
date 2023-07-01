import { View, StyleSheet, Image, Text, ImageBackground } from "react-native";
import IconLike from "react-native-vector-icons/AntDesign"; //like2
import IconComment from "react-native-vector-icons/FontAwesome"; //comment
import IconLocation from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { addLike, delPost } from "../redux/operations";
import { useDispatch } from "react-redux";

export const Post = ({ post }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(delPost(post.id));
  };

  const handleLike = () => {
    dispatch(addLike({ postId: post.id, email: post.email }));
  };

  return (
    <View
      style={[styles.container, "Profile" ? styles.profileContainer : null]}
    >
      <ImageBackground source={{ uri: post.url }} style={styles.image} />
      <Text style={{ ...styles.text, marginTop: 8, marginLeft: 0 }}>
        {post.name}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginRight: 25,
            }}
          >
            <IconComment
              name="comment"
              size={24}
              style={{
                color: post.comments?.length > 0 ? "#FF6C00" : "#BDBDBD",
              }}
              onPress={() => {
                navigation.navigate("Comments", { post });
              }}
            />

            <Text style={styles.text}>{post.comments?.length || 0}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <IconLike
              name="like2"
              size={24}
              style={{ color: post.likes?.length > 0 ? "#FF6C00" : "#BDBDBD" }}
              onPress={handleLike}
            />
            <Text style={styles.text}>{post.likes?.length ?? 0}</Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <IconLocation
            name="location-outline"
            size={24}
            style={{
              color: "#BDBDBD",
              opacity: 0.5,
            }}
            onPress={() => navigation.navigate("Map", { post })}
          />
          <Text style={{ ...styles.text, textDecorationLine: "underline" }}>
            {post.location}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 240,
    backgroundColor: "#BDBDBD",
    borderRadius: 8,
    marginBottom: 8,
    overflow: "hidden",
  },
  text: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 19,
    textAlign: "left",
    color: "#212121",
    marginLeft: 8,
  },
  profileContainer: {
    width: 300,
  },
  container: {
    width: "100%",
    marginBottom: 32,
  },
});
