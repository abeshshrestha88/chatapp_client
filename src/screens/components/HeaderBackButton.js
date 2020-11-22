import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CommonActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const HeaderBackButton = ({ navigation }) => {
  return (
    <View style={styles.backIconWrapper}>
      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: "Chat",
                },
              ],
            })
          );
        }}
      >
        <Ionicons name="md-arrow-back" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderBackButton;

const styles = StyleSheet.create({
  backIconWrapper: {
    marginLeft: 15,
  },
});
