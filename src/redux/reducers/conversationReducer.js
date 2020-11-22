import { recentConversationTypes } from "../types/types";
const { GET_CONVERSATION } = recentConversationTypes;

const conversationReducer = (
  state = {
    conversationList: [],
  },
  action
) => {
  switch (action.type) {
    case GET_CONVERSATION: {
      return { ...state, conversationList: action.payload };
    }

    default:
      return state;
  }
};

export default conversationReducer;
