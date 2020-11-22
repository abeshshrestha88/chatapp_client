import {
  SEND_MESSAGE,
  SENT_SOCKET_MESSAGE,
  GET_MSG_FROM_SERVER,
  CLEAR_MESSAGE,
} from "../types/types";

import ApiServer from "../../api/ApiServer";

export const sendMessage = (message) => {
  return { type: SENT_SOCKET_MESSAGE, payload: message };
};

export const getMessagesAction = (userId1, userId2) => {
  return async (dispatch) => {
    try {
      const res = await ApiServer.get("/api/messages/get-messages", {
        params: { userId1: userId1, userId2: userId2 },
      });

      if (res.data.success) {
        dispatch({ type: GET_MSG_FROM_SERVER, payload: res.data.messages });
      } else {
      }
    } catch (error) {
      console.log("error:");
      console.log(error);
    }
  };
};

export const clearMessagesAction = () => {
  return {
    type: CLEAR_MESSAGE,
    payload: [],
  };
};
