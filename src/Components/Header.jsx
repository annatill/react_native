import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import IconBack from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";

export const Header = (props) => {
  const { pageTitle } = props;
  const route = useRoute();
  const navigation = useNavigation();

  const handleBack = () => {
    if (
      route.name === "CreatePosts" ||
      route.name === "Comments" ||
      route.name === "Map"
    ) {
      navigation.navigate("Posts");
    }
  };

  const renderIcon = () => {
    if (route.name === "Posts") {
      return <Icon name="logout" style={styles.icon} size={24} />;
    } else if (
      route.name === "CreatePosts" ||
      route.name === "Comments" ||
      route.name === "Map"
    ) {
      return (
        <IconBack
          name="arrow-back"
          style={styles.iconBack}
          size={24}
          onPress={handleBack}
        />
      );
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>{pageTitle}</Text>
      </View>
      {renderIcon()}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    height: 44,
    position: "relative",
    borderBottomColor: "#9C9C9C",
    borderBottomWidth: 1,
  },

  text: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: 500,
    color: "#212121",
  },
  icon: {
    position: "absolute",
    right: 20,
    top: 42,
    color: "#BDBDBD",
  },
  iconBack: {
    position: "absolute",
    left: 20,
    top: 42,
    color: "#212121cc",
  },
});
