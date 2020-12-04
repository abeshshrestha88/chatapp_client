import { contactsTypes } from "../types/types";
import { Platform } from "react-native";

const {
  ADD_CONTACT,
  GET_CONTACT,
  FILTER_CONTACT_LIST,
  PULL_PHONE_CONTACT_LIST,
} = contactsTypes;

import ApiServer from "../../api/ApiServer";

export const getContactsForUser = (userId) => {
  return async (dispatch) => {
    try {
      const res = await ApiServer.get("/api/contacts/list", {
        params: { userId },
      });

      dispatch({ type: GET_CONTACT, payload: res.data.contacts });
    } catch (error) {
      console.log("contacts list error calling api");
      console.log(error);
    }
  };
};

export const filterContactList = (searchText) => {
  return { type: FILTER_CONTACT_LIST, payload: searchText };
};

export const AddContactsToGroup = async (currentUserId, groupList) => {
  try {
    // console.log("add contact to group called with", groupList);
    const res = await ApiServer.post("/api/groups/add-group", {
      currentUserId,
      groupList,
    });

    console.log("data after calliong add group", res.data);

    return res.data.groupId;

    // dispatch({ type: GET_CONTACT, payload: res.data.contacts });
  } catch (error) {
    console.log(error);
    console.log("error creating Group");
  }
};

export const pullPhoneContactList = (contactList) => {
  console.log("pull phone contact action called", contactList[0]);

  console.log("phone array is", contactList[0].phoneNumbers);

  let tempArray = [];
  const contacts = contactList.forEach((contact) => {
    if (contact.phoneNumbers.length > 0) {
      const contarr = contact.phoneNumbers.map((phone) => {
        return Platform.OS == "android"
          ? { phone: phone.number, name: contact.displayName }
          : { phone: phone.number, name: contact.givenName };
        // return { phone: phone.number, name: contact.displayName };
      });

      // contacts.forEach(()=>{

      // })

      tempArray = [...tempArray, ...contarr];
      // console.log("#####concat arry is ", tempArray);
    }
  });

  console.log("****contact is", tempArray);

  return { type: PULL_PHONE_CONTACT_LIST, payload: tempArray };
};
