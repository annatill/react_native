import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Header } from "../components/Header";
import IconCamera from "react-native-vector-icons/FontAwesome";
import IconLocation from "react-native-vector-icons/Ionicons";
import IconFlipCamera from "react-native-vector-icons/MaterialCommunityIcons";
import IconTrash from "react-native-vector-icons/Feather";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";

// let geoLocationPromise = null;

export const CreatePostsScreen = () => {
  const [location, setLocation] = useState("");
  const [permission, setPermission] = useState(false);
  const [name, setName] = useState("");
  const [geoLocation, setGeoLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState(null);
  const [uri, setUri] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        // setPermission(true);
        let location = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setGeoLocation(coords);
        return coords;
      }
    };
    requestLocationPermission();

    // geoLocationPromise = requestLocationPermission();
    // console.log("geoLocationPromise", geoLocationPromise);
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     "keyboardDidShow",
  //     () => {
  //       Keyboard.dismiss();
  //     }
  //   );

  //   return () => {
  //     keyboardDidShowListener.remove();
  //   };
  // }, []);

  // console.log("qwer", geoLocation);
  //console.log("geoLocationPromise", geoLocationPromise);

  const handleAddCamera = () => {
    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      navigation.navigate("Home");
    }
  };

  const handleAddLocation = () => {
    if (!permission) {
      navigation.navigate("Home");
    }
  };

  const handleAddPost = async () => {
    if (name.trim() === "" || location.trim() === "") {
      return;
    }

    //const coords = await geoLocationPromise;

    const post = {
      name: name.trim(),
      location: location.trim(),
      // geoLocation: coords /* geoLocation ? geoLocation : null */,
      geoLocation: geoLocation,
      uri: uri,
    };
    console.log("post", post);
    handleAddCamera();
    handleAddLocation();
    resetForm();
    navigation.navigate("Home", {
      screen: "Posts",
      params: { post },
    });
  };

  const resetForm = () => {
    setName("");
    setLocation("");
    setUri(null);
    setSelectedImage(null);
    // setGeoLocation(null);
  };

  const isFormValid = name.trim() !== "" && location.trim() !== "";

  const onPhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setUri(uri);
    }
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
        <View style={styles.container}>
          <Header pageTitle="Створити публікацію" />
          <View style={{ marginTop: 32 }}>
            {uri ? (
              <ImageBackground
                source={{ uri: uri }}
                style={styles.image}
                imageStyle={{ borderRadius: 16 }}
              >
                <View
                  style={{
                    ...styles.icon,
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                  }}
                >
                  <IconCamera
                    name="camera"
                    size={24}
                    style={{ color: "#fff" }}
                    onPress={() => setUri(null)}
                  />
                </View>
              </ImageBackground>
            ) : selectedImage ? (
              <ImageBackground
                source={{ uri: selectedImage }}
                style={styles.image}
              >
                <View style={styles.icon}>
                  <IconCamera
                    name="camera"
                    size={24}
                    style={{ color: "#BDBDBD", opacity: 0.5 }}
                    onPress={() => setSelectedImage(null)}
                  />
                </View>
              </ImageBackground>
            ) : (
              <Camera style={styles.image} type={type} ref={setCameraRef}>
                <View>
                  <TouchableOpacity
                    style={styles.flipContainer}
                    onPress={() => {
                      setType(
                        type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      );
                    }}
                  >
                    <IconFlipCamera
                      name="camera-flip-outline"
                      size={24}
                      style={{
                        color: "#BDBDBD",
                        opacity: 0.5,
                      }}
                    />
                  </TouchableOpacity>

                  <View style={styles.icon}>
                    <IconCamera
                      name="camera"
                      size={24}
                      style={{ color: "#BDBDBD", opacity: 0.5 }}
                      onPress={onPhoto}
                    />
                  </View>
                </View>
              </Camera>
            )}
            <Pressable onPress={handleSelectImage}>
              <Text style={styles.text}>Завантажте фото</Text>
            </Pressable>
            <View style={{ position: "relative" }}>
              <TextInput
                style={{ ...styles.input, marginTop: 32 }}
                placeholder="Назва"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#BDBDBD"
              ></TextInput>
              <View>
                <TextInput
                  style={{
                    ...styles.input,
                    marginBottom: 32,
                    paddingLeft: 30,
                  }}
                  placeholder="Місцевість..."
                  placeholderTextColor="#BDBDBD"
                  value={location}
                  onChangeText={setLocation}
                ></TextInput>
                <IconLocation
                  name="location-outline"
                  size={24}
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 0,
                    color: "#BDBDBD",
                    opacity: 0.5,
                  }}
                />
              </View>
              <Pressable onPress={handleAddPost}>
                <View
                  style={[
                    styles.button,
                    { backgroundColor: isFormValid ? "#FF6C00" : "#F6F6F6" },
                  ]}
                >
                  <Text
                    style={[
                      styles.textButton,
                      { color: isFormValid ? "#fff" : "#BDBDBD" },
                    ]}
                  >
                    Опубліковати
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
          <Pressable style={styles.iconTrash}>
            <IconTrash
              name="trash-2"
              size={24}
              style={{ color: "#BDBDBD" }}
              onPress={resetForm}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    minHeight: 829,
    flexDirection: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 32,
    backgroundColor: "#fff",
  },
  image: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderWidth: 1,
    height: 240,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  icon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 60,
    backgroundColor: "white",
    borderRadius: 30,
  },
  text: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 19,
    textAlign: "left",
    color: "#BDBDBD",
    marginTop: 10,
  },
  input: {
    height: 50,
    marginBottom: 16,
    paddingVertical: 16,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  button: {
    width: 350,
    height: 51,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    paddingVertical: 16,
  },
  textButton: {
    fontSize: 16,
    lineHeight: 18.75,
    fontWeight: 400,
    // color: "#BDBDBD",
    textAlign: "center",
  },
  iconLocation: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    color: "#BDBDBD",
  },

  iconTrash: {
    backgroundColor: "#F6F6F6",
    marginTop: "auto",
    width: 70,
    height: 40,
    marginBottom: 34,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  flipContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    top: 0,
    left: 0,
    transform: [{ translateX: -130 }, { translateY: -80 }],
  },
});
