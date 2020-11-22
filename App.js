import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import store from "./src/redux/store";

import MyStack from "./src/screens/MyStack";

import env from "./environmentVariable";

import { setStateFromLocalStorageAction } from "./src/redux/actions/authAction";

import { connect } from "react-redux";

const { envBaseURL } = env;

const Application = function App({ setStateFromLocalStorageAction }) {
  setStateFromLocalStorageAction();

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

const App = connect(null, {
  setStateFromLocalStorageAction: setStateFromLocalStorageAction,
})(Application);

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
