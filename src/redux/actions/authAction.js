import {
  SET_TOKEN_ON_APP_START,
  SELECT_COUNTRY,
  SET_PHONE_NUMBER,
  AUTH_LOG_IN,
  AUTH_LOG_IN_ERROR,
  CLEAR_AUTH_LOG_IN_ERROR,
  RECEIVE_SOCKET_MESSAGE,
  SIGN_OUT,
  userProfileTypes,
} from "../types/types";
import ApiServer from "../../api/ApiServer";

import AsyncStorage from "@react-native-community/async-storage";

import socket from "../../api/SocketServerConnection";

const {
  SET_NAME,
  SET_DOB,
  SET_EMAIL,
  SET_IMAGE,
  SET_USERPROFILE_SET,
} = userProfileTypes;

export const setStateFromLocalStorageAction = () => {
  return async (dispatch) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const jsonValue = await AsyncStorage.getItem("chatapp_local_data");
      const chatappLocalData = JSON.parse(jsonValue);

      console.log("chatappLocalData");
      console.log(chatappLocalData);
      if (chatappLocalData !== null) {
        console.log("inside chatapp local data found");
        dispatch({
          type: SET_TOKEN_ON_APP_START,
          payload: { ...chatappLocalData },
        });
        dispatch({
          type: SELECT_COUNTRY,
          payload: chatappLocalData.selectedCountry,
        });
        dispatch({
          type: SET_PHONE_NUMBER,
          payload: chatappLocalData.phoneNumber,
        });

        socket.on(chatappLocalData.userId.toString(), (newMessage) => {
          dispatch({ type: RECEIVE_SOCKET_MESSAGE, payload: newMessage });
        });
      } else {
        dispatch({
          type: SET_TOKEN_ON_APP_START,
          payload: {},
        });
      }

      const userProfileObject = await AsyncStorage.getItem(
        "chatapp_local_user_profile"
      );

      const userProfileData = JSON.parse(userProfileObject);

      console.log("profile image is:");
      console.log(userProfileData);

      if (userProfileData !== null) {
        console.log("user profile found....");
        dispatch({
          type: SET_NAME,
          payload: userProfileData.name,
        });

        dispatch({
          type: SET_EMAIL,
          payload: userProfileData.email,
        });

        dispatch({
          type: SET_DOB,
          payload: userProfileData.dob,
        });
        dispatch({
          type: SET_IMAGE,
          payload: userProfileData.image,
        });
        dispatch({
          type: SET_USERPROFILE_SET,
          payload: {
            userProfileSet: userProfileData.userProfileSet,
            isLoadingUserProfile: false,
          },
        });
      } else {
        console.log("user profile not found....");
        dispatch({
          type: SET_USERPROFILE_SET,
          payload: {
            userProfileSet: false,
            isLoadingUserProfile: false,
          },
        });
      }
    } catch (e) {
      dispatch({
        type: SET_TOKEN_ON_APP_START,
        payload: { chatappLocalData: {} },
      });
    }
  };
};

export const requestVerificationCodeApiCall = async (
  phoneNumber,
  countryCode
) => {
  try {
    console.log("api called sms resnt....");
    // console.log(ApiServer);

    await ApiServer.post("/api/auth/register", {
      phoneNumber: phoneNumber.toString(),
      countryCode: countryCode.toString(),
    });

    console.log("registration api called######");
  } catch (error) {
    console.log(error.message);
  }
};

export const validateVerificationCodeApiCall = (
  verificationCode,
  phoneNumber,
  countryCode,
  selectedCountry
) => {
  return async (dispatch) => {
    try {
      console.log("validation verirication code api called....");

      const res = await ApiServer.post("/api/auth/verify-code", {
        verificationCode: verificationCode,
        phoneNumber: phoneNumber.toString(),
        countryCode: countryCode.toString(),
      });

      const { status, ...requiredData } = res.data;

      console.log("required data status is:", status);

      console.log("required data is:", requiredData);

      requiredData.selectedCountry = selectedCountry;

      try {
        const jsonValue = JSON.stringify(requiredData);
        await AsyncStorage.setItem("chatapp_local_data", jsonValue);
      } catch (e) {
        console.log(e);
      }

      dispatch({ type: AUTH_LOG_IN, payload: res.data });
      dispatch({
        type: SET_USERPROFILE_SET,
        payload: { userProfileSet: false, isLoadingUserProfile: false },
      });

      try {
        socket.on(res.data.userId.toString(), (newMessage) => {
          dispatch({ type: RECEIVE_SOCKET_MESSAGE, payload: newMessage });
        });
      } catch (error) {
        console.log("error....");
        console.log(error);
      }
    } catch (e) {
      console.log("inside catch");
      let error;
      if (e.response.status === 404) {
        error = "Invalid Verification Code";
      } else if (e.response.status === 401) {
        error = "Verification code expired";
      } else {
        error = "unexpected error";
      }

      dispatch({ type: AUTH_LOG_IN_ERROR, payload: error });
    }
  };
};

export const signOutAction = () => {
  console.log("sign out action called...");
  return { type: SIGN_OUT };
};

export const clearErrorMsg = () => {
  return { type: CLEAR_AUTH_LOG_IN_ERROR };
};
