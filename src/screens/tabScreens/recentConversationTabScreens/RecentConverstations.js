import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Item,
  FlatList,
  Image,
} from "react-native";

import { connect } from "react-redux";
import OneToOneConversationScreen from "./OneToOneConversationScreen";
import GroupConversationScreen from "./GroupConversationScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();

const RecentConverstations = ({}) => {
  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <View style={styles.screenWrapper}>
        <Tab.Navigator>
          <Tab.Screen
            name="Conversations"
            component={OneToOneConversationScreen}
          />
          <Tab.Screen name="groups" component={GroupConversationScreen} />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentConverstations);

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

  searchWrapper: {
    marginBottom: 25,
    backgroundColor: "#e3e3e3",
    borderRadius: 20,
  },

  contactRow: {
    flexDirection: "row",
    marginBottom: 20,
    paddingVertical: 5,
  },
  image: {
    marginRight: 15,
  },

  profileLogo: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  msg_text: { marginTop: 3 },
  msg_name: { paddingTop: 5 },
  noContacts: {
    alignItems: "center",
    textAlign: "center",
  },
});
