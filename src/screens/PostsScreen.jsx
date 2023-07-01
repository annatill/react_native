import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { Header } from "../components/Header";
import Avatar from "../../assets/noAvatar.jpg";
import { Post } from "../components/Post";
import { useRoute } from "@react-navigation/native";
import { getUser, getAllPosts } from "../redux/selectors";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPostsData } from "../redux/operations";

export const PostsScreen = () => {
  const { login, email, uri } = useSelector(getUser);
  const posts = useSelector(getAllPosts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostsData());
  }, []);

  return (
    <View style={styles.container}>
      <Header pageTitle="Публікації" />
      <View style={{ marginTop: 32 }}>
        <View style={styles.userContainer}>
          {uri ? (
            <Image source={{ uri: uri }} style={styles.image} />
          ) : (
            <Image source={Avatar} style={styles.image} />
          )}
          <View>
            <Text style={styles.userName}>{login}</Text>
            <Text>{email}</Text>
          </View>
        </View>
        <ScrollView style={{ marginBottom: 100, paddingHorizontal: 10 }}>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 720,
    flexDirection: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 32,
    backgroundColor: "#fff",
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 16,
  },
  userName: {
    fontSize: 13,
    fontWeight: 700,
    lineHeight: 15.23,
  },
  userEmail: {
    fontSize: 11,
    fontWeight: 400,
    lineHeight: 12.89,
    color: "#3C3C3C",
  },
});
