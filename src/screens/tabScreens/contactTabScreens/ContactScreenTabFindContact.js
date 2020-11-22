import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import ButtonDone from "../../components/Button";
import { connect } from "react-redux";
import CountryListModel from "../../registration/components/CountryListModel";

import ApiServer from "../../../api/ApiServer";
import { set } from "lodash";
import {
  filterSearchListAction,
  selectCountry,
  resetCountryAction,
} from "../../../redux/actions/countryListAction";

const ContactScreenTabFindContact = ({
  token,
  userId,
  navigation,
  countriesLists,
  selectedCountry,
  filterSearchListAction,
  selectedCountryAction,
  resetCountryAction,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [countryDetails, setCountryDetails] = useState({});

  useEffect(() => {
    setCountryDetails(selectedCountry);
  }, []);

  const handleAddContactSubmit = async () => {
    const countryCode = countryDetails.phonecode;

    try {
      const res = await ApiServer.post("/api/contacts/find", {
        phoneNumber,
        userId,
        countryCode,
      });

      if (res.data.success) {
        navigation.navigate("Add Contact", {
          userProfile: res.data.userProfile,
        });
      }
    } catch (error) {}
  };

  const handlePhonechange = (phoneNumber) => {
    setPhoneNumber(phoneNumber);
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
    <View style={styles.modelScreenWrapper}>
      <View>
        <Text style={styles.label}>Select Country</Text>

        <View style={styles.inputWrapper}>
          <TouchableOpacity
            onPress={handleModalVisible}
            style={styles.countryCountryWrapper}
          >
            <Text style={styles.countryCode}>{countryDetails.phonecode}</Text>
            <Text style={styles.countryDetail}> {countryDetails.name} </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text style={styles.label}>Enter a Phone Number</Text>

        <View style={styles.addPhoneWrapper}>
          <TextInput
            style={styles.contactNumberInputField}
            placeholder="Contact's number"
            value={phoneNumber}
            onChangeText={handlePhonechange}
          ></TextInput>
          <ButtonDone buttonText="Done" handleSubmit={handleAddContactSubmit} />
        </View>
      </View>

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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactScreenTabFindContact);

const styles = StyleSheet.create({
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
});
