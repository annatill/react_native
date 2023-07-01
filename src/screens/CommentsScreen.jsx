import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../redux/operations";
import { Header } from "../components/Header";
import { Comment } from "../components/Comment";
import { useSelector } from "react-redux";
import { getUser, getComments } from "../redux/selectors";
import IconArrow from "react-native-vector-icons/AntDesign";

export const CommentsScreen = ({ route }) => {
  const [newComment, setNewComment] = useState("");
  const { uri } = useSelector(getUser);
  const comments = useSelector(getComments(route.params.post.id));
  const dispatch = useDispatch();

  const post = route.params.post;

  const handleAddComment = () => {
    if (newComment.trim() === "") {
      return;
    }
    const comment = {
      uri: uri ?? null,
      text: newComment,
      date: new Date().getTime(),
    };
    dispatch(createComment({ comment, postId: post.id }));
    setNewComment("");
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, justifyContent: "flex-end" }}
    >
      <View style={styles.container}>
        <Header pageTitle="Коментарі" />
        <View
          style={{
            marginTop: 32,
            marginBottom: "auto",
          }}
        >
          <ScrollView style={{ marginBottom: 100, paddingHorizontal: 10 }}>
            <ImageBackground
              source={{ uri: post.url }}
              style={styles.image}
            ></ImageBackground>

            {comments &&
              comments.map((comment, index) => (
                <Comment
                  key={index}
                  index={index}
                  avatar={comment.uri}
                  text={comment.text}
                  date={comment.date}
                />
              ))}
          </ScrollView>
        </View>
        <View style={styles.input}>
          <TextInput
            placeholder="Коментувати..."
            placeholderTextColor="#BDBDBD"
            value={newComment}
            onChangeText={setNewComment}
          />
          <Pressable onPress={handleAddComment}>
            <View style={styles.icon}>
              <IconArrow
                name="arrowup"
                size={14}
                style={{
                  color: "#fff",
                }}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 812,
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 240,
    backgroundColor: "#bdbdbd",
    borderRadius: 8,
    overflow: "hidden",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 19,
    textAlign: "left",
    padding: 16,
    marginTop: 32,
    position: "relative",
  },
  icon: {
    position: "absolute",
    bottom: -8,
    right: 0,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    width: 34,
    height: 34,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
