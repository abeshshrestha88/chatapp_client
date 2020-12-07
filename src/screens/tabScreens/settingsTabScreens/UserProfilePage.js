import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Swiper,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import ApiServer from "../../../api/ApiServer";
import { connect } from "react-redux";
import { FontAwesome5, Zocial, Foundation, Entypo } from "@expo/vector-icons";
import { getNameInititals } from "../../../helpers/functions";
import DialogInput from "react-native-dialog-input";
// const [visible, setVisible] = useState(false);
import {
  updateUserProfileAction,
  setImageAction,
  setUserProfileAction,
} from "../../../redux/actions/userProfileAction";
import * as ImagePicker from "expo-image-picker";

const UserProfilePage = ({
  name,
  image,
  email,
  dob,
  phoneNumber,
  phoneCode,
  setImageAction,
  setUserProfileAction,
  updateUserProfileAction,
}) => {
  const [nameVisible, setNameVisible] = useState(false);
  const [emailVisible, setEmailVisible] = useState(false);
  console.log("Help");

  const handleProfileNameEdit = (
    name,
    email,
    dob,
    phoneCode,
    phoneNumber,
    image,
    nameVisible,
    setNameVisible
  ) => {
    return (
      <DialogInput
        isDialogVisible={nameVisible}
        title={"Edit your Profile"}
        message={"Name: "}
        initValueTextInput={name}
        submitInput={(inputText) => {
          // this.sendInput(inputText);

          updateUserProfileAction({
            name: inputText,
            email: email,
            dob: new Date(dob),
            countryCode: phoneCode,
            phoneNumber: phoneNumber,
            image_url: image,
          });
          setNameVisible(false);
        }}
        closeDialog={() => {
          setNameVisible(false);
        }}
      ></DialogInput>
    );
  };

  const handleProfileEmailEdit = (
    name,
    email,
    dob,
    phoneCode,
    phoneNumber,
    image,
    nameVisible,
    setNameVisible
  ) => {
    return (
      <DialogInput
        isDialogVisible={emailVisible}
        title={"Edit your Profile"}
        message={"Email: "}
        initValueTextInput={email}
        submitInput={(inputText) => {
          // this.sendInput(inputText);

          updateUserProfileAction({
            name: name,
            email: inputText,
            dob: new Date(dob),
            countryCode: phoneCode,
            phoneNumber: phoneNumber,
            image_url: image,
          });
          setEmailVisible(false);
        }}
        closeDialog={() => {
          setEmailVisible(false);
        }}
      ></DialogInput>
    );
  };

  const handleChangeProfilePicture = async () => {
    if (Platform.OS === "android") {
      let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }

      let pickerResult = await ImagePicker.launchImageLibraryAsync();

      if (pickerResult.cancelled === true) {
        return;
      }

      if (!pickerResult.cancelled) {
        console.log("picker result", pickerResult.uri);
        setImageAction(pickerResult.uri);
        setUserProfileAction(
          {
            name,
            email,
            dob: new Date(dob),
            phoneCode,
            phoneNumber,
          },
          { image_url: pickerResult.uri }
        );
      }
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        console.log("image after picking is", result.uri);
        setImageAction(result.uri);
        setUserProfileAction(
          {
            name,
            email,
            dob: dob,
            phoneCode,
            phoneNumber,
          },
          { image_url: pickerResult.uri }
        );
      }
    }
  };

  const imageJSX = (image, name) => {
    if (image == "") {
      return (
        <View style={styles.profileImage}>
          <Text style={styles.profile_text}>{getNameInititals(name)}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.profile_image}>
          <Image style={styles.profile_image} source={{ uri: image }} />
          <TouchableOpacity onPress={handleChangeProfilePicture}>
            <Entypo name="edit" size={24} color="black" />
          </TouchableOpacity>
        </View>
      );
    }
  };
  return (
    <View style={{ flex: 1 }}>
      {imageJSX(image, name)}

      <SafeAreaView style={styles.safeAreaWrapper}>
        <View style={styles.UserInfoWrapper}>
          <View style={styles.screenWrapper}>
            <View style={styles.vectors}>
              <FontAwesome5 name="user-alt" size={24} color="#33F0C2" />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.info}> {name}</Text>
              {handleProfileNameEdit(
                name,
                email,
                dob,
                phoneCode,
                phoneNumber,
                image,
                nameVisible,
                setNameVisible
              )}
              <TouchableOpacity
                onPress={() => {
                  {
                    setNameVisible(true);
                  }
                }}
              >
                <Entypo name="edit" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.infoText}>
                This is not your username. This name will be visible to your
                Chatpay contacts.
              </Text>
            </View>
          </View>
          <View style={styles.screenWrapper}>
            <View style={styles.vectors}>
              <Zocial name="email" size={24} color="#33F0C2" />
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.info}> {email}</Text>

              {handleProfileEmailEdit(
                name,
                email,
                dob,
                phoneCode,
                phoneNumber,
                image,
                nameVisible,
                setNameVisible
              )}

              <TouchableOpacity
                onPress={() => {
                  {
                    setEmailVisible(true);
                  }
                }}
              >
                <Entypo name="edit" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.screenWrapper}>
            <View style={styles.vectors}>
              <Foundation name="telephone" size={24} color="#33F0C2" />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.label}>Phone number</Text>
              <Text style={styles.info}>
                {" "}
                {`+ ${phoneCode} ${phoneNumber}`}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  userId: state.authReducer.userId,
  name: state.userProfileReducer.name,
  image: state.userProfileReducer.image,
  email: state.userProfileReducer.email,
  dob: state.userProfileReducer.dob,
  phoneNumber: state.countriesCodes.phoneNumber,
  phoneCode: state.countriesCodes.selectedCountry.phonecode,
});
export default connect(mapStateToProps, {
  updateUserProfileAction,
  setImageAction,
  setUserProfileAction,
})(UserProfilePage);

const styles = StyleSheet.create({
  safeAreaWrapper: {
    flex: 3,
    backgroundColor: "#ffffff",
  },
  profileImage: {
    flex: 3,
    backgroundColor: "powderblue",
    alignItems: "center",
    justifyContent: "center",
  },
  profile_text: {
    fontSize: 170,
    fontWeight: "normal",
  },
  profile_image: {
    flex: 3,
    backgroundColor: "powderblue",
  },

  UserInfoWrapper: {
    padding: 20,
    // backgroundColor: "red",
    flexDirection: "column",
    flex: 1,
  },
  screenWrapper: {
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 20,
    paddingRight: 20,
    backgroundColor: "#ffffff",
  },

  label: {
    color: "#696969",
    marginBottom: 5,
  },
  userInfo: {
    marginLeft: 25,
  },
  vectors: {
    marginTop: 10,
  },
  info: {
    marginBottom: 5,
  },
  infoText: {
    color: "#C0C0C0",
  },
});
