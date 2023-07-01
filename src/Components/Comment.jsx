import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
} from "react-native";

import moment from "moment";
import "moment/locale/uk";

export const Comment = ({ avatar, text, date, index }) => {
  return (
    <View style={{ marginTop: 32 }}>
      <View
        style={{
          ...styles.container,
          flexDirection: index % 2 === 0 ? "row" : "row-reverse",
        }}
      >
        <ImageBackground
          style={{
            ...styles.image,
            marginRight: index % 2 === 0 ? 16 : 0,
            marginLeft: index % 2 === 0 ? 0 : 16,
          }}
        >
          {avatar}
        </ImageBackground>
        <View
          style={{
            ...styles.containerText,
            borderTopLeftRadius: index % 2 === 0 ? 0 : 6,
            borderTopRightRadius: index % 2 === 0 ? 6 : 0,
          }}
        >
          <Text style={styles.text}>{text}</Text>
          <Text style={styles.date}>
            {moment(date).locale("uk").format("DD MMMM, YYYY | HH:mm")}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "flex-start",
  },
  image: {
    width: 28,
    height: 28,
    borderRadius: 20,
    backgroundColor: "#BDBDBD",
    opacity: 0.5,
  },
  containerText: {
    backgroundColor: "#F5F5F5",
    borderRadius: 6,
    padding: 16,
    width: 200,
  },
  text: {
    color: "#212121",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: 400,
    marginBottom: 8,
  },
  date: {
    color: "#BDBDBD",
    fontSize: 10,
    lineHeight: 12,
    fontWeight: 400,
  },
});
