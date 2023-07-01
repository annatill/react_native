import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";

import { Post } from "../components/Post";
import PhotoBG from "../../assets/PhotoBG.jpg";
import Avatar from "../../assets/noAvatar.jpg";
import Icon from "react-native-vector-icons/EvilIcons";
import IconLogOut from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/operations";
import { getUser } from "../redux/selectors";
import * as ImagePicker from "expo-image-picker";
import { updateUser } from "../redux/operations";
import { getFilterPost } from "../redux/selectors";

export const ProfileScreen = () => {
  const { login, email, uri, uid } = useSelector(getUser);
  const posts = useSelector(getFilterPost(email));
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      dispatch(updateUser({ uid, selectedImage, login, email }));
    }
  };

  return (
    <ImageBackground source={PhotoBG} style={styles.imageBg}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {selectedImage ? (
            <ImageBackground
              source={{ uri: selectedImage }}
              style={styles.image}
            ></ImageBackground>
          ) : (
            <ImageBackground
              source={uri ? { uri: uri } : Avatar}
              style={{
                ...styles.image,
                borderBottom: 1,
                borderColor: "#BDBDBD",
              }}
            ></ImageBackground>
          )}
          <View style={styles.iconContainer}>
            <Pressable onPress={handleSelectImage}>
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
            </Pressable>
          </View>
        </View>
        <IconLogOut
          name="logout"
          style={styles.iconLogOut}
          size={24}
          onPress={() => {
            dispatch(logoutUser());
            navigation.navigate("Login");
          }}
        />
        <Text style={styles.text}>{login}</Text>
        <ScrollView style={{ paddingHorizontal: 20 }}>
          {posts.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </ScrollView>
      </View>
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
  iconLogOut: {
    position: "absolute",
    right: 16,
    top: 22,
    color: "#BDBDBD",
  },
  text: {
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35.16,
    color: "#212121",
    textAlign: "center",
    marginTop: 92,
    marginBottom: 32,
  },
});
