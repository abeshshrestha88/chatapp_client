import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Item,
  Image,
  SectionList,
  SafeAreaView,
} from "react-native";
import Search from "../../components/Search";
import { getNameInititals } from "../../../helpers/functions";

//TODO: GET CONTACTS FROM PHONE
// import * as ContactsFromPhone from "expo-contacts";
import { connect } from "react-redux";
import {
  getContactsForUser,
  filterContactList,
} from "../../../redux/actions/contactsAction";
import {
  getMessagesAction,
  clearMessagesAction,
} from "../../../redux/actions/messageAction";

import _ from "lodash";
import { CommonActions } from "@react-navigation/native";
import { getConversationIdAction } from "../../../redux/actions/conversationAction";
import { FontAwesome5 } from "@expo/vector-icons";
const ContactScreenTab = ({
  route,
  navigation,
  currentUserId,
  getContactsForUser,
  contactList,
  filterContactList,
  getMessagesAction,
  clearMessagesAction,
}) => {
  const [addScreenModelVisible, setAddScreenModelVisible] = useState(false);

  const [localContactList, setLocalContactList] = useState([]);
  const [keyTyped, setKeyTyped] = useState("");

  useEffect(() => {
    console.log("contact list is:", contactList);
    console.log(
      <pre>
        <code>{JSON.stringify(contactList, null, 4)}</code>
      </pre>
    );

    setLocalContactList(contactList);

    // const unsubscribe = navigation.addListener("focus", () => {
    //   getContactsForUser(currentUserId);
    // });

    // return unsubscribe;
  }, [navigation, contactList]);

  const getContactArrayWithFirstLetter = (firstLetter, contactList) => {
    return contactList.filter((contact) => {
      return contact.title.startsWith(firstLetter);
    });
  };

  const getSearchArray = (searchKeyword, contactList) => {
    if (searchKeyword.length > 0) {
      const firstSearchLetter = searchKeyword.slice(0, 1).toUpperCase();
      const sectionArrayAfterFilter = getContactArrayWithFirstLetter(
        firstSearchLetter,
        contactList
      );

      if (sectionArrayAfterFilter.length > 0) {
        const matchingContact = sectionArrayAfterFilter[0].data.filter(
          (contact) => {
            return contact.name
              .toLowerCase()
              .startsWith(searchKeyword.toLowerCase());
          }
        );

        return [
          {
            data: matchingContact,
            title: sectionArrayAfterFilter[0].title,
          },
        ];
      } else {
        return [];
      }
    } else {
      return contactList;
    }
  };

  const handleAddContact = () => {
    setAddScreenModelVisible(!addScreenModelVisible);
  };

  const handleAddContactSubmit = (text) => {};

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleSearch = (text) => {
    setKeyTyped(text);
    const contactListAfterFilter = getSearchArray(text, contactList);

    setLocalContactList(contactListAfterFilter);
  };

  const imageJSX = (image, userName) => {
    if (image === undefined) {
      return <Text style={styles.initials}>{getNameInititals(userName)}</Text>;
    } else {
      return <Image style={styles.profileLogo} source={{ uri: image }} />;
    }
  };

  const handleContactPress = async (contact) => {
    const conversation_id = await getConversationIdAction(
      currentUserId,
      contact.contactId
    );

    clearMessagesAction();
    getMessagesAction(currentUserId, contact.contactId);

    navigation.navigate(
      "MessageScreen",

      {
        currentUserId,
        contact,
        conversationId: conversation_id,
        name: contact.name.split(" ")[0],
        image: contact.profile_img_url,
        notification_token: contact.notification_token,
      }
    );
  };

  const addContactButton = () => {
    navigation.navigate("Find Contact");
  };

  const Item = ({ contact }) => {
    console.log("contact in item is", contact);

    return (
      <TouchableOpacity
        onPress={() => {
          // handleContactPress(contact);
        }}
      >
        <View style={styles.contactRow}>
          <View style={styles.image}>
            {imageJSX(contact.profile_img_url, contact.name)}
          </View>
          <View style={styles.label}>
            <Text>{contact.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const sectionJSX = () => {
    if (contactList.length > 0) {
      if (localContactList.length > 0) {
        return (
          <SectionList
            sections={localContactList}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <Item contact={item} />}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.sectionTitle}>{title}</Text>
            )}
          />
        );
      } else {
        return (
          <Text style={styles.noContacts}>
            No contacts found for {keyTyped}
          </Text>
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <View style={styles.screenWrapper}>
        <View style={styles.searchWrapper}>
          <Search
            handleSearch={handleSearch}
            placeholderTitle="Search Contacts"
          />
        </View>
        <View>{sectionJSX()}</View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  currentUserId: state.authReducer.userId,
  contactList: state.contactsReducer.contactList,
});

const mapDispatchToProps = {
  getContactsForUser: getContactsForUser,
  filterContactList: filterContactList,
  getMessagesAction: getMessagesAction,
  clearMessagesAction: clearMessagesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactScreenTab);

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
  profileLogo: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  image: {
    marginRight: 15,
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "powderblue",
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    fontSize: 23,
    color: "#33F0C2",
  },

  label: {},
  sectionTitle: {
    marginTop: 15,
    marginBottom: 10,
    fontSize: 18,
  },
  noContacts: {
    alignItems: "center",
    textAlign: "center",
  },
  noContactsFound: {
    alignItems: "center",
    textAlign: "center",
    paddingVertical: 30,
  },
  noFoundText: {
    color: "#C0C0C0",
    marginTop: 10,
    fontSize: 20,
  },
  addContactButton: {
    color: "#ffffff",
    marginTop: 15,
    fontSize: 15,
    padding: 10,
    backgroundColor: "#33F0C2",
    borderRadius: 5,
  },
});
