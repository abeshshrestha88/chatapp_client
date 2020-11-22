import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ImageBackground,
} from "react-native";

const PhoneConfirmationModel = ({
  phoneNumber,
  modalVisible,
  handleEditConfirmation,
  handleAcceptConfirmation,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.modelScreenWrapper}>
        <View style={styles.phoneConfirmationModelWrapper}>
          <Text style={styles.text}>Is this your phone number?</Text>
          <Text style={styles.phoneNuber}>{phoneNumber}</Text>
          <Text
            style={[styles.text, styles.sms_instruction]}
          >{`A code will be sent by SMS shortly, and will activate your account.`}</Text>

          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={handleEditConfirmation}>
              <Text style={styles.btnText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAcceptConfirmation}>
              <Text style={styles.btnText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PhoneConfirmationModel;

const styles = StyleSheet.create({
  modelScreenWrapper: {
    backgroundColor: "rgba(0, 0, 0, .9)",
    flex: 1,
    justifyContent: "center",
  },
  phoneConfirmationModelWrapper: {
    borderWidth: 2,
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    padding: 20,
    paddingVertical: 35,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
    color: "#8e8e8e",
  },
  sms_instruction: {
    color: "#8e8e8e",
    marginBottom: 50,
  },
  phoneNuber: {
    color: "#8e8e8e",
    fontSize: 20,
    marginBottom: 15,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  btnText: {
    color: "#33F0C2",
    fontSize: 18,
    padding: 10,
  },
});
