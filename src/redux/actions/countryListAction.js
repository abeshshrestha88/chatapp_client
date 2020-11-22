import ApiServer from "../../api/ApiServer";
import {
  SELECT_COUNTRY,
  FILTER_COUNTRY_LIST,
  RESET_COUNTRY_LIST,
  GET_VERIFICATION_CODE,
  VERIFICATION_CODE_SENT,
  SET_PHONE_NUMBER,
  SET_TOKEN_ON_APP_START,
} from "../types/types";

import AsyncStorage from "@react-native-community/async-storage";

export const filterSearchListAction = (searchText) => {
  return { type: FILTER_COUNTRY_LIST, payload: searchText };
};

export const selectedCountryAction = (country) => {
  return { type: SELECT_COUNTRY, payload: country };
};

export const resetCountryAction = () => {
  return { type: RESET_COUNTRY_LIST };
};

export const setPhoneNumberAction = (phoneNumber) => {
  return { type: SET_PHONE_NUMBER, payload: phoneNumber };
};
