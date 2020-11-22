import { combineReducers } from "redux";
import countryCodeListReducer from "./countryCodeListReducer";
import authReducer from "./authReducer";
import userProfileReducer from "./userProfileReducer";
import contactsReducer from "./contactsReducer";
import messagesReducer from "./messagesReducer";
import conversationReducer from "./conversationReducer";
import pushNotificationReducer from "./pushNotificationReducer";
import groupMessagesReducer from "./groupMessagesReducer";

const rootReducer = combineReducers({
  countriesCodes: countryCodeListReducer,
  authReducer: authReducer,
  userProfileReducer: userProfileReducer,
  contactsReducer: contactsReducer,
  messagesReducer: messagesReducer,
  conversationReducer: conversationReducer,
  pushNotificationReducer: pushNotificationReducer,
  groupMessagesReducer,
});

export default rootReducer;
