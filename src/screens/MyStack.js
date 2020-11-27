import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, AppState } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";

import ApiServer from "../api/ApiServer";

import UserDetailScreen from "./UserDetailScreen";
import WelcomeScreen from "./registration/WelcomeScreen";
import SignUpScreen from "./registration/SignUpScreen";
import VerifyCodeScreen from "./registration/VerifyCodeScreen";
import LoginScreen from "./LoginScreen";
import UserProfileScreen from "./UserProfileScreen";
import ChatTabNavigation from "./ChatTabNavigation";
import SplashScreen from "./SplashScreen";
import { resetPushNotificationConversationAction } from "../redux/actions/pushNotificationAction";

const Stack = createStackNavigator();

const MyStack = ({
  isLoading,
  isAuthenticated,
  name,
  userProfileSet,
  isLoadingUserProfile,
  userId,
  resetPushNotificationConversationAction,
}) => {
  const navigationScreen = () => {
    // const handleAppStateChange = async () => {
    //   console.log("inside handle change");

    // if (AppState.currentState == "active") {
    //   console.log("stae is active");

    //   try {
    //     console.log("before api call");
    //     console.log(userId);
    //     const res = await ApiServer.post("/api/user-profile/status", {
    //       isOnline: true,
    //       userId: userId,
    //     });
    //   } catch (error) {
    //     console.log("contacts list error calling api");
    //     console.log(error);
    //   }
    // } else {
    //   console.log("state is inactive");
    //   try {
    //     const res = await ApiServer.post("/api/user-profile/status", {
    //       isOnline: false,
    //       userId: userId,
    //     });
    //   } catch (error) {
    //     console.log("contacts list error calling api");
    //     console.log(error);
    //   }
    // }
    // };

    // useEffect(() => {
    //   console.log("user effect calle din stack");

    //   if (userId) {
    //     handleAppStateChange();
    //     AppState.addEventListener("change", handleAppStateChange);
    //   }

    //   return () => {
    //     AppState.removeEventListener("change", handleAppStateChange);
    //   };
    // }, [userId]);

    if (isLoading) {
      return (
        <>
          <Stack.Screen
            options={{ headerShown: false }}
            name="SplashScreen"
            component={SplashScreen}
          />
        </>
      );
    }

    if (!isLoading && isAuthenticated) {
      if (isLoadingUserProfile) {
        console.log("loadign user profile");
        return (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="SplashScreen"
              component={SplashScreen}
            />
          </>
        );
      }

      if (!userProfileSet) {
        return (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="UserProfileScreen"
              component={UserProfileScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="ChatScreen"
              component={ChatTabNavigation}
            />
          </>
        );
      }

      if (userProfileSet && name !== "") {
        return (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="ChatScreen"
              component={ChatTabNavigation}
            />
          </>
        );
      }
    }

    if (!isLoading && !isAuthenticated) {
      return (
        <>
          <Stack.Screen
            options={{ headerShown: false }}
            name="WelcomeScreen"
            component={WelcomeScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SignUpScreen"
            component={SignUpScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="VerifyCodeScreen"
            component={VerifyCodeScreen}
          />
        </>
      );
    }
  };

  return <Stack.Navigator>{navigationScreen()}</Stack.Navigator>;
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.authReducer.isLoading,
    isAuthenticated: state.authReducer.isAuthenticated,
    name: state.userProfileReducer.name,
    userProfileSet: state.userProfileReducer.userProfileSet,
    isLoadingUserProfile: state.userProfileReducer.isLoadingUserProfile,
    userId: state.authReducer.userId,
  };
};

export default connect(mapStateToProps, {
  resetPushNotificationConversationAction,
})(MyStack);

const styles = StyleSheet.create({});
