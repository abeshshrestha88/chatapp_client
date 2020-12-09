import ApiServer from "../../api/ApiServer";

import { userProfileTypes } from "../types/types";
const {
  SET_NAME,
  SET_EMAIL,
  SET_DOB,
  SET_IMAGE,
  SET_USER_PROFILE,
  GET_USERPROFILE,
  UPDATE_USER_PROFILE,
} = userProfileTypes;

import AsyncStorage from "@react-native-community/async-storage";

import moment from "moment";

export const setNameAction = (name) => {
  console.log("setNameAction called....");
  console.log(name);
  return { type: SET_NAME, payload: name };
};

export const setEmailAction = (email) => {
  return { type: SET_EMAIL, payload: email };
};

export const setDobAction = (dob) => {
  return { type: SET_DOB, payload: dob };
};

export const setImageAction = (image) => {
  return { type: SET_IMAGE, payload: image };
};

// export const getUserProfileAction = (userId) => {
//   console.log("Action Called");
//   console.log(userId);
//   return async (dispatch) => {
//     try {
//       const res = await ApiServer.get("/api/user-profile/get-userprofile", {
//         params: { userId },
//       });
//       // if (res.data.success) {
//       //   console.log(res.data);
//       //   dispatch({});
//       // } else {
//       // }
//     } catch (error) {
//       console.log("error:");
//       console.log(error);
//     }
//   };
// };

export const setUserProfileAction = (InputData, { image_url }) => {
  console.log("set user profile action called");
  console.log(InputData);
  console.log(image_url);
  /* start :: set dob in local storage */

  let local_image_url = "";
  if (image_url) {
    local_image_url =
      "https://chat-gateway-profile.s3.amazonaws.com/profile-picture/" +
      InputData.phoneNumber +
      "/photo.jpg";
  }
  try {
    const jsonValue = JSON.stringify({
      name: InputData.name,
      email: InputData.email,
      dob: InputData.dob,
      image: local_image_url,
      userProfileSet: true,
    });

    AsyncStorage.setItem("chatapp_local_user_profile", jsonValue);

    console.log("before calling reducer...setimage");
  } catch (e) {
    console.log("inside chatapp_local_user_profile error");
    console.log(e);
  }

  /* end :: set dob in local storage */

  console.log("statement running after return in action......");

  InputData.dob = InputData.dob.toISOString();

  let formData = new FormData();

  for (const property in InputData) {
    formData.append(property, InputData[property]);
  }

  if (image_url !== "") {
    let localUri = image_url;
    let uriParts = localUri.split(".");
    let fileType = uriParts[uriParts.length - 1];

    formData.append("photo", {
      uri: localUri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
  }

  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  return async (dispatch) => {
    try {
      console.log("before calling api call - update-userprofile");

      const res = await ApiServer.post(
        "/api/user-profile/update-userprofile",
        formData,
        config
      );

      if (res.data.success) {
        dispatch({ type: SET_USER_PROFILE, payload: res.data.user_profile });
        dispatch({ type: SET_IMAGE, payload: local_image_url });

        // { type: SET_IMAGE, payload: local_image_url };
      } else {
        console.log("error updating user profile");
      }
    } catch (error) {
      console.log("error calling api");
    }
  };
};

export const updateUserProfileAction = (UpdatedData) => {
  console.log("Update user profile action called");
  console.log(UpdatedData);
  try {
    const jsonValue = JSON.stringify({
      name: UpdatedData.name,
      email: UpdatedData.email,
      dob: UpdatedData.dob,
      image: UpdatedData.image_url,
      userProfileSet: true,
    });
    console.log(jsonValue);
    AsyncStorage.setItem("chatapp_local_user_profile", jsonValue);
  } catch (e) {
    console.log("inside chatapp_local_user_profile error");
    console.log(e);
  }

  UpdatedData.dob = UpdatedData.dob.toISOString();
  console.log("Before return");
  return async (dispatch) => {
    try {
      console.log("before calling api call - edit-userprofile");
      const res = await ApiServer.post("/api/user-profile/edit-userprofile", {
        name: UpdatedData.name,
        email: UpdatedData.email,
        dob: UpdatedData.dob,
        image: UpdatedData.image_url,
        countryCode: UpdatedData.countryCode,
        phoneNumber: UpdatedData.phoneNumber,
      });

      if (res.data.success) {
        console.log("updated user profile", res.data.user_profile);
        dispatch({ type: UPDATE_USER_PROFILE, payload: res.data.user_profile });
        // dispatch({ type: SET_IMAGE, payload: local_image_url });

        // { type: SET_IMAGE, payload: local_image_url };
      } else {
        console.log("error updating user profile");
      }
    } catch (error) {
      console.log("error calling edit api");
    }
  };
};
