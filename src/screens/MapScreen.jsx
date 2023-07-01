import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Header } from "../components/Header";
import { useRoute } from "@react-navigation/native";

export const MapScreen = () => {
  const route = useRoute();
  const { geoLocation } = route.params.post;
  return (
    <View style={styles.container}>
      <Header pageTitle="Карта" />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: geoLocation.latitude,
          longitude: geoLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
      >
        <Marker coordinate={geoLocation} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 829,
    paddingTop: 60,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
