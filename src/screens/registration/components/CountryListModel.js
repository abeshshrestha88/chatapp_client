import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  SafeAreaView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const countryListModel = ({
  modalVisible,
  handleModalVisible,
  listData,
  handleSearch,
  handleCountrySelection,
}) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <SafeAreaView style={styles.wrapper}>
          <View style={styles.countryListModelWrapper}>
            <View style={styles.searchWrapper}>
              <TouchableOpacity onPress={handleModalVisible}>
                <AntDesign
                  style={styles.closeButton}
                  name="arrowleft"
                  size={30}
                  color="black"
                />
              </TouchableOpacity>
              <TextInput
                style={styles.search}
                placeholder="Search"
                onChange={handleSearch}
              ></TextInput>
            </View>

            <View>
              <FlatList
                data={listData}
                keyExtractor={(item) => item.iso}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      handleCountrySelection(item);
                    }}
                  >
                    <Text style={styles.modelText}>
                      {item.name} (+{item.phonecode})
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default countryListModel;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  countryListModelWrapper: {
    flex: 1,
  },
  searchWrapper: {
    flexDirection: "row",
    // borderWidth: 2,
    alignItems: "center",
    // minHeight: 45,
    backgroundColor: "#F9F9F9",
  },
  search: {
    flex: 1,
    padding: 11,
    fontSize: 18,
    // borderWidth: 1,
    borderColor: "#EAE9EA",
    borderBottomWidth: 1,
  },
  closeButton: {
    justifyContent: "center",
    padding: 10,
    // borderWidth: 1,
    borderColor: "#EAE9EA",
    marginLeft: 5,
    borderBottomWidth: 1,
    color: "#33F0C2",
  },
  modelText: {
    fontSize: 17,
    padding: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#EAE9EA",
    color: "#8e8e8e",
  },
});
