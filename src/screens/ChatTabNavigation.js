import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { NavigationContainer, CommonActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import ContactsTabStackNavigation from "./tabStackNavigation/ContactsTabStackNavigation";

import SettingsTabStackNavigation from "./tabStackNavigation/SettingsTabStackNavigation";
import recentConversationTabStackNavigation from "./tabStackNavigation/recentConversationTabStackNavigation";
import { setPushNotificationTokenAction } from "../redux/actions/pushNotificationAction";
import { pullPhoneContactList } from "../redux/actions/contactsAction";

import { StackActions, NavigationActions } from "react-navigation";
import { registerForPushNotificationsAsync } from "../helpers/functions";
import Constants from "expo-constants";
// import * as Notifications from "expo-notifications";
// import * as Permissions from "expo-permissions";
import { connect } from "react-redux";

import { PermissionsAndroid } from "react-native";
import Contacts from "react-native-contacts";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

const ChatTabNavigation = ({
  navigation,
  // setPushNotificationTokenAction,
  conversationId,
  pullPhoneContactList,
}) => {
  useEffect(() => {
    console.log("inside use effect of chattab navigation ");

    try {
      if (Platform.OS == "android") {
        const requestPermissions = async () => {
          let andoidContactPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              title: "Contacts",
              message: "This app would like to view your contacts.",
              buttonPositive: "Please accept bare mortal",
            }
          );

          console.log("permission is", andoidContactPermission);

          if (andoidContactPermission.toLowerCase() === "granted") {
            console.log("Contacts Permission granted");
            Contacts.getAll().then((contactList) => {
              pullPhoneContactList(contactList);
            });
          } else {
            console.log("Contacts permission denied");
          }
        };

        requestPermissions();
      } else {
        console.log("inside use effect of chattab navigation- else ");
        Contacts.getAll().then((contactList) => {
          console.log("####contact list in use effect", contactList);

          pullPhoneContactList(contactList);
        });
      }

      // const andoidContactPermission = await PermissionsAndroid.request(
      //   PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      //   {
      //     title: "Contacts Permission",
      //     message: "This app would like to view your contacts.",
      //     buttonNeutral: "Ask Me Later",
      //     buttonNegative: "Cancel",
      //     buttonPositive: "OK",
      //   }
      // );
    } catch (err) {
      console.log(err);
    }
  });

  // const responseListener = useRef();
  // const notificationListener = useRef();
  // const [notifications, setNotifications] = useState(null);
  // const [appInForeGround, setAppInForeGround] = useState(true);

  // useEffect(() => {
  //   // registerForPushNotificationsAsync(
  //   //   Constants,
  //   //   Permissions,
  //   //   Notifications,
  //   //   Platform
  //   // ).then((expoPushToken) => {
  //   //   setPushNotificationTokenAction(expoPushToken);

  //   //   // console.log("inside chat tab navigation");
  //   //   // console.log(`token is: ${token}`);
  //   // });

  //   notificationListener.current = Notifications.addNotificationReceivedListener(
  //     (notification) => {
  //       setNotifications(
  //         notification
  //         // notification.request.content.data.body.conversationId
  //       );
  //     }
  //   );

  //   // responseListener.current = Notifications.addNotificationResponseReceivedListener(
  //   //   (response) => {
  //   //     if (response.notification.request.content.title == "greetings") {
  //   //       console.log("inside if in greeting");
  //   //       navigation.navigate("UserProfilePage");
  //   //       // navigation.navigate("Settings", {
  //   //       //   currentUserId,
  //   //       // });
  //   //     }
  //   //     console.log("called after tapping notification");
  //   //     console.log(response);
  //   //   }
  //   // );

  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener);
  //     Notifications.removeNotificationSubscription(responseListener);
  //   };
  // }, []);

  // let notificationConversationId;
  // if (notifications) {
  //   if (Platform.OS === "android") {
  //     notificationConversationId =
  //       notifications.request.content.data.conversationId;
  //   } else {
  //     notificationConversationId =
  //       notifications.request.content.data.body.conversationId;
  //   }
  // }

  // Notifications.setNotificationHandler({
  //   handleNotification: async () => {
  //     if (notificationConversationId == conversationId) {
  //       return Promise.reject("This notification should not be shown");
  //     }
  //     return {
  //       shouldShowAlert: true,
  //       shouldSetBadge: false,
  //       shouldPlaySound: false,
  //     };
  //   },
  //   handleSuccess: (notificationId) => console.log("onSuccess"), //when promise resolved
  //   handleError: (notificationId, error) =>
  //     console.log("onErr, reason:", error), //when promise rejected
  // });

  // setNotifications(null);

  const Tab = createBottomTabNavigator();

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === "Chat") {
        name = "comment";
        iconFilled = focused ? "solid" : "";
      } else if (route.name === "Contacts") {
        name = "address-book";
        iconFilled = focused ? "solid" : "";
      } else if (route.name === "Settings") {
        name = "comment";
        iconFilled = focused ? "solid" : "";
      }
      return (
        <FontAwesome5
          name={name}
          iconFilled={iconFilled}
          size={size}
          color={color}
        />
      );
    },
  });

  const tabBarOptions = {
    activeTintColor: "tomato",
    inactiveTintColor: "gray",
  };

  return (
    <NavigationContainer independent>
      <Tab.Navigator
        screenOptions={screenOptions}
        tabBarOptions={tabBarOptions}
      >
        <Tab.Screen
          name="Chat"
          component={recentConversationTabStackNavigation}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              // Prevent default action
              e.preventDefault();

              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: "Chat",
                    },
                  ],
                })
              );
            },
          })}
        />
        <Tab.Screen
          name="Contacts"
          component={ContactsTabStackNavigation}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              // Prevent default action
              e.preventDefault();
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: "Contacts",
                    },
                  ],
                })
              );
            },
          })}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsTabStackNavigation}
          // listeners={({ navigation, route }) => ({
          //   tabPress: (e) => {
          //     // Prevent default action
          //     e.preventDefault();

          //     navigation.dispatch(
          //       CommonActions.reset({
          //         index: 0,
          //         routes: [
          //           {
          //             name: "Settings",
          //           },
          //         ],
          //       })
          //     );
          //   },
          // })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  currentUserId: state.authReducer.userId,
  conversationId: state.pushNotificationReducer.conversationId,
});

const mapDispatchToProps = {
  setPushNotificationTokenAction,
  pullPhoneContactList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatTabNavigation);

const styles = StyleSheet.create({
  screenWrapper: {
    margin: 20,
    borderWidth: 1,
    flex: 1,
    padding: 20,
  },
});
