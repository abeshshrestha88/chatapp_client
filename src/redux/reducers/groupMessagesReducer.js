import { groupMessageTypes } from "../types/types";
const {
  RECEIVE_GROUP_MSG_FROM_SERVER,
  GET_GROUP_FROM_SERVER,
  GET_GROUP_MSG_FROM_SERVER,
  CLEAR_GROUP_MESSAGE,
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

      console.log("#########before saving to state is", action.payload);

      // const giftedchat_row = GiftedChat.append(
      //   state.group_messages,
      //   action.payload
      // );

      // const append_to_prev_msg = state.group_messages.push(giftedchat_row);

      return {
        ...state,
        // group_messages: append_to_prev_msg,
        group_messages: GiftedChat.append(state.group_messages, action.payload),
        // group_messages: GiftedChat.append(state.messages, action.payload),

        // conversationId: action.payload.conversation_id,
      };

    case GET_GROUP_FROM_SERVER:
      // console.log("group list in reducer is:", action.payload);

      return {
        ...state,
        // group_messages: GiftedChat.append(state.messages, action.payload),

        groupConversationList: action.payload,
      };

    case GET_GROUP_MSG_FROM_SERVER:
      console.log("group msg in reducer is:", action.payload);

      return {
        ...state,

        group_messages: action.payload,
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

    case CLEAR_GROUP_MESSAGE:
      console.log("clear msg called in reducer!!!!!!");
      return {
        ...state,
        group_messages: [],
      };
    default:
      return state;
  }
};

export default messagesReducer;
