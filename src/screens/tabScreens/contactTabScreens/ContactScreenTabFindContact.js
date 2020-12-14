import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import ButtonDone from "../../components/Button";
import { connect } from "react-redux";
import CountryListModel from "../../registration/components/CountryListModel";
import { pullPhoneContactList } from "../../../redux/actions/contactsAction";
import ApiServer from "../../../api/ApiServer";
import { set } from "lodash";
import {
  filterSearchListAction,
  selectCountry,
  resetCountryAction,
} from "../../../redux/actions/countryListAction";
import Contacts from "react-native-contacts";
import { PermissionsAndroid } from "react-native";

const ContactScreenTabFindContact = ({
  token,
  userId,
  navigation,
  countriesLists,
  selectedCountry,
  filterSearchListAction,
  selectedCountryAction,
  resetCountryAction,
  pullPhoneContactList,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [countryDetails, setCountryDetails] = useState({});
  const [labels, setLabels] = useState("Mobile");
  useEffect(() => {
    setCountryDetails(selectedCountry);
    try {
      if (Platform.OS == "android") {
        const requestPermissions = async () => {
          let androidContactPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
            {
              title: "Contacts",
              message: "This app would like to write to your contacts.",
              buttonPositive: "Please accept bare mortal",
            }
          );

          console.log("permission is", androidContactPermission);
        };

        requestPermissions();
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleAddContactSubmit = async () => {
    const countryCode = countryDetails.phonecode;

    var addToPhone = {
      emailAddresses: [
        {
          label: "work",
          email: email,
        },
      ],
      displayName: `${firstName} ${lastName}`,
      // familyName: lastName,
      // givenName: firstName,
      phoneNumbers: [
        {
          label: "mobile",
          number: `+${countryCode}${phoneNumber}`,
        },
      ],
    };
    // let newContact = await Contacts.addContact(addToPhone);

    Contacts.openContactForm(addToPhone).then((contact) => {
      // Contacts.getAll().then((contact) => {
      //   pullPhoneContactList(contact, userId);
      //   navigation.navigate("ContactScreen");
      // });
      Contacts.checkPermission().then((permission) => {
        if (permission === "undefined") {
          alert("undefined");
          // Contacts.requestPermission().then((permission) => {

          // });
        }
        if (permission === "authorized") {
          Contacts.getAll().then((contact) => {
            pullPhoneContactList(contact, userId);
            navigation.navigate("ContactScreen");
          });
        }
        if (permission === "denied") {
          alert("denied");
        }
      });
    });

    // if (newContact) {
    //   // Contacts.getAll().then((contactList) => {
    //   //   navigation.navigate("ContactScreen");
    //   // });
    //   navigation.navigate("ContactScreen");
    //   // });
    // }
    // try {
    //   console.log("before calling api!!!!");
    //   const res = await ApiServer.post("/api/contacts/find", {
    //     phoneNumber,
    //     userId,
    //     countryCode,
    //   });

    //   console.log("after calling api!!!!");

    //   console.log("res data is", res);

    //   if (res.data.success) {
    //     navigation.navigate("Add Contact", {
    //       userProfile: res.data.userProfile,
    //     });
    //   }
    // } catch (error) {
    //   if (error.response.status === 404) {
    //     console.log("user not found");
    //     alert("user not found");
    //   } else {
    //     alert("Server error, please try again");
    //   }

    //   console.log(error.response.status);
    // }
  };

  const handleFirstNameChange = (firstName) => {
    setFirstName(firstName);
  };
  const handleLastNameChange = (lastName) => {
    setLastName(lastName);
  };
  const handlePhonechange = (phoneNumber) => {
    setPhoneNumber(phoneNumber);
  };
  const handleEmailChange = (email) => {
    setEmail(email);
  };

  const handleModalVisible = () => {
    setModalVisible(!modalVisible);
    resetCountryAction();
  };

  const handleCountrySelection = (item) => {
    handleModalVisible();

    resetCountryAction();

    setCountryDetails(item);
  };

  const handleSearch = (event) => {
    const searchText = event.nativeEvent.text;
    filterSearchListAction(searchText);
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeAreaWrapper}>
        <View style={styles.textboxes}>
          <TextInput
            style={styles.textInput}
            placeholder="First Name"
            returnKeyType="done"
            value={firstName}
            onChangeText={handleFirstNameChange}
          ></TextInput>
          <TextInput
            style={styles.textInput}
            placeholder="Last Name"
            returnKeyType="done"
            value={lastName}
            onChangeText={handleLastNameChange}
          ></TextInput>
          <View style={styles.inputWrapper}>
            <TouchableOpacity
              onPress={handleModalVisible}
              style={styles.countryCountryWrapper}
            >
              <Text style={styles.countryCode}>{countryDetails.phonecode}</Text>
              <Text style={styles.countryDetail}> {countryDetails.name} </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="Phone (Required)"
            returnKeyType="done"
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={handlePhonechange}
          ></TextInput>

          <TextInput
            style={styles.textInput}
            placeholder="Email"
            returnKeyType="done"
            value={email}
            onChangeText={handleEmailChange}
          ></TextInput>

          {phoneNumber == "" && (
            <>
              <TouchableOpacity style={styles.disabledButton} disabled={true}>
                <Text style={styles.submitText}>Save</Text>
              </TouchableOpacity>
            </>
          )}
          {phoneNumber != "" && (
            <>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {
                  handleAddContactSubmit();
                }}
              >
                <Text style={styles.submitText}>Save</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </SafeAreaView>
      <CountryListModel
        modalVisible={modalVisible}
        handleModalVisible={handleModalVisible}
        listData={countriesLists}
        handleSearch={handleSearch}
        handleCountrySelection={handleCountrySelection}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  token: state.authReducer.token,
  userId: state.authReducer.userId,
  countriesLists: state.countriesCodes.countriesLists,
  selectedCountry: state.countriesCodes.selectedCountry,
});

const mapDispatchToProps = {
  filterSearchListAction: filterSearchListAction,
  selectedCountryAction: selectCountry,
  resetCountryAction: resetCountryAction,
  pullPhoneContactList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactScreenTabFindContact);

const styles = StyleSheet.create({
  safeAreaWrapper: {
    flex: 3,
    backgroundColor: "#ffffff",
  },
  textboxes: {
    flex: 1,
    margin: 50,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 5,
    margin: 10,
    padding: 15,
  },
  buttoneSave: {
    backgroundColor: "#D9D9D9",
  },
  label: {
    backgroundColor: "#D9D9D9",
    fontSize: 16,
    paddingVertical: 20,
    paddingLeft: 20,
  },
  addPhoneWrapper: {
    flexDirection: "row",
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 2,
  },
  contactNumberInputField: {
    padding: 10,
    paddingLeft: 20,
    flex: 1,
    marginRight: 3,
  },
  inputWrapper: {},
  countryCountryWrapper: {
    flexDirection: "row",
    padding: 10,
    paddingLeft: 20,
  },
  countryCode: {
    marginRight: 25,
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
  disabledButton: {
    backgroundColor: "#e8e8e8",
    paddingVertical: 15,
    borderRadius: 2,
    marginTop: 50,
    width: "50%",
    alignSelf: "center",
    borderRadius: 50,
  },
});
