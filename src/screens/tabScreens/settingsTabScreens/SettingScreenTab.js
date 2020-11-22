import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Item,
  Image,
  SectionList,
  SafeAreaView,
} from "react-native";
import { connect } from "react-redux";
import ApiServer from "../../../api/ApiServer";
import * as Updates from "expo-updates";

import AsyncStorage from "@react-native-community/async-storage";

import { signOutAction } from "../../../redux/actions/authAction";

const SettingsScreenTab = ({ name, image, navigation, signOutAction }) => {
  const handleEditProfile = () => {
    navigation.navigate("UserProfilePage");
  };

  const resetLocalStorage = () => {
    console.log("reset called...");
    AsyncStorage.removeItem("chatapp_local_data");
    AsyncStorage.removeItem("chatapp_local_user_profile");

    Updates.reloadAsync();

    // signOutAction();

    // navigation.navigate();

    // AsyncStorage.setItem("chatapp_local_data", null);
    // AsyncStorage.setItem("chatapp_local_user_profile", null);
  };

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <View style={styles.screenWrapper}>
        <TouchableOpacity onPress={handleEditProfile}>
          <View style={styles.topWrapper}>
            <View style={styles.profileImage}>
              <Image style={styles.profileLogo} source={{ uri: image }} />
            </View>
            <View style={styles.settingsTop}>
              <Text style={styles.info}> {name}</Text>
              <Text style={styles.profileStatus}>
                Hi There! I'm using Paychat.
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.otherSettings}>
        <Text>Other Settings</Text>
        <View>
          <TouchableOpacity onPress={resetLocalStorage}>
            <Text>Recet local storage</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  userId: state.authReducer.userId,
  name: state.userProfileReducer.name,
  image: state.userProfileReducer.image,
});

const mapDispatchToProps = {
  signOutAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreenTab);

const styles = StyleSheet.create({
  safeAreaWrapper: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  screenWrapper: {
    margin: 20,
    flex: 1,
    backgroundColor: "#ffffff",
  },
  otherSettings: {
    flex: 5,
    margin: 20,
  },
  topWrapper: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#EAE9EA",
  },
  settingsTop: {
    marginBottom: 25,
    marginLeft: 20,
    // alignItems: "center",
  },
  profileStatus: {
    color: "#696969",
    marginLeft: 4,
    marginTop: 2,
  },
  info: {
    fontSize: 20,
  },
  profileLogo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  image: {
    marginRight: 15,
  },
  label: {},
  sectionTitle: {
    marginTop: 15,
    marginBottom: 10,
    fontSize: 18,
  },
});
