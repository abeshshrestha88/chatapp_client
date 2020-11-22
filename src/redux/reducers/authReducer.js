import {
  AUTH_LOG_IN,
  AUTH_LOG_IN_ERROR,
  SET_TOKEN_ON_APP_START,
  SIGN_OUT,
} from "../types/types";
import AsyncStorage from "@react-native-community/async-storage";

import socket from "../../api/SocketServerConnection";

const authReducer = (
  state = {
    token: null,
    isAuthenticated: false,
    errorMessage: "",
    userId: null,
    isLoading: true,
  },
  action
) => {
  switch (action.type) {
    case AUTH_LOG_IN:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        userId: action.payload.userId,
        isLoading: false,
      };

    case AUTH_LOG_IN_ERROR:
      return { ...state, errorMessage: action.payload };

    case SIGN_OUT:
      console.log("singout reducer called");
      return { ...state, isAuthenticated: false, isLoading: false };

    case SET_TOKEN_ON_APP_START:
      {
        const { token, userId } = action.payload;
        console.log("user id in reducer is: ");
        console.log(userId);

        if (token) {
          return {
            ...state,
            token: token,
            isAuthenticated: true,
            isLoading: false,
            userId: userId,
          };
        } else {
          return { ...state, isLoading: false };
        }
      }

      return state;

    default:
      return state;
  }
};

export default authReducer;
