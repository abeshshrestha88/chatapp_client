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
import {
  validateVerificationCodeApiCall,
  clearErrorMsg,
} from "../../redux/actions/authAction";
// import { registerForPushNotificationsAsync } from "../../helpers/functions";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
// import * as Notifications from "expo-notifications";
import { requestVerificationCodeApiCall } from "../../redux/actions/authAction";

const VerifyCodeScreen = ({
  navigation,
  selectedCountry,
  phoneNumber,
  validateVerificationCodeApiCall,
  isAuthenticated,
  errorMessage,
  clearErrorMsg,
}) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [minute, setMinute] = useState("");
  const [second, setSecond] = useState("");
  // const [timer, setTimer] = useState(2);

  useEffect(() => {
    verificationCode.length > 0 ? setBtnDisabled(false) : setBtnDisabled(true);
  }, [verificationCode]);

  const setTimer = (sec) => {
    var countDownTime = new Date().getTime() + 0.3 * 60000;

    const intervalHandle = setInterval(function (timeValue) {
      var presentTime = new Date().getTime();
      var distance = countDownTime - presentTime;

      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(intervalHandle);
        console.log("completed");
      } else {
        setMinute(minutes);
        setSecond(seconds);
        // console.log("Minutes", minutes);
        // console.log("Second", seconds);
      }

      // alert("Hello");
      // console.log(timeValue);
    }, sec);
    // return intervalHandle;
  };

  useEffect(() => {
    setTimer(1000);
  }, []);

  useEffect(() => {
    console.log("error msg in use effec is");
    if (errorMessage) {
      alert(errorMessage);
    }

    clearErrorMsg();
  }, [errorMessage]);

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
    console.log("handle verfiy clicked...");

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

  const resendSmsMsg = () => {
    console.log("resend btn clicked");
    setTimer(1000);
    requestVerificationCodeApiCall(phoneNumber, selectedCountry.phonecode);
  };

  return (
    <View style={styles.screenWrapper}>
      <View style={styles.screenRow1}>
        <View style={styles.registrationInstructionWrapper}>
          <Text style={styles.heading}>Activate your account</Text>
          <Text style={styles.instructionDescription}>
            {`We're sending SMS to your number `}
          </Text>
          <Text
            style={styles.instructionPhoneNumber}
          >{`+${selectedCountry.phonecode} ${phoneNumber}`}</Text>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your SMS code"
            keyboardType="numeric"
            value={verificationCode}
            onChangeText={(text) => setVerificationCode(text)}
          ></TextInput>
        </View>
        <View style={styles.timerWrapper}>
          <Text style={[styles.center]}>
            {minute < 10 ? `0${minute}:${second}` : `${minute}:${second}`}
          </Text>
        </View>
        <View style={styles.continueWrapper}>
          <TouchableOpacity
            style={
              btnDisabled ? styles.submitButtonDisabled : styles.submitButton
            }
            onPress={handleVerificationSubmit}
            disabled={btnDisabled}
          >
            <Text
              style={
                btnDisabled ? styles.submitTextDisabled : styles.submitText
              }
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
        {minute == 0 && second == 0 ? (
          <View style={[styles.showResendSms]}>
            <TouchableOpacity onPress={resendSmsMsg}>
              <Text style={styles.center}>Resend Sms</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>

      <View style={styles.screenRow2}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUpScreen");
          }}
        >
          <Text style={[styles.editPhoneNumber]}>Edit phone number?</Text>
        </TouchableOpacity>
        {/* <Text>djfkfdjk</Text> */}
      </View>
    </View>
  );
};

mapStateToProps = (state) => {
  return {
    selectedCountry: state.countriesCodes.selectedCountry,
    phoneNumber: state.countriesCodes.phoneNumber,
    isAuthenticated: state.authReducer.isAuthenticated,
    errorMessage: state.authReducer.errorMessage,
  };
};

export default connect(mapStateToProps, {
  validateVerificationCodeApiCall: validateVerificationCodeApiCall,
  clearErrorMsg,
})(VerifyCodeScreen);

const styles = StyleSheet.create({
  center: {
    textAlign: "center",
  },
  marginBottom: {
    marginBottom: 30,
  },
  screenWrapper: {
    margin: 15,
    marginHorizontal: 30,
    flex: 1,
    paddingTop: 70,
    // backgroundColor: "yellow",
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
  instructionPhoneNumber: {
    color: "#8e8e8e",
    textAlign: "center",
    marginBottom: 30,
    fontSize: 16,
    fontWeight: "bold",
  },
  textInput: {
    padding: 5,
    fontSize: 20,
  },
  inputWrapper: {
    marginBottom: 30,
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: "#EAE9EA",
  },
  submitButton: {
    backgroundColor: "#33F0C2",
    paddingVertical: 15,
    borderRadius: 2,
    width: "50%",
    alignSelf: "center",
    borderRadius: 50,
  },
  submitButtonDisabled: {
    backgroundColor: "#C6C6C6",
    paddingVertical: 15,
    borderRadius: 2,
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
  submitTextDisabled: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#7F7F7F",
  },
  continueWrapper: {
    marginBottom: 30,
  },
  timerWrapper: {
    marginBottom: 15,
  },
  smsResend: {
    marginBottom: 15,
  },

  screenRow1: {
    // backgroundColor: "red",
    flexGrow: 2,
  },
  screenRow2: {
    // backgroundColor: "green",
    flexDirection: "row",
    paddingBottom: 30,
    justifyContent: "center",
  },
  editPhoneNumber: {
    fontSize: 16,
    // borderWidth: 5,
    borderBottomColor: "red",
    borderBottomWidth: 5,
  },
});
