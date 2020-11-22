import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { getUserAgeFromDOB } from "../../helpers/functions";

const WelcomeScreen = ({
  navigation,
  isAuthenticated,
  name,
  userProfileSet,
}) => {
  console.log("welcome screen called....");

  useEffect(() => {
    console.log("stack use effect called...");
    console.log(`Is authenticated? ${isAuthenticated}`);
    if (isAuthenticated) {
      console.log("user profile is set?");
      console.log(userProfileSet);

      // if (userProfileSet && name !== "") {
      //   navigation.navigate("ChatScreen");
      // } else {
      //   navigation.navigate("UserProfileScreen");
      // }

      // if (dob !== "") {
      //   console.log("dob is: ");
      //   console.log(dob);
      //   const age = getUserAgeFromDOB(dob);

      //   console.log("age is: ");
      //   console.log(age);

      //   if (age > 17) {
      //     console.log("dob not empty");
      //     navigation.navigate("ChatScreen");
      //   } else {
      //     navigation.navigate("UserProfileScreen");
      //   }
      // } else {
      //   console.log("dob is empty");
      //   navigation.navigate("UserProfileScreen");
      // }
    }
  }, [isAuthenticated, name, userProfileSet]);

  const handleSignUp = () => {
    navigation.navigate("SignUpScreen");
  };

  return (
    <SafeAreaView style={styles.flexContainer}>
      <View style={styles.screenWrapper}>
        <View style={styles.logoWrapper}>
          <Image
            style={styles.logo}
            source={require("../../../assets/paychat.jpg")}
          />
        </View>
        <View style={styles.WelcomeMsgWrapper}>
          <Text style={styles.welcomeMsg}>Welcome to PayChat!</Text>
          <Text style={styles.welcomeText}>
            Secured Chat, Payments and more!
          </Text>
        </View>

        <View style={styles.subscriptionButtonWrapper}>
          <TouchableOpacity
            style={[styles.button, styles.buttonSignUp]}
            onPress={handleSignUp}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.WelcomeMsgWrapper}>
          <Text style={styles.welcomeText}>
            By tapping &quot;Continue&quot; you agree to our Terms & Policies
          </Text>
        </View>
        <View style={styles.copyRight}>
          <Text>@2020-2021 PayChat Media | Privacy Policy</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    name: state.userProfileReducer.name,
    userProfileSet: state.userProfileReducer.userProfileSet,
  };
};

export default connect(mapStateToProps, {})(WelcomeScreen);

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  screenWrapper: {
    backgroundColor: "#ffffff",
    paddingTop: "25%",
    paddingHorizontal: "3%",
    flex: 1,
  },
  logoWrapper: {
    marginBottom: "20%",
  },
  logo: {
    width: 90,
    height: 90,
    alignSelf: "center",
  },
  WelcomeMsgWrapper: {
    alignItems: "center",
    marginBottom: "10%",
  },
  welcomeMsg: {
    fontSize: 30,
    marginBottom: 10,
  },
  welcomeText: {
    color: "#808080",
    textAlign: "center",
  },
  subscriptionButtonWrapper: {
    alignItems: "center",
  },
  button: {
    width: "70%",
    borderRadius: 50,
    paddingVertical: 18,
    marginBottom: 20,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
  },
  buttonLogin: {
    backgroundColor: "#33F0C2",
  },
  buttonSignUp: {
    backgroundColor: "#33F0C2",
  },
  copyRight: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 10,
  },
});
