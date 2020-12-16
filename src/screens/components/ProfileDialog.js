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
  Share,
} from "react-native";
// import ApiServer from "../../../api/ApiServer";
import { connect } from "react-redux";
import { FontAwesome5, Zocial, Foundation, Entypo } from "@expo/vector-icons";
import { getNameInititals } from "../../helpers/functions";
import { getConversationIdAction } from "../../redux/actions/conversationAction";
import {
  getMessagesAction,
  clearMessagesAction,
} from "../../redux/actions/messageAction";
// import DialogInput from "react-native-dialog-input";
// const [visible, setVisible] = useState(false);
// import {
//   updateUserProfileAction,
//   setImageAction,
//   setUserProfileAction,
// } from "../../../redux/actions/userProfileAction";
import * as ImagePicker from "expo-image-picker";

const ProfileDialog = ({
  route,
  navigation,
  currentUserId,
  getMessagesAction,
  clearMessagesAction,
}) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Hello, Please download this awesome app",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleMessageBtn = async (params) => {
    const conversation_id = await getConversationIdAction(
      currentUserId,
      params.contactId
    );

    console.log("conv id is", conversation_id);
    clearMessagesAction();
    getMessagesAction(currentUserId, params.contactId);
    console.log("paramsL", params);
    navigation.navigate("MessageScreen", {
      currentUserId,
      contact: params,
      conversationId: conversation_id,
      name: params.name.split(" ")[0],
      image: params.img,
    });
  };
  const handleCallBtn = (name) => {
    alert("Need to implement call");
  };
  const handleUserExists = (params) => {
    if (params.exists) {
      return (
        <View>
          <View>
            <TouchableOpacity
              onPress={() => {
                handleCallBtn(params.name);
              }}
            >
              <Text>Free Call</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleMessageBtn(params);
              }}
            >
              <Text>Free Message</Text>
            </TouchableOpacity>
          </View>
          <Text>{params.name}</Text>
          <Text>{params.phone}</Text>
        </View>
      );
    } else {
      return (
        <View>
          <View>
            <TouchableOpacity onPress={onShare}>
              <Text>Invite</Text>
            </TouchableOpacity>
          </View>
          <Text>{params.name}</Text>
          <Text>{params.phone}</Text>
        </View>
      );
    }
  };

  const imageJSX = (image, name) => {
    if (image == "") {
      return (
        <View style={styles.profileImage}>
          <Text style={styles.profile_text}>
            {getNameInititals(route.params.name)}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.profile_image}>
          <Image source={{ uri: route.params.img }} />
        </View>
      );
    }
  };
  return (
    <View style={{ flex: 1 }}>
      {imageJSX(route.params.img, route.params.name)}
      <SafeAreaView style={styles.safeAreaWrapper}>
        {handleUserExists(route.params)}
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  currentUserId: state.authReducer.userId,
});
const mapDispatchToProps = {
  getMessagesAction: getMessagesAction,
  clearMessagesAction: clearMessagesAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileDialog);

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
