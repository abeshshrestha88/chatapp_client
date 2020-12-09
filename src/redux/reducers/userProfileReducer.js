import { userProfileTypes } from "../types/types";
const {
  SET_NAME,
  SET_EMAIL,
  SET_DOB,
  SET_IMAGE,
  SET_USER_PROFILE,
  SET_USERPROFILE_SET,
  UPDATE_USER_PROFILE,
} = userProfileTypes;

const userProfileReducer = (
  state = {
    name: "",
    email: "",
    dob: new Date(Date.now()),
    image: "",
    userProfileSet: false,
    isLoadingUserProfile: true,
  },
  action
) => {
  switch (action.type) {
    case SET_NAME:
      console.log("Inside User reducer", action.payload);
      return {
        ...state,
        name: action.payload,
      };

    case SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };

    case SET_DOB:
      return {
        ...state,
        dob: action.payload,
      };

    case SET_IMAGE:
      console.log("inside set image reducer....");
      return {
        ...state,
        image: action.payload,
      };

    case SET_USERPROFILE_SET:
      return {
        ...state,
        userProfileSet: action.payload.userProfileSet,
        isLoadingUserProfile: action.payload.isLoadingUserProfile,
      };

    case SET_USER_PROFILE:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        dob: action.payload.dob,
        image: action.payload.profile_img_url,
        userProfileSet: true,
      };

    case UPDATE_USER_PROFILE:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        dob: action.payload.dob,
        image: action.payload.profile_img_url,
        userProfileSet: true,
      };

    default:
      return state;
  }
};

export default userProfileReducer;
