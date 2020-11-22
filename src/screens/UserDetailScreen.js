import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

const UserDetailScreen = () => {
  return (
    <View style={styles.ScreenWrapper}>
      <View style={styles.inputWrapper}>
        <Text>Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Input your name"
        ></TextInput>
      </View>

      <View style={styles.inputWrapper}>
        <Text>Email</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Input your email"
        ></TextInput>
      </View>

      <TouchableOpacity style={styles.submitButton}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserDetailScreen;

const styles = StyleSheet.create({
  ScreenWrapper: {
    margin: 15,
  },
  textInput: {
    borderWidth: 1,
    padding: 5,
  },
  inputWrapper: {
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "green",
    padding: 20,
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
  },
});
