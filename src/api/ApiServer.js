import axios from "axios";

import env from "../../environmentVariable";
const { envBaseURL } = env;

console.log("base url is", envBaseURL);

export default axios.create({
  baseURL: envBaseURL,
  // baseURL: "http://6b906a7d3599.ngrok.io",
  // timeout: 1000,
  // headers: { "X-Custom-Header": "foobar" },
});
