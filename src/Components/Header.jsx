import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export const Header = (props) => {
  const { pageTitle } = props;
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>{pageTitle}</Text>
      </View>
      <Icon name="logout" style={styles.icon} size={24} />
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
});
