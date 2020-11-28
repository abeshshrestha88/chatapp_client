import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

import { sendMessage } from "../../../redux/actions/messageAction";
import { sendPushNotification } from "../../../helpers/functions";
import { setNotificationConversationIdAction } from "../../../redux/actions/pushNotificationAction";

import socket from "../../../api/SocketServerConnection";

const messageScreen = ({
  route,
  messages,
  newMessage,
  sendMessage,
  expoPushToken,
  name,
  setNotificationConversationIdAction,
}) => {
  useEffect(() => {
    console.log("conversation param id is: ", route.params.conversationId);

    // setNotificationConversationIdAction(route.params.conversationId);
  }, []);

  const conversationId = route.params.conversationId;
  messages = messages.filter((msg) => msg.conversation_id === conversationId);

  const contact = route.params.contact;
  const currentUserId = route.params.currentUserId;
  // const notification_token = route.params.notification_token;

  // console.log("token in send is");
  // console.log(expoPushToken);

  function onSend(newMessage = []) {
    // sendPushNotification({
    //   to: notification_token,
    //   sound: "default",
    //   title: name,
    //   body: newMessage[0].text,
    //   data: JSON.stringify({ conversationId: conversationId }),
    // });
    //ExponentPushToken[lcJiMgKNBF7UzclZK_vmhA]
    //ExponentPushToken[2YVMhZN4c9yDuaAC3ihPG1]

    console.log("new msg is", newMessage);

    // newMessage[0].user.avatar = "https://placeimg.com/140/140/any";
    // newMessage[0].user.name = "random user";

    newMessage[0].conversation_id = route.params.conversationId;

    socket.emit(
      "messages",
      {
        message: newMessage,
        to: contact.contactId,
      },
      function (confirmation) {
        // send data
        // know we got it once the server calls this callback
        // note -in this ex we dont need to send back any data
        // - could just have called fn() at server side
        console.log("callback called", confirmation);
        if (confirmation.msg_saved) {
          sendMessage(newMessage);
        }
      }
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      renderUsernameOnMessage
      user={{
        _id: currentUserId,
        name: name,
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  messages: state.messagesReducer.messages,
  newMessage: state.messagesReducer.newMessage,
  expoPushToken: state.pushNotificationReducer.expoPushToken,
  name: state.userProfileReducer.name,
});

const mapDispatchToProps = {
  sendMessage,
  setNotificationConversationIdAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(messageScreen);
