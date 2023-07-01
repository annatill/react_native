import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import PhotoBG from "../../assets/PhotoBG.jpg";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { createUser } from "../redux/operations";
import * as ImagePicker from "expo-image-picker";

export const RegistrationScreen = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  const [uri, setUri] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  const handleRegistration = () => {
    const user = { login, email, password, uri: selectedImage };
    dispatch(createUser(user));
  };

  const handleInputFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  const handleInputBlur = () => {
    setFocusedInput(null);
  };

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
      setSelectedImage(result.uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "center" }}
      >
        <ImageBackground source={PhotoBG} style={styles.imageBG}>
          <View style={styles.containerForm}>
            {selectedImage ? (
              <View style={styles.image}>
                <View style={{ borderRadius: 16, overflow: "hidden" }}>
                  <ImageBackground
                    source={{ uri: selectedImage }}
                    style={styles.imageBackground}
                  ></ImageBackground>
                </View>
                <View style={styles.iconContainer}>
                  <Pressable
                    style={styles.overlay}
                    onPress={() => setSelectedImage(null)}
                  >
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
            ) : (
              <View style={styles.image}>
                <Icon
                  style={styles.icon}
                  name="pluscircleo"
                  onPress={() => {
                    handleSelectImage();
                  }}
                />
              </View>
            )}

            <Text style={styles.textHeader}>Реєстрація</Text>
            <TextInput
              style={[styles.input, focusedInput === "login" && styles.focus]}
              placeholder="Логін"
              value={login}
              onChangeText={setLogin}
              onFocus={() => handleInputFocus("login")}
              onBlur={handleInputBlur}
            ></TextInput>
            <TextInput
              style={[styles.input, focusedInput === "email" && styles.focus]}
              placeholder="Адреса електронної пошти"
              value={email}
              onChangeText={setEmail}
              onFocus={() => handleInputFocus("email")}
              onBlur={handleInputBlur}
            ></TextInput>
            <View style={styles.containerInput}>
              <TextInput
                style={[
                  styles.input,
                  styles.lastChildInput,
                  focusedInput === "password" && styles.focus,
                ]}
                placeholder="Пароль"
                secureTextEntry={!isShowPassword}
                value={password}
                onChangeText={setPassword}
                onFocus={() => handleInputFocus("password")}
                onBlur={handleInputBlur}
              ></TextInput>
              <Pressable onPress={handleShowPassword}>
                <Text style={styles.textInput}>
                  {isShowPassword ? "Приховати" : "Показати"}
                </Text>
              </Pressable>
            </View>
            <Pressable onPress={handleRegistration}>
              <View style={styles.button}>
                <Text style={styles.textButton}>Зареєструватися</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={styles.text}>Вже є акаунт? Увійти</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  imageBG: {
    flex: 1,
    justifyContent: "flex-end",
    width: null,
    height: null,
  },
  containerForm: {
    flex: 0,
    backgroundColor: "#fff",
    width: "100%",
    height: 549,
    marginTop: "auto",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 16,
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -50 }],
    backgroundColor: "#F6F6F6",
  },
  imageBackground: {
    width: 120,
    height: 120,
  },
  icon: {
    position: "absolute",
    right: -12,
    bottom: 14,
    zIndex: 100,
    color: "#FF6C00",
    fontSize: 25,
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
  textHeader: {
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35.16,
    color: "#212121",
    marginTop: 92,
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    width: 350,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    borderColor: "#E8E8E8",
    borderWidth: 1,
  },
  lastChildInput: {
    marginBottom: 0,
  },
  containerInput: {
    position: "relative",
  },
  textInput: {
    position: "absolute",
    bottom: 16,
    right: 16,
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 18.75,
    fontWeight: 400,
  },
  focus: {
    borderColor: "#FF6C00",
    borderWidth: 1,
  },
  button: {
    width: 350,
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginTop: 43,
    marginBottom: 16,
    padding: 16,
  },
  textButton: {
    fontSize: 16,
    lineHeight: 18.75,
    fontWeight: 400,
    color: "#fff",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 18.75,
    fontWeight: 400,
    color: "#1B4371",
    textAlign: "center",
  },
});
