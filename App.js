import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { RegistrationScreen } from "./src/screens/RegistrationScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { PostsScreen } from "./src/screens/PostsScreen";
import { CreatePostsScreen } from "./src/screens/CreatePostsScreen";
import { CommentsScreen } from "./src/screens/CommentsScreen";
import { ProfileScreen } from "./src/screens/ProfileScreen";

export default function App() {
  return (
    <RegistrationScreen />
    // <PostsScreen />
    // <LoginScreen />
    // <CreatePostsScreen />
    // <CommentsScreen />
    // <ProfileScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
