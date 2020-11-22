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

import SettingScreenTab from "../tabScreens/settingsTabScreens/SettingScreenTab";
// import ContactScreenTabFindContact from "../tabScreens/contactTabScreens/ContactScreenTabFindContact";

// import AddContact from "../tabScreens/contactTabScreens/AddContact";
import UserProfilePage from "../tabScreens/settingsTabScreens/UserProfilePage";

import { Feather } from "@expo/vector-icons";
import HeaderBackButton from "../../screens/components/HeaderBackButton";

const Stack = createStackNavigator();

const ContactsTabStackNavigation = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingScreenTab}
        options={({ route, navigation }) => ({
          headerLeft: (props) => (
            <HeaderBackButton navigation={navigation} {...props} />
          ),
        })}
      />
      <Stack.Screen
        name="UserProfilePage"
        component={UserProfilePage}
        options={({}) => ({
          title: "Profile",
        })}
        // options={({ route, navigation }) => ({
        //   headerLeft: (props) => (
        //     <HeaderBackButton navigation={navigation} {...props} />
        //   ),

        //   headerTitle: () => (
        //     <View style={styles.headerTitle}>
        //       <Image
        //         style={styles.headerImage}
        //         source={{
        //           uri: route.params.image,
        //         }}
        //       />
        //       <Text style={styles.headerText}>{route.params.name}</Text>
        //     </View>
        //   ),
        // })}
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
