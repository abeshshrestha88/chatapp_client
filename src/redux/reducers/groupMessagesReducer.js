import { groupMessageTypes } from "../types/types";
const {
  RECEIVE_GROUP_MSG_FROM_SERVER,
  GET_GROUP_MSG_FROM_SERVER,
} = groupMessageTypes;

import { GiftedChat } from "react-native-gifted-chat";

const messagesReducer = (
  state = {
    group_messages: [],
    groupId: "",
    groupConversationList: [],
  },
  action
) => {
  switch (action.type) {
    case RECEIVE_GROUP_MSG_FROM_SERVER:
      console.log("group msg recived in state", action.payload);

      return {
        ...state,
        messages: GiftedChat.append(state.messages, action.payload),

        // conversationId: action.payload.conversation_id,
      };

    case GET_GROUP_MSG_FROM_SERVER:
      console.log("group list in reducer is:", action.payload);

      return {
        ...state,
        // group_messages: GiftedChat.append(state.messages, action.payload),

        groupConversationList: action.payload,
      };

    // case SENT_SOCKET_MESSAGE:
    //   return {
    //     ...state,
    //     messages: GiftedChat.append(state.messages, action.payload),
    //   };

    // case GET_MSG_FROM_SERVER:
    //   return {
    //     ...state,
    //     messages: GiftedChat.append(state.messages, action.payload),
    //   };

    // case CLEAR_MESSAGE:
    //   return {
    //     ...state,
    //     messages: action.payload,
    //   };
    default:
      return state;
  }
};

export default messagesReducer;
