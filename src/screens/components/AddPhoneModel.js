import React from "react";
import { StyleSheet, Text, View, Modal, TextInput } from "react-native";
import ButtonDone from "./Button";

const AddPhoneModel = ({ modalVisible, handleAddContactSubmit }) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.modelScreenWrapper}>
        <View>
          <Text style={styles.label}>Enter a Phone Number</Text>
          <View style={styles.addPhoneWrapper}>
            <TextInput
              style={styles.contactNumberInputField}
              placeholder="Contact's number"
            ></TextInput>
            <ButtonDone
              buttonText="Done"
              handleSubmit={handleAddContactSubmit}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddPhoneModel;

const styles = StyleSheet.create({
  modelScreenWrapper: {
    flex: 1,
  },
  label: {
    backgroundColor: "#F2F2F2",
    paddingVertical: 20,
    paddingLeft: 20,
  },
  addPhoneWrapper: {
    flexDirection: "row",
  },
  contactNumberInputField: {
    padding: 10,
    paddingLeft: 20,
    flex: 1,
    marginRight: 3,
  },
});
