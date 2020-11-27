import { contactsTypes } from "../types/types";

const { ADD_CONTACT, GET_CONTACT, FILTER_CONTACT_LIST } = contactsTypes;

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