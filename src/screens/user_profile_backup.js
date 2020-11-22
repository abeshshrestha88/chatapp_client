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
import { setUserProfileAction } from "../redux/actions/userProfileAction";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import profilePicture from "../../assets/profile-placeholder.png";
import FormDataFunc from "form-data";
import { Asset } from "expo-asset";

import Button from "./components/Button";

const UserProfileScreen = ({
  navigation,
  phoneNumber,
  setUserProfileAction,
  countryCode,
}) => {
  const [datePickerVis, setDatePickerVis] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState(new Date(Date.now()));
  const [image, setImage] = useState("");
  const [formError, setFormError] = useState({});

  const calculateAge = (birthday) => {
    // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleEmailChange = (email) => {
    setEmail(email);
  };

  const handleNameChange = (name) => {
    setName(name);
  };

  const handleDatePickerShow = () => {
    setDatePickerVis(!datePickerVis);
  };

  const onDatePickerChange = (event, selectedDate) => {
    const selectedDob = selectedDate || dob;

    if (Platform.OS === "android") {
      handleDatePickerShow();
    }

    setDOB(selectedDob);
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
      const age = calculateAge(date_of_birth);
      if (age < 18) {
        form_error.err_dobBelowEighteen = true;
        Alert.alert(
          "Restricted Age",
          "You must be 18 years old or above to use this app.",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      }
    }

    setFormError(form_error);
    /* end :: form validation code */

    if (Object.keys(form_error).length === 0) {
      if (image === "") {
        const getDefaultURL = () => {
          const imageURI = Asset.fromModule(
            require("../../assets/profile-placeholder.png")
          ).uri;

          return imageURI.split("?")[0];
        };

        const defaultImageUrl = getDefaultURL();

        setImage(defaultImageUrl);
      }

      setUserProfileAction(
        {
          name,
          email,
          dob: dob.toString(),
          countryCode,
          phoneNumber,
        },
        { image_url: image }
      );
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
      setImage(result.uri);
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
          placeholder="Input your name"
          value={name}
          autoCapitalize="none"
          onChangeText={handleNameChange}
        ></TextInput>

        {formError.err_name && (
          <Text style={styles.txt_error}>Name Should not be empty.</Text>
        )}
      </View>

      <View style={styles.fieldWrapper}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.textInput}
          placeholder="email"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => handleEmailChange(text)}
        ></TextInput>
        {formError.err_email && (
          <Text style={styles.txt_error}>Email Should not be empty.</Text>
        )}
      </View>

      <View style={styles.fieldWrapper}>
        <Text style={styles.label}>DOB</Text>
        <TouchableOpacity onPress={handleDatePickerShow}>
          <Text style={styles.text}>
            {moment(dob, "MM-DD-YYYY").utc().format("DD-MMM-YYYY")}
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
        <Button handleSubmit={handleSubmit} buttonText="Submit" />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    phoneNumber: state.countriesCodes.phoneNumber,
    countryCode: state.countriesCodes.selectedCountry.phonecode,
  };
};

export default connect(mapStateToProps, {
  setUserProfileAction: setUserProfileAction,
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
    width: 200,
    height: 200,
    alignSelf: "center",
  },
});
