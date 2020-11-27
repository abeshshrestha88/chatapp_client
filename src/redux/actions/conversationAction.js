import { recentConversationTypes } from "../types/types";

const { GET_CONVERSATION } = recentConversationTypes;

import ApiServer from "../../api/ApiServer";

export const getConversationAction = (userId) => {
  console.log("use id is: ", userId);
  return async (dispatch) => {
    try {
      const res = await ApiServer.get(
        "/api/conversation/get-conversation-list",
        {
          params: { userId },
        }
      );

      console.log("getconversationaction data is: ", res.data.conversationList);
      dispatch({ type: GET_CONVERSATION, payload: res.data.conversationList });
    } catch (error) {}
  };
};

export const getConversationIdAction = async (currentUserId, contactId) => {
  try {
    const res = await ApiServer.get("/api/conversation/get-conversation-id", {
      params: { currentUserId, contactId },
    });

    return res.data.conversation_id;
  } catch (error) {}
};