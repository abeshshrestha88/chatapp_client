import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableHighlight,
  FlatList,
} from "react-native";
import * as Cellular from "expo-cellular";
import CountryListModel from "./components/CountryListModel";
import PhoneConfirmationModel from "./components/PhoneConfirmationModel";
import { connect } from "react-redux";

import {
  filterSearchListAction,
  selectedCountryAction,
  resetCountryAction,
  setPhoneNumberAction,
} from "../../redux/actions/countryListAction";

import { requestVerificationCodeApiCall } from "../../redux/actions/authAction";

import countriesList from "../../helpers/countries";
import { AntDesign } from "@expo/vector-icons";

const SignUpScreen = ({
  navigation,
  countriesLists,
  selectedCountry,
  phoneNumber,
  filterSearchListAction,
  selectedCountryAction,
  resetCountryAction,
  setPhoneNumberAction,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(
    false
  );
  const [submitButtonVisible, setSubmitButtonVisible] = useState(false);
  const [cellularDetectCountry, setcellularDetectCountry] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    phoneNumber.length > 0 ? setBtnDisabled(false) : setBtnDisabled(true);
  }, [phoneNumber]);

  useEffect(() => {
    (async () => {
      try {
        const countryCode = await Cellular.isoCountryCode;
        const defaultCountry = countriesLists.filter(
          (country) => country.iso.toString().toLowerCase() === countryCode
        );

        if (defaultCountry.length > 0) {
          selectedCountryAction(defaultCountry[0]);
        }
      } catch (err) {
        console.log(err);
        selectedCountryAction();
      }
    })();
    // setCountry(selectedCountry.name);
    // setCountryPhoneCode(`+${selectedCountry.phonecode}`);
  }, []);

  const handleModalVisible = () => {
    setModalVisible(!modalVisible);
    resetCountryAction();
  };

  const handleSearch = (event) => {
    const searchText = event.nativeEvent.text;
    filterSearchListAction(searchText);
  };

  const handleCountrySelection = (item) => {
    handleModalVisible();

    resetCountryAction();

    selectedCountryAction(item);
  };

  const handleNumberChange = (text) => {
    setPhoneNumberAction(text);
  };

  const showConfirmationMsg = () => {
    setConfirmationModalVisible(!confirmationModalVisible);
  };

  const handleEditConfirmation = () => {
    setConfirmationModalVisible(!confirmationModalVisible);
  };
  const handleAcceptConfirmation = () => {
    setConfirmationModalVisible(!confirmationModalVisible);

    navigation.navigate("VerifyCodeScreen");

    requestVerificationCodeApiCall(phoneNumber, selectedCountry.phonecode);
  };

  return (
    <SafeAreaView style={styles.screenWrapper}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={90}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView>
          <View style={styles.registrationInstructionWrapper}>
            <Text style={styles.instructionHeading}>
              Enter your phone number
            </Text>
            <Text style={styles.instructionDescription}>
              Make sure you can receive SMS to this number so that we can send
              you a code.
            </Text>
          </View>

          <TouchableOpacity onPress={handleModalVisible}>
            <View style={styles.inputWrapper}>
              <Text> {selectedCountry && selectedCountry.name} </Text>
              <AntDesign name="down" size={18} color="rgba(0,0,0,.5)" />
            </View>
          </TouchableOpacity>

          <View style={styles.phoneWrapper}>
            <View style={styles.isoWrapper}>
              <Text style={styles.label}>
                +{selectedCountry && selectedCountry.phonecode}
              </Text>
            </View>

            <View style={styles.phonenumber}>
              <TextInput
                style={styles.textInput}
                placeholder="Phone number"
                keyboardType="numeric"
                returnKeyType="done"
                value={phoneNumber}
                onChangeText={(text) => handleNumberChange(text)}
              ></TextInput>
            </View>
          </View>

          <TouchableOpacity
            style={
              btnDisabled ? styles.submitButtonDisabled : styles.submitButton
            }
            onPress={showConfirmationMsg}
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

          <CountryListModel
            modalVisible={modalVisible}
            handleModalVisible={handleModalVisible}
            listData={countriesLists}
            handleSearch={handleSearch}
            handleCountrySelection={handleCountrySelection}
          />

          <PhoneConfirmationModel
            phoneNumber={`+${selectedCountry.phonecode}${phoneNumber}`}
            modalVisible={confirmationModalVisible}
            handleEditConfirmation={handleEditConfirmation}
            handleAcceptConfirmation={handleAcceptConfirmation}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    countriesLists: state.countriesCodes.countriesLists,
    selectedCountry: state.countriesCodes.selectedCountry,
    phoneNumber: state.countriesCodes.phoneNumber,
  };
};

export default connect(mapStateToProps, {
  filterSearchListAction,
  selectedCountryAction,
  resetCountryAction,
  setPhoneNumberAction,
})(SignUpScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenWrapper: {
    margin: 15,
    marginHorizontal: 30,
    marginTop: 50,
    flex: 1,
  },
  signUp: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#011D3E",
    marginBottom: 60,
    marginTop: 60,
  },

  registrationInstructionWrapper: {
    marginTop: 50,
    textAlign: "center",
  },
  instructionHeading: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 20,
    color: "#33F0C2",
  },
  instructionDescription: {
    textAlign: "center",
    marginBottom: 70,
    fontSize: 16,
  },
  inputWrapper: {
    marginBottom: 30,
    borderBottomWidth: 2,
    borderColor: "#EAE9EA",
    marginLeft: 20,
    marginRight: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  phoneWrapper: {
    flexDirection: "row",
  },

  isoWrapper: {
    borderBottomWidth: 2,
    borderColor: "#EAE9EA",
    marginRight: 20,
    marginLeft: 20,
  },
  label: {
    alignSelf: "center",
    fontSize: 16,
    padding: 5,
  },
  phonenumber: {
    flex: 1,
    borderBottomWidth: 2,
    borderColor: "#EAE9EA",
    marginRight: 50,
  },

  textInput: {
    padding: 5,
  },

  submitButton: {
    backgroundColor: "#33F0C2",
    paddingVertical: 10,
    borderRadius: 50,
    marginTop: 35,
    width: "50%",
    alignSelf: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#C6C6C6",
    paddingVertical: 10,
    borderRadius: 50,
    marginTop: 35,
    width: "50%",
    alignSelf: "center",
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
});
