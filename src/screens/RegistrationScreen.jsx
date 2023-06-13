import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from "react-native";
import PhotoBG from "../../assets/PhotoBG.jpg";
import Icon from "react-native-vector-icons/AntDesign";

import { useState } from "react";

export const RegistrationScreen = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  const handleRegistration = () => {
    console.log("Логін:", login);
    console.log("Електронна пошта:", email);
    console.log("Пароль:", password);
    setLogin("");
    setEmail("");
    setPassword("");
  };

  const handleInputFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  const handleInputBlur = () => {
    setFocusedInput(null);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "center" }}
      >
        <ImageBackground source={PhotoBG} style={styles.imageBG}>
          <View style={styles.containerForm}>
            <ImageBackground style={styles.image}>
              <Icon style={styles.icon} name="pluscircleo" />
            </ImageBackground>
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
            <Pressable>
              <Text style={styles.text}>Вже є акаунт? Увійти</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
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
  icon: {
    position: "absolute",
    right: -12,
    bottom: 14,
    zIndex: 100,
    color: "#FF6C00",
    fontSize: 25,
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
