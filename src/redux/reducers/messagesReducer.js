import {
  RECEIVE_SOCKET_MESSAGE,
  GET_MSG_FROM_SERVER,
  UNSEND_MESSAGE,
} from "../types/types";
import { GiftedChat } from "react-native-gifted-chat";
import { SENT_SOCKET_MESSAGE, CLEAR_MESSAGE } from "../types/types";

const messagesReducer = (
  state = {
    messages: [],
    conversationId: "",
  },
  action
) => {
  switch (action.type) {
    case RECEIVE_SOCKET_MESSAGE:
      return {
        ...state,
        messages: GiftedChat.append(state.messages, action.payload.message),

        conversationId: action.payload.conversation_id,
      };

    case SENT_SOCKET_MESSAGE:
      return {
        ...state,
        messages: GiftedChat.append(state.messages, action.payload),
      };

    case GET_MSG_FROM_SERVER:
      return {
        ...state,
        messages: GiftedChat.append(state.messages, action.payload),
      };

    case CLEAR_MESSAGE:
      return {
        ...state,
        messages: action.payload,
      };
    default:
      return state;
  }
};

export default messagesReducer;
