import { View, Text, StyleSheet, Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PostsScreen } from "./PostsScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { ProfileScreen } from "./ProfileScreen";
import IconSquare from "react-native-vector-icons/MaterialCommunityIcons";
import IconHuman from "react-native-vector-icons/Ionicons";
import { Header } from "../components/Header";

export const HomeScreen = () => {
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator
      initialRouteName="Posts"
      backBehavior="none"
      screenOptions={({ route, navigation }) => ({
        tabBarStyle: {
          paddingTop: 10,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "CreatePosts") {
            return (
              <Pressable onPress={() => navigation.navigate("CreatePosts")}>
                <View
                  style={{
                    ...styles.buttonContainer,
                    backgroundColor: (iconName = focused ? "#FF6C00" : "#fff"),
                  }}
                >
                  <Text
                    style={{
                      ...styles.button,
                      color: (iconName = focused ? "#fff" : "#212121"),
                    }}
                    name="plus"
                  >
                    +
                  </Text>
                </View>
              </Pressable>
            );
          }
          if (route.name === "Posts") {
            return (
              <Pressable onPress={() => navigation.navigate("Posts")}>
                <View
                  style={{
                    ...styles.buttonContainer,
                    backgroundColor: (iconName = focused ? "#FF6C00" : "#fff"),
                  }}
                >
                  <IconSquare
                    name="vector-square"
                    size={24}
                    color={(iconName = focused ? "#fff" : "#212121")}
                  />
                </View>
              </Pressable>
            );
          }
          if (route.name === "Profile") {
            return (
              <Pressable onPress={() => navigation.navigate("Profile")}>
                <View
                  style={{
                    ...styles.buttonContainer,
                    backgroundColor: (iconName = focused ? "#FF6C00" : "#fff"),
                  }}
                >
                  <IconHuman
                    name="ios-people-outline"
                    size={24}
                    color={(iconName = focused ? "#fff" : "#212121")}
                  />
                </View>
              </Pressable>
            );
          }
        },
      })}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 100,
    width: 70,
    height: 40,
    marginHorizontal: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    fontSize: 30,
    fontWeight: 400,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
