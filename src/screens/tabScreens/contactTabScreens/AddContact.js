import React, { Component, useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import Button from "../../components/Button";
import ApiServer from "../../../api/ApiServer";

const AddContact = ({ route, navigation, currentUserId }) => {
  // const [expoPushToken, setExpoPushToken] = useState("");
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();

  const {
    id,
    country_code,
    phone_number,
    name,
    profile_img_url,
  } = route.params.userProfile;

  const contactToAddId = id;

  /* Start :: Event function call */
  const handleSubmit = async () => {
    // await schedulePushNotification();
    // addContactsApiCall(currentUserId, contactToAddId);
    try {
      const res = await ApiServer.post("/api/contacts/add-contact", {
        currentUserId,
        contactToAddId,
      });
    } catch (error) {
      console.log("error calling api");
    }

    navigation.navigate("ContactScreen", {
      currentUserId,
    });
  };

  const handleChangeProfilePicture = () => {};

  /* End :: Event function call */

  const imageJSX = () => {
    if (profile_img_url === "") {
      return (
        <Image
          style={styles.profileLogo}
          source={require("../../../../assets/profile-placeholder.png")}
        />
      );
    } else {
      return (
        <Image style={styles.profileLogo} source={{ uri: profile_img_url }} />
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Image style={styles.profile_img} source={{ uri: profile_img_url }} />
      <View style={styles.screenWrapper}>
        <View style={styles.imageWrapper}></View>

        <View style={styles.textWrapper}>
          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>NAME</Text>
          </View>
          <View style={styles.textField}>
            <Text>{name}</Text>
          </View>
          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>PHONE</Text>
          </View>

          <View style={styles.textField}>
            <Text>{`+${country_code} ${phone_number}`}</Text>
          </View>
        </View>

        <View>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  currentUserId: state.authReducer.userId,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddContact);
const styles = StyleSheet.create({
  screenWrapper: {
    margin: 5,
    flex: 3,
    padding: 20,
  },

  imageWrapper: {
    marginBottom: 20,
  },
  textWrapper: {
    marginBottom: 30,
  },
  profile_img: {
    flex: 3,
  },
  fieldWrapper: {
    marginBottom: 10,
  },
  textField: {
    marginBottom: 20,
    borderBottomColor: "#e3e3e3",
    borderBottomWidth: 1,
    padding: 5,
  },
  label: {
    marginRight: 10,
  },
  textInput: {
    borderBottomWidth: 2,
    borderColor: "#EAE9EA",
    padding: 10,
  },
  text: {
    borderBottomWidth: 2,
    borderColor: "#EAE9EA",
    padding: 10,
    color: "#D1D1D1",
  },
  profileLogo: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  submitButton: {
    backgroundColor: "#33F0C2",
    paddingVertical: 10,
    borderRadius: 50,
    marginTop: 1,
    width: "50%",
    alignSelf: "center",
  },
  submitText: {
    textAlign: "center",
    fontSize: 18,
    color: "#ffffff",
  },
});
