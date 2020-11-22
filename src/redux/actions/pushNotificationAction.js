import { pushNoticicationTypes } from "../types/types";
const {
  SET_TOKEN,
  SET_CONVERSATIONID,
  RESET_CONVERSATIONID,
} = pushNoticicationTypes;

// const { SET_TOKEN, SET_CONVERSATION_ID } = types.pushNoticicationTypes;

// console.log("set token value is", SET_TOKEN);
// console.log("set conversatin id is:", SET_CONVERSATION_ID);

import ApiServer from "../../api/ApiServer";
import AsyncStorage from "@react-native-community/async-storage";

export const setPushNotificationTokenAction = (expoPushToken) => {
  console.log("set token inside action", expoPushToken);
  return { type: SET_TOKEN, payload: expoPushToken };
};

export const setNotificationConversationIdAction = (conversationId) => {
  console.log("conversation id in action is", conversationId);

  return { type: SET_CONVERSATIONID, payload: conversationId };
};

export const resetPushNotificationConversationAction = () => {
  console.log("conversation id reset action called");
  return { type: RESET_CONVERSATIONID, payload: null };
};
