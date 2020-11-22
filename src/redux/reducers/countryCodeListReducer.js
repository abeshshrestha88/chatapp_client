import countriesList from "../../helpers/countries";
import {
  SELECT_COUNTRY,
  FILTER_COUNTRY_LIST,
  RESET_COUNTRY_LIST,
  SET_PHONE_NUMBER,
} from "../types/types";

const countryCodeListReducer = (
  state = {
    countriesLists: countriesList,
    selectedCountry: {
      iso: "US",
      name: "UNITED STATES",
      phonecode: 1,
    },
    verificationCodeLoading: true,
    phoneNumber: "",
  },
  action
) => {
  switch (action.type) {
    case FILTER_COUNTRY_LIST: {
      let original_list = countriesList;
      const countrylist = original_list.filter((country) =>
        country.name.toLowerCase().startsWith(action.payload.toLowerCase())
      );

      return { ...state, countriesLists: countrylist };
    }

    case SELECT_COUNTRY:
      return { ...state, selectedCountry: action.payload };

    case SET_PHONE_NUMBER:
      return { ...state, phoneNumber: action.payload };

    case RESET_COUNTRY_LIST:
      return { ...state, countriesLists: countriesList };

    default:
      return state;
  }
};

export default countryCodeListReducer;
