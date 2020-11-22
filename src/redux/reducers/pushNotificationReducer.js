import { pushNoticicationTypes } from "../types/types";
const {
  SET_TOKEN,
  SET_CONVERSATIONID,
  RESET_CONVERSATIONID,
} = pushNoticicationTypes;

const pushNotificationReducer = (
  state = {
    expoPushToken: "123",
    conversationId: null,
  },

  action
) => {
  switch (action.type) {
    case SET_TOKEN:
      console.log("set token reducer called");
      return {
        ...state,
        expoPushToken: action.payload,
      };
    case SET_CONVERSATIONID:
      console.log("conversation id in reducer is", action.payload);
      return {
        ...state,
        conversationId: action.payload,
      };
    case RESET_CONVERSATIONID:
      console.log("conversation id reset reducer called");
      return {
        ...state,
        conversationId: null,
      };

    default:
      return state;
  }
};

export default pushNotificationReducer;
