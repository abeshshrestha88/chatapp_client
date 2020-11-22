import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ImageBackground,
} from "react-native";

const AlertModel = ({
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
          >{`You'll receive an SMS shortly.`}</Text>

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

export default AlertModel;

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
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
  },
  sms_instruction: {
    marginBottom: 50,
  },
  phoneNuber: {
    fontSize: 20,
    marginBottom: 15,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  btnText: {
    fontSize: 18,
    padding: 10,
  },
});
