import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Button = ({ handleSubmit, buttonText }) => {
  return (
    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
      <Text style={styles.submitText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: "#33F0C2",
    paddingVertical: 15,
    borderRadius: 2,
    paddingHorizontal: 20,
  },
  submitText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
