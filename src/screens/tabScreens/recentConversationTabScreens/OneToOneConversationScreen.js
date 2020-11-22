import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Item,
  FlatList,
  Image,
} from "react-native";

import { connect } from "react-redux";
import Search from "../../components/Search";
import { getConversationAction } from "../../../redux/actions/conversationAction";
import {
  getMessagesAction,
  clearMessagesAction,
} from "../../../redux/actions/messageAction";

const OneToOneConversationScreen = ({
  getConversationAction,
  userId,
  conversationList,
  navigation,
  route,
  country_code,
  phoneNumber,
  dob,
  email,
  getMessagesAction,
  clearMessagesAction,

  messages,
}) => {
  const [keyTyped, setKeyTyped] = useState("");
  const [localConversationList, setLocalConversationList] = useState([]);

  useEffect(() => {
    console.log("new msg send- captured in use effect");
    getConversationAction(userId);
  }, [messages]);

  useEffect(() => {
    // console.log("reset push notification use effect");
    // resetPushNotificationConversationAction();

    setLocalConversationList(conversationList);
  }, [conversationList]);

  const getSearchArray = (searchKeyword, conversationList) => {
    if (searchKeyword.length > 0) {
      console.log("search keyword is:");
      console.log(searchKeyword);

      console.log("conversation list is:");
      console.log(conversationList);

      const matchingConversation = conversationList.filter((conversation) => {
        return conversation.name
          .toLowerCase()
          .startsWith(searchKeyword.toLowerCase());
      });

      console.log("matching conversation is: ");
      console.log(matchingConversation);

      if (matchingConversation.length > 0) {
        return matchingConversation;
      } else {
        return [];
      }
    } else {
      return conversationList;
    }
  };

  const handleSearch = (text) => {
    setKeyTyped(text);
    const conversationListAfterFilter = getSearchArray(text, conversationList);

    setLocalConversationList(conversationListAfterFilter);

    console.log("search recent conversation btn clicked...");
  };

  const handleConversationSelection = (item) => {
    console.log("item in handle conversation is....", item);
    console.log(
      "token after clicking conversation is:",
      item.notification_token
    );

    const contactObject = {};

    contactObject.contactId = item.contact_id;
    contactObject.country_code = item.country_code;
    contactObject.dob = item.dob;
    contactObject.email = item.email;
    contactObject.name = item.name;
    contactObject.phone_number = item.phone_number;
    contactObject.profile_img_url = item.profile_img_url;

    clearMessagesAction();
    getMessagesAction(userId, item.contact_id);
    navigation.navigate("MessageScreen", {
      currentUserId: userId,
      contact: contactObject,
      conversationId: item.conversation_id,
      name: item.name.split(" ")[0],
      image: item.profile_img_url,
      notification_token: item.notification_token,
    });
  };

  const getDateTime = (msg_datetime) => {
    days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    current_date = new Date();
    currentTime = current_date.getTime();
    get_current_year = current_date.getFullYear();
    get_current_month = current_date.getMonth() + 1;

    const oneday = 60 * 60 * 24 * 1000;
    const oneweek = 60 * 60 * 24 * 7 * 1000;
    const oneYear = 60 * 60 * 24 * 365 * 1000;
    date = new Date(msg_datetime);
    msg_time = date.getTime();
    msg_year = date.getFullYear();
    msg_month = date.getMonth() + 1;
    msg_date = date.getDate();
    msg_day = date.getDay();
    msg_hours = date.getHours();
    msg_minutes = date.getMinutes();

    msg_time_diff = currentTime - msg_time;
    day = days[msg_day];

    ampm = msg_hours >= 12 ? "pm" : "am";
    msg_hours = msg_hours % 12;
    msg_hours = msg_hours ? msg_hours : 12;
    msg_minutes = msg_minutes < 10 ? "0" + msg_minutes : msg_minutes;
    strTime = msg_hours + ":" + msg_minutes + " " + ampm;

    if (msg_time_diff <= oneday) {
      return strTime;
    } else {
      if (msg_time_diff <= oneweek) {
        return day;
      } else {
        if (msg_time_diff >= oneYear) {
          return [msg_month, msg_day, msg_year].join("/");
        } else {
          return [msg_month, msg_day].join("/");
        }
      }
    }

    // year comparision
    // if (get_current_year > msg_year) {
    //   return [msg_month, msg_day, msg_year].join("/");
    // } else {
    //   //month comparision
    //   if (get_current_month != msg_month) {
    //     return [msg_month, msg_day].join("/");
    //   } else {
    //     //weekly comparision
    //     return strTime;
    //   }
    // }
  };
  const renderMsg = (msg, contactId) => {
    if (msg.length > 40) {
      msg = msg.substring(0, 40) + "...";
    }
    return msg;
  };

  const flastListJSX = () => {
    if (conversationList.length > 0) {
      if (localConversationList.length > 0) {
        return (
          <FlatList
            data={localConversationList}
            // data={conversationList}
            keyExtractor={(item) => item.contact_id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  handleConversationSelection(item);
                }}
              >
                <View style={styles.contactRow}>
                  <View style={styles.image}>
                    <Image
                      style={styles.profileLogo}
                      source={{ uri: item.profile_img_url }}
                    />
                  </View>
                  <View style={styles.label}>
                    <Text style={styles.msg_name}>{item.name}</Text>
                    {/* <Text>{getDateTime(item.createdat)}</Text> */}
                    <Text style={styles.msg_text}>
                      {`${renderMsg(item.msg, item.contact_id)} - ${getDateTime(
                        item.createdat
                      )}`}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        );
      } else {
        return (
          <Text style={styles.noContacts}>
            No conversation found for {keyTyped}
          </Text>
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <View style={styles.screenWrapper}>
        <View style={styles.searchWrapper}>
          <Search handleSearch={handleSearch} placeholderTitle="Search" />
        </View>
        <View>{flastListJSX()}</View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.authReducer.userId,
    conversationList: state.conversationReducer.conversationList,
    country_code: state.countriesCodes.selectedCountry.phonecode,
    phoneNumber: state.countriesCodes.phoneNumber,
    dob: state.userProfileReducer.dob,
    email: state.userProfileReducer.email,
    messages: state.messagesReducer.messages,
  };
};

const mapDispatchToProps = {
  getConversationAction,
  getMessagesAction,
  clearMessagesAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OneToOneConversationScreen);

const styles = StyleSheet.create({
  safeAreaWrapper: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  screenWrapper: {
    margin: 20,
    flex: 1,
    backgroundColor: "#ffffff",
  },

  searchWrapper: {
    marginBottom: 25,
    backgroundColor: "#e3e3e3",
    borderRadius: 20,
  },

  contactRow: {
    flexDirection: "row",
    marginBottom: 20,
    paddingVertical: 5,
  },
  image: {
    marginRight: 15,
  },

  profileLogo: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  msg_text: { marginTop: 3 },
  msg_name: { paddingTop: 5 },
  noContacts: {
    alignItems: "center",
    textAlign: "center",
  },
});
