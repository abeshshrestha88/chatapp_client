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
import Search from "../components/Search";
import { CheckBox } from "react-native-elements";

//TODO: GET CONTACTS FROM PHONE
// import * as ContactsFromPhone from "expo-contacts";
import { connect } from "react-redux";
import {
  getContactsForUser,
  filterContactList,
} from "../../redux/actions/contactsAction";
import {
  getMessagesAction,
  clearMessagesAction,
} from "../../redux/actions/messageAction";

import _ from "lodash";
import { CommonActions } from "@react-navigation/native";
import { getConversationIdAction } from "../../redux/actions/conversationAction";
import { FontAwesome5 } from "@expo/vector-icons";

import { AddContactsToGroup } from "../../redux/actions/contactsAction";
import { clearGroupMessagesAction } from "../../redux/actions/groupMessageAction";

const AddGroup = ({
  route,
  navigation,
  currentUserId,
  getContactsForUser,
  contactList,
  filterContactList,
  getMessagesAction,
  clearMessagesAction,
  clearGroupMessagesAction,
}) => {
  const [addScreenModelVisible, setAddScreenModelVisible] = useState(false);

  const [localContactList, setLocalContactList] = useState([]);
  const [keyTyped, setKeyTyped] = useState("");
  const [checked, setChecked] = useState(false);
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    // console.log("contact list is:", contactList);
    // console.log(
    //   <pre>
    //     <code>{JSON.stringify(contactList, null, 4)}</code>
    //   </pre>
    // );
    const filteredUser = getFriendFilter(contactList);
    setLocalContactList(filteredUser);

    const unsubscribe = navigation.addListener("focus", () => {
      getContactsForUser(currentUserId);
    });

    return unsubscribe;
  }, [navigation, contactList]);

  // const getFriendFilter = (contactList) => {
  //   const filteredUserMap = contactList.map((contact) => {
  //     const filteredUser = contact.data.filter((arrayItem) => {
  //       console.log("array itme");
  //       console.log(arrayItem);
  //       return arrayItem.user_exist == true;
  //     });
  //     return filteredUser;
  //   });
  //   // console.log("Filtered User");
  //   // console.log(filteredUserMap);
  // };

  const getFriendFilter = (contactList) => {
    const filteredUserMap = contactList.map((contact) => {
      const userExistArray = contact.data.filter((existUser) => {
        // if (existUser.user_exist == true) {

        //   return
        //   console.log(contact.title);
        //   console.log(contact.data);
        // }
        return existUser.user_exist == true;
      });

      return {
        title: contact.title,
        data: userExistArray,
      };

      // return contact.data;
    });

    const returnData = filteredUserMap.filter((userExist) => {
      return userExist.data.length != 0;
    });
    return returnData;
  };

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

  const imageJSX = (image) => {
    if (image === "") {
      return (
        <Image
          style={styles.profileLogo}
          source={require("../../../assets/profile-placeholder.png")}
        />
      );
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

  const handleCheckBoxChange = (contact) => {
    if (!contact.checked) {
      contact.checked = true;
      setGroupList([...groupList, contact.contactId]);
    } else {
      contact.checked = false;
      const removedContactList = groupList.filter((state_contact) => {
        return state_contact !== contact.contactId;
      });
      setGroupList(removedContactList);
    }
    // setChecked(!checked);
  };

  console.log("contact group list is:", groupList);

  const Item = ({ contact }) => {
    return (
      <View style={styles.contactRow}>
        {contact.user_exist && (
          <CheckBox
            title="Click Here"
            checked={contact.checked ? true : false}
            onPress={() => {
              handleCheckBoxChange(contact);
            }}
            title=""
          />
        )}

        {contact.user_exist && (
          <View style={styles.image}>{imageJSX(contact.profile_img_url)}</View>
        )}
        <View style={styles.label}>
          {contact.user_exist && <Text>{contact.name}</Text>}
        </View>
      </View>
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
    } else {
      return (
        <View style={styles.noContactsFound}>
          <FontAwesome5 name="frown" size={34} color="#C0C0C0" />
          <Text style={styles.noFoundText}>
            You do not have any friends yet...
          </Text>
          <TouchableOpacity onPress={addContactButton}>
            <Text style={styles.addContactButton}>Add a Friend</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  const handleDone = async () => {
    const id = await AddContactsToGroup(currentUserId, groupList);
    console.log("id in handle done is", id);

    clearGroupMessagesAction();

    navigation.navigate("GroupMessageScreen", { groupId: id });
    localContactList.map((contact) => {
      contact.data.map((item) => {
        item.checked = false;
      });
    });
  };
  const handleCancel = async () => {
    navigation.navigate("Recent Conversation");
    localContactList.map((contact) => {
      contact.data.map((item) => {
        item.checked = false;
      });
    });
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
        <View style={styles.buttonWrapper}>
          <TouchableOpacity onPress={handleDone} style={styles.button}>
            <Text style={{ fontSize: 18, color: "#ffffff" }}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancel} style={styles.button}>
            <Text style={{ fontSize: 18, color: "#ffffff" }}>Cancel</Text>
          </TouchableOpacity>
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
  clearGroupMessagesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddGroup);

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
  buttonWrapper: {
    width: "100%",
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#fb5b5a",
    borderRadius: 2,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
});
