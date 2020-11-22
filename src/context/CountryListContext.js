import createDataContext from "./contextGenerator/createDataContext";
import countries from "../helpers/countries";
import startsWith from "lodash/startsWith";

const countryListReducer = (state, action) => {
  switch (action.type) {
    case "get_country_list":
      return action.payload;
    case "filter_country_list":
      return countries.filter((country) =>
        startsWith(country.name.toLowerCase(), action.payload.toLowerCase())
      );
    default:
      return state;
  }
};

const setCountryList = (dispatch) => {
  return async () => {
    console.log("get country list called...");
    dispatch({ type: "get_country_list", payload: countries });
  };
};

const filterSearchList = (dispatch) => {
  return async (searchText) => {
    console.log("seach list called...");
    dispatch({ type: "filter_country_list", payload: searchText });
  };
};

export const { Context, Provider } = createDataContext(
  countryListReducer,
  { setCountryList, filterSearchList },
  []
);
