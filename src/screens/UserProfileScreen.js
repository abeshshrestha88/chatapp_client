import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import moment from "moment";
import ApiServer from "../api/ApiServer";
import {
  setUserProfileAction,
  setNameAction,
  setEmailAction,
  setDobAction,
  setImageAction,
} from "../redux/actions/userProfileAction";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import profilePicture from "../../assets/profile-placeholder.png";
import FormDataFunc from "form-data";
import { Asset } from "expo-asset";

import Button from "./components/Button";

import { getUserAgeFromDOB } from "../helpers/functions";

const UserProfileScreen = ({
  navigation,
  phoneNumber,
  countryCode,
  name,
  email,
  dob,
  image,
  setUserProfileAction,
  setNameAction,
  setEmailAction,
  setDobAction,
  setImageAction,
}) => {
  const [datePickerVis, setDatePickerVis] = useState(false);
  const [formError, setFormError] = useState({});

  const handleEmailChange = (email) => {
    setEmailAction(email);
  };

  const handleNameChange = (name) => {
    setNameAction(name);
  };

  const handleDatePickerShow = () => {
    setDatePickerVis(!datePickerVis);
  };

  const onDatePickerChange = (event, selectedDate) => {
    const selectedDob = selectedDate || dob;

    if (Platform.OS === "android") {
      handleDatePickerShow();
    }
    setDobAction(selectedDob);
  };

  const handleSubmit = () => {
    const phone = "+" + countryCode + phoneNumber;

    /* start :: form validation code */
    const form_error = {};

    if (name === "") {
      form_error.err_name = "Name is Empty";
    }

    if (email === "") {
      form_error.err_email = "Email is Empty";
    }

    if (dob === "") {
      form_error.err_dob = "DOB is Empty";
    } else {
      const date_of_birth = new Date(dob);
      const age = getUserAgeFromDOB(date_of_birth);
      if (age < 18) {
        form_error.err_dobBelowEighteen = true;
      }
    }

    setFormError(form_error);
    /* end :: form validation code */

    if (Object.keys(form_error).length === 0) {
      if (image === "") {
        const defaultImageUrl = "";

        setImageAction(defaultImageUrl);

        setUserProfileAction(
          {
            name,
            email,
            dob: dob,
            countryCode,
            phoneNumber,
          },
          { image_url: defaultImageUrl }
        );
        // navigation.navigate("ChatScreen");
      } else {
        setUserProfileAction(
          {
            name,
            email,
            dob: dob,
            countryCode,
            phoneNumber,
          },
          { image_url: image }
        );
        navigation.navigate("ChatScreen");
      }
    }
  };

  const handleChangeProfilePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageAction(result.uri);
    }
  };

  const imageJSX = () => {
    if (image === "") {
      return (
        <Image
          style={styles.profileLogo}
          source={require("../../assets/profile-placeholder.png")}
        />
      );
    } else {
      return <Image style={styles.profileLogo} source={{ uri: image }} />;
    }
  };

  return (
    <View style={styles.screenWrapper}>
      <View style={styles.fieldWrapper}>
        <TouchableOpacity onPress={handleChangeProfilePicture}>
          {imageJSX()}
        </TouchableOpacity>
      </View>

      <View style={styles.fieldWrapper}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={[styles.textInput]}
          placeholder="Full Name"
          value={name}
          autoCapitalize="none"
          onChangeText={handleNameChange}
        ></TextInput>

        {formError.err_name && (
          <Text style={styles.txt_error}>Name should not be empty.</Text>
        )}
      </View>

      <View style={styles.fieldWrapper}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => handleEmailChange(text)}
        ></TextInput>
        {formError.err_email && (
          <Text style={styles.txt_error}>Email should not be empty.</Text>
        )}
      </View>

      <View style={styles.fieldWrapper}>
        <Text style={styles.label}>DOB</Text>
        <TouchableOpacity onPress={handleDatePickerShow}>
          <Text style={styles.text}>
            {moment(dob, "MM-DD-YYYY").format("MM/DD/YYYY")}
          </Text>
        </TouchableOpacity>

        {datePickerVis && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dob}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onDatePickerChange}
            maximumDate={new Date()}
          />
        )}

        {formError.err_dobBelowEighteen && (
          <Text style={styles.txt_error}>Age below 18 are restricted.</Text>
        )}
      </View>

      <View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    phoneNumber: state.countriesCodes.phoneNumber,
    countryCode: state.countriesCodes.selectedCountry.phonecode,
    name: state.userProfileReducer.name,
    email: state.userProfileReducer.email,
    dob: state.userProfileReducer.dob,
    image: state.userProfileReducer.image,
  };
};

export default connect(mapStateToProps, {
  setUserProfileAction,
  setNameAction,
  setEmailAction,
  setDobAction,
  setImageAction,
})(UserProfileScreen);

const styles = StyleSheet.create({
  screenWrapper: {
    margin: 20,
    flex: 1,
    padding: 20,
  },
  fieldWrapper: {
    marginBottom: 15,
  },
  label: {},
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
  txt_error: {
    color: "red",
  },
  profileLogo: {
    backgroundColor: "#C0C0C0",
    width: 50,
    height: 50,
    alignSelf: "center",
    borderRadius: 20,
    marginTop: 30,
    marginBottom: 30,
    padding: 50,
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
