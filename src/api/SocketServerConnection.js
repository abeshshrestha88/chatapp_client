import io from "socket.io-client";
import env from "../../environmentVariable";
const { envBaseURL } = env;

const socket = io(`${envBaseURL}`);

// console.log(envBaseURL);
// console.log("env socket ngrok....");
// console.log(`"${envBaseURL}`);
// const socket = io("http://6b906a7d3599.ngrok.io");

export default socket;
