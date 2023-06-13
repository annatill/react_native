import { View, Text, StyleSheet, Pressable } from "react-native";
import IcoPlus from "react-native-vector-icons/AntDesign";
import IconSquare from "react-native-vector-icons/MaterialCommunityIcons";
import IconHuman from "react-native-vector-icons/Ionicons";

export const Footer = () => {
  //если мы находимся на PostScreen, CreatePostsScreen, то на контейнер дать marginTop: "auto"
  return (
    <View style={styles.container}>
      <Pressable>
        <IconSquare name="vector-square" size={24} />
      </Pressable>
      <View>
        <Pressable>
          <View style={styles.buttonContainer}>
            <Text style={styles.button}>+</Text>
          </View>
        </Pressable>
      </View>
      <Pressable>
        <IconHuman name="ios-people-outline" size={24} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    // marginTop: "auto",
    paddingBottom: 34,
    paddingTop: 10,
  },
  button: {
    color: "#fff",
    fontSize: 30,
    fontWeight: 400,
    textAlign: "center",
    textAlignVertical: "center",
  },
  buttonContainer: {
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    width: 70,
    height: 40,
    marginHorizontal: 40,
  },
});
