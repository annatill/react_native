import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { Post } from "../components/Post";
import { Footer } from "../components/Footer";
import PhotoBG from "../../assets/PhotoBG.jpg";
import Avatar from "../../assets/AvatarProfile.jpg";
import Icon from "react-native-vector-icons/EvilIcons";

export const ProfileScreen = () => {
  return (
    <ImageBackground source={PhotoBG} style={styles.imageBg}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={Avatar}
            style={styles.image}
          ></ImageBackground>
          <View style={styles.iconContainer}>
            <Text
              style={{
                color: "#BDBDBD",
                fontSize: 17,
                fontWeight: 300,
                textAlign: "center",
                textAlignVertical: "center",
                transform: [{ rotate: "45deg" }],
              }}
            >
              +
            </Text>
          </View>
        </View>
        <Text style={styles.text}>Natali Romanova</Text>
        <Post />
      </View>
      <Footer />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    justifyContent: "flex-end",
    width: null,
    height: null,
  },
  container: {
    display: "flex",
    backgroundColor: "#fff",
    width: "100%",
    height: 549,
    marginTop: "auto",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 16,
    overflow: "hidden",
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 16,
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -50 }],
  },
  iconContainer: {
    position: "absolute",
    right: -12,
    bottom: 14,
    backgroundColor: "#fff",
    borderRadius: 100,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#BDBDBD",
    borderWidth: 1,
  },
  text: {
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35.16,
    color: "#212121",
    textAlign: "center",
  },
});