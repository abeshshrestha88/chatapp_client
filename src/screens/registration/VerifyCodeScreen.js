import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";

import { connect } from "react-redux";
import { validateVerificationCodeApiCall } from "../../redux/actions/authAction";
// import { registerForPushNotificationsAsync } from "../../helpers/functions";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
// import * as Notifications from "expo-notifications";

const VerifyCodeScreen = ({
  navigation,
  selectedCountry,
  phoneNumber,
  validateVerificationCodeApiCall,
  isAuthenticated,
}) => {
  const [verificationCode, setVerificationCode] = useState("");
  /* change */
  // const [expoPushToken, setExpoPushToken] = useState("");
  // const [expoPushToken, setExpoPushToken] = useState("q123123");

  // useEffect(() => {
  //   console.log("use effect called in verification screen");
  //   registerForPushNotificationsAsync(
  //     Constants,
  //     Permissions,
  //     Notifications,
  //     Platform
  //   ).then((token) => {
  //     console.log("token value in use effect is", token);
  //     setExpoPushToken(token);

  //     // console.log("inside chat tab navigation");
  //     // console.log(`token is: ${token}`);
  //   });
  // }, []);

  const handleVerificationSubmit = () => {
    // console.log(
    //   "button pressed, token value before api call is",
    //   expoPushToken
    // );
    const countryCode = selectedCountry.phonecode;

    validateVerificationCodeApiCall(
      verificationCode,
      phoneNumber,
      countryCode,
      selectedCountry
    );
  };

  // if (isAuthenticated) {
  //   navigation.navigate("UserProfileScreen");
  // }

  return (
    <View style={styles.screenWrapper}>
      <View style={styles.registrationInstructionWrapper}>
        <Text style={styles.heading}>Activate your account</Text>
        <Text style={styles.instructionDescription}>
          {`We're sending SMS to your number +${selectedCountry.phonecode}${phoneNumber}`}
        </Text>
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your SMS code"
          value={verificationCode}
          onChangeText={(text) => setVerificationCode(text)}
        ></TextInput>
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleVerificationSubmit}
      >
        <Text style={styles.submitText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

mapStateToProps = (state) => {
  return {
    selectedCountry: state.countriesCodes.selectedCountry,
    phoneNumber: state.countriesCodes.phoneNumber,
    isAuthenticated: state.authReducer.isAuthenticated,
  };
};

export default connect(mapStateToProps, {
  validateVerificationCodeApiCall: validateVerificationCodeApiCall,
})(VerifyCodeScreen);

const styles = StyleSheet.create({
  screenWrapper: {
    margin: 15,
    marginHorizontal: 30,
    flex: 1,
    paddingTop: 70,
  },
  registrationInstructionWrapper: {
    marginTop: 50,
  },
  heading: {
    color: "#33F0C2",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 20,
  },
  instructionDescription: {
    color: "#8e8e8e",
    textAlign: "center",
    marginBottom: 30,
    fontSize: 16,
  },
  textInput: {
    padding: 5,
    fontSize: 20,
  },
  inputWrapper: {
    marginBottom: 10,
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: "#EAE9EA",
  },
  submitButton: {
    backgroundColor: "#33F0C2",

    paddingVertical: 15,
    borderRadius: 2,
    marginTop: 50,
    width: "50%",
    alignSelf: "center",
    borderRadius: 50,
  },
  submitText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
