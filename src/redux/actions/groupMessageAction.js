// import {
//   SEND_MESSAGE,
//   SENT_SOCKET_MESSAGE,
//   GET_MSG_FROM_SERVER,
//   CLEAR_MESSAGE,
// } from "../types/types";

import { groupMessageTypes } from "../types/types";
const {
  RECEIVE_GROUP_MSG_FROM_SERVER,
  GET_GROUP_FROM_SERVER,
  GET_GROUP_MSG_FROM_SERVER,
  CLEAR_GROUP_MESSAGE,
} = groupMessageTypes;

import ApiServer from "../../api/ApiServer";

export const receiveMessagesAction = (data) => {
  console.log("socket msg received in action", data);

  console.log("######user is#######", data.user);

  return { type: RECEIVE_GROUP_MSG_FROM_SERVER, payload: data.message[0] };
};

export const getGroupConversationAction = (userId) => {
  console.log("inside getgroup conv use id is: ", userId);
  return async (dispatch) => {
    try {
      const res = await ApiServer.get(
        "/api/groups/get-group-conversation-list",
        {
          params: { userId },
        }
      );

      // console.log(
      //   "group conversation list is: ",
      //   res.data.groupConversationList
      // );

      dispatch({
        type: GET_GROUP_FROM_SERVER,
        payload: res.data.groupConversationList,
      });
    } catch (error) {}
  };
};

export const getGroupMessagesAction = (groupId) => {
  console.log("inside action.....");
  return async (dispatch) => {
    try {
      const res = await ApiServer.get("/api/group-messages/get-messages", {
        params: { groupId },
      });

      console.log(res);

      if (res.data.success) {
        console.log(
          "group msg received inside action is",
          res.data.groupMessages
        );

        dispatch({
          type: GET_GROUP_MSG_FROM_SERVER,
          payload: res.data.groupMessages,
        });
      } else {
      }
    } catch (error) {
      console.log("error:");
      console.log(error);
    }
  };
};

export const clearGroupMessagesAction = () => {
  return { type: CLEAR_GROUP_MESSAGE };
};

// export const sendMessage = (message) => {
//   return { type: SENT_SOCKET_MESSAGE, payload: message };
// };

// export const getMessagesAction = (userId1, userId2) => {
//   return async (dispatch) => {
//     try {
//       const res = await ApiServer.get("/api/messages/get-messages", {
//         params: { userId1: userId1, userId2: userId2 },
//       });

//       if (res.data.success) {
//         dispatch({ type: GET_MSG_FROM_SERVER, payload: res.data.messages });
//       } else {
//       }
//     } catch (error) {
//       console.log("error:");
//       console.log(error);
//     }
//   };
// };

// export const clearMessagesAction = () => {
//   return {
//     type: CLEAR_MESSAGE,
//     payload: [],
//   };
// };
