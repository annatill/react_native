import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import PhotoBG from "../PhotoBG.jpg";
import Icon from "react-native-vector-icons/AntDesign";

export const RegistrationScreen = () => {
  return (
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
          <TextInput style={styles.input} placeholder="Логін"></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Адреса електронної пошти"
          ></TextInput>
          <View style={styles.containerInput}>
            <TextInput
              style={[styles.input, styles.lastChildInput]}
              placeholder="Пароль"
            ></TextInput>
            <Pressable>
              <Text style={styles.textInput}>Показати</Text>
            </Pressable>
          </View>
          <View style={styles.button}>
            <Text style={styles.textButton}>Зареєструватися</Text>
          </View>
          <Pressable>
            <Text style={styles.text}>Вже є акаунт? Увійти</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
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
