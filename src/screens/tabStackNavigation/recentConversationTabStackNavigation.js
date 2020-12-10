import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AddGroup from "../components/AddGroup";
import { createStackNavigator } from "@react-navigation/stack";
import { CommonActions } from "@react-navigation/native";
import { connect } from "react-redux";

import HeaderBackButton from "../../screens/components/HeaderBackButton";

// import ContactScreenTab from "../contactTabScreens/ContactScreenTab";
// import ContactScreenTabFindContact from "../contactTabScreens/ContactScreenTabFindContact";

// import AddContact from "../contactTabScreens/AddContact";
// import MessageScreen from "../chatTabScreens/messageScreen";
import RecentConversationTab from "../tabScreens/recentConversationTabScreens/RecentConverstations";

import { Feather } from "@expo/vector-icons";
import MessageScreen from "../tabScreens/chatTabScreens/messageScreen";
import groupMessageScreen from "../tabScreens/chatTabScreens/groupMessageScreen";

const Stack = createStackNavigator();

const recentConversationTabStackNavigation = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Recent Conversation"
        component={RecentConversationTab}
        // options={{
        //   headerTitleAlign: "center",
        //   headerShown: true,
        //   // headerTransparent: true,
        //   headerLeft: null,
        //   gesturesEnabled: false,
        //   title: "Chats",
        // }}
        options={({ navigation, route }) => {
          return {
            headerRight: () => (
              <TouchableOpacity
                style={styles.addUserIcon}
                onPress={() => navigation.navigate("Add Group")}
              >
                <MaterialIcons name="group-add" size={24} color="black" />
              </TouchableOpacity>
            ),
            headerTitleAlign: "center",
            title: "Chats",
          };
        }}
      />

      <Stack.Screen
        name="Add Group"
        component={AddGroup}
        options={{
          headerTitleAlign: "center",
          headerShown: true,
          // headerTransparent: true,
          // headerLeft: null,
          gesturesEnabled: false,
          title: "Create Group",
        }}
      />

      <Stack.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={({ route, navigation }) => ({
          headerLeft: (props) => (
            <HeaderBackButton
              navigation={navigation}
              // onPress={handleBackBtnPress}
              {...props}
            />
          ),

          headerTitle: () => (
            <View style={styles.headerTitle}>
              <Image
                style={styles.headerImage}
                source={{
                  uri: route.params.image,
                }}
              />
              <Text style={styles.headerText}>{route.params.name}</Text>
            </View>
          ),
        })}
      />

      <Stack.Screen
        name="GroupMessageScreen"
        component={groupMessageScreen}
        options={({ route, navigation }) => ({
          headerLeft: (props) => (
            <HeaderBackButton navigation={navigation} {...props} />
          ),

          // headerTitle: () => (
          //   <View style={styles.headerTitle}>
          //     <Image
          //       style={styles.headerImage}
          //       source={{
          //         uri: route.params.image,
          //       }}
          //     />
          //     <Text style={styles.headerText}>{route.params.name}</Text>
          //   </View>
          // ),
        })}
      />
    </Stack.Navigator>
  );
};

export default connect(null, {})(recentConversationTabStackNavigation);

const styles = StyleSheet.create({
  addUserIcon: {
    padding: 10,
  },
  headerTitle: {
    flexDirection: "row",
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginRight: 10,
    marginLeft: -20,
  },
  headerText: {
    alignSelf: "center",
    color: "#000000",
    fontSize: 18,
  },
});
