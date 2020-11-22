import React from "react";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.screenWrapper}>
      <Image
        style={styles.splashImage}
        source={require("../../assets/paychat.jpg")}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  screenWrapper: {
    backgroundColor: "#ffffff",
    paddingTop: "25%",
    paddingHorizontal: "3%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  splashImage: {
    width: "45%",
    position: "relative",
    top: -100,
  },
});
