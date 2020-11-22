import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Swiper,
  Dimensions,
  Image,
  TextInput,
} from "react-native";
import ApiServer from "../../../api/ApiServer";
import { connect } from "react-redux";
import { FontAwesome5, Zocial, Foundation, Entypo } from "@expo/vector-icons";

const UserProfilePage = ({ name, image, email, phoneNumber, phoneCode }) => {
  return (
    <View style={{ flex: 1 }}>
      <Image style={styles.profile_img} source={{ uri: image }} />
      <SafeAreaView style={styles.safeAreaWrapper}>
        <View style={styles.UserInfoWrapper}>
          <View style={styles.screenWrapper}>
            <View style={styles.vectors}>
              <FontAwesome5 name="user-alt" size={24} color="#33F0C2" />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.info}> {name}</Text>
              <Text style={styles.infoText}>
                This is not your username. This name will be visible to your
                Chatpay contacts.
              </Text>
            </View>
          </View>
          <View style={styles.screenWrapper}>
            <View style={styles.vectors}>
              <Zocial name="email" size={24} color="#33F0C2" />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.info}> {email}</Text>
            </View>
          </View>
          <View style={styles.screenWrapper}>
            <View style={styles.vectors}>
              <Foundation name="telephone" size={24} color="#33F0C2" />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.label}>Phone number</Text>
              <Text style={styles.info}>
                {" "}
                {`+ ${phoneCode} ${phoneNumber}`}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  userId: state.authReducer.userId,
  name: state.userProfileReducer.name,
  image: state.userProfileReducer.image,
  email: state.userProfileReducer.email,
  phoneNumber: state.countriesCodes.phoneNumber,
  phoneCode: state.countriesCodes.selectedCountry.phonecode,
});

export default connect(mapStateToProps)(UserProfilePage);

const styles = StyleSheet.create({
  safeAreaWrapper: {
    flex: 3,
    backgroundColor: "#ffffff",
  },
  profile_img: {
    flex: 3,
    backgroundColor: "powderblue",
  },
  UserInfoWrapper: {
    padding: 20,
    // backgroundColor: "red",
    flexDirection: "column",
    flex: 1,
  },
  screenWrapper: {
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 20,
    paddingRight: 20,
    backgroundColor: "#ffffff",
  },

  label: {
    color: "#696969",
    marginBottom: 5,
  },
  userInfo: {
    marginLeft: 25,
  },
  vectors: {
    marginTop: 10,
  },
  info: {
    marginBottom: 5,
  },
  infoText: {
    color: "#C0C0C0",
  },
});
