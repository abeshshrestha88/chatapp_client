import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const Search = ({ handleSearch, placeholderTitle }) => {
  return (
    <View style={styles.searchWrapper}>
      <FontAwesome5 style={styles.searchIcon} name="search" size={24} />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholderTitle}
        onChangeText={handleSearch}
      ></TextInput>
    </View>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

const styles = StyleSheet.create({
  searchWrapper: {
    flexDirection: "row",
  },
  searchInput: {
    flex: 1,
    padding: 10,
    paddingLeft: 46,
    fontSize: 16,
  },
  searchIcon: {
    position: "absolute",
    alignSelf: "center",
    paddingLeft: 10,
    color: "#D9D9D9",
  },
});
