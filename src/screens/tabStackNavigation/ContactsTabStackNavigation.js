import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  Header,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";

import ContactScreenTab from "../tabScreens/contactTabScreens/ContactScreenTab";
import ContactScreenTabFindContact from "../tabScreens/contactTabScreens/ContactScreenTabFindContact";

import AddContact from "../tabScreens/contactTabScreens/AddContact";
import MessageScreen from "../tabScreens/chatTabScreens/messageScreen";
import groupMessageScreen from "../tabScreens/chatTabScreens/groupMessageScreen";

import { Feather } from "@expo/vector-icons";
import HeaderBackButton from "../../screens/components/HeaderBackButton";

const Stack = createStackNavigator();

function ActionBarIcon() {
  return (
    <Image
      source={{
        uri:
          "https://secure.gravatar.com/avatar/dbbab0050db2dbd84d4e2c844196ee0c?s=60&d=mm&r=g",
      }}
      style={{ width: 40, height: 40, borderRadius: 40 / 2, marginLeft: 15 }}
    />
  );
}

const ContactsTabStackNavigation = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ContactScreen"
        component={ContactScreenTab}
        // options={{
        //   headerTitleAlign: "center",
        //   headerShown: true,
        //   // headerTransparent: true,
        //   headerLeft: null,
        //   gesturesEnabled: false,
        // }}

        options={({ navigation, route }) => {
          return {
            headerLeft: () => (
              <TouchableOpacity
                style={styles.addUserIcon}
                onPress={() => navigation.navigate("Find Contact")}
              >
                <Feather name="user-plus" size={24} color="black" />
              </TouchableOpacity>
            ),
            headerTitleAlign: "center",
            title: "Contacts",
          };
        }}
      />
      <Stack.Screen
        name="Find Contact"
        component={ContactScreenTabFindContact}
        options={{}}
      />
      <Stack.Screen name="Add Contact" component={AddContact} options={{}} />
      <Stack.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={({ route, navigation }) => ({
          headerLeft: (props) => (
            <HeaderBackButton navigation={navigation} {...props} />
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

export default connect(null, {})(ContactsTabStackNavigation);

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
