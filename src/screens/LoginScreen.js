import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/chat.png")}
          style={styles.chatImage}
        />
        <Text style={styles.logoText}>Brand Name</Text>
      </View>

      <View style={styles.inputWrapper}>
        <TextInput placeholder="Enter your username" style={styles.textInput} />
        <TextInput
          placeholder="Enter your Password"
          secureTextEntry={true}
          style={styles.textInput}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.button}>
          <Text style={{ fontSize: 18, color: "#ffffff" }}>LogIn</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={{ fontSize: 18, color: "#ffffff" }}>SignUp</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    justifyContent: "center",
  },
  logoContainer: {
    marginBottom: 45,
  },
  chatImage: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  logoText: {
    fontWeight: "bold",
    fontSize: 25,
    alignSelf: "center",
  },
  inputWrapper: {
    width: "80%",
    marginBottom: 45,
    alignSelf: "center",
  },
  textInput: {
    padding: 20,
    paddingHorizontal: 30,
    borderRadius: 50,
    borderColor: "#dadce0",
    borderWidth: 1,
    color: "#202125",
    fontSize: 18,
    marginBottom: 15,
  },
  buttonWrapper: {
    width: "80%",
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  forgotPassword: {
    alignSelf: "center",
  },
});
