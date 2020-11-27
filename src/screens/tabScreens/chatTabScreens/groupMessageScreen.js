import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

import { sendMessage } from "../../../redux/actions/messageAction";
import { sendPushNotification } from "../../../helpers/functions";
import { setNotificationConversationIdAction } from "../../../redux/actions/pushNotificationAction";

import socket from "../../../api/SocketServerConnection";
import { receiveMessagesAction } from "../../../redux/actions/groupMessageAction";

const groupMessageScreen = ({
  route,
  receiveMessagesAction,
  messages,
  currentUserId,
  // messages,
  // newMessage,
  // sendMessage,

  // name,
  // setNotificationConversationIdAction,
}) => {
  useEffect(() => {
    console.log("inside gorup msg screen");
    console.log("hi");
    console.log("group id is: ", route.params.groupId);

    socket.on("newGroupMessage", (data) => {
      console.log("before calling action", data);
      receiveMessagesAction(data);
    });

    socket.emit("joinGroup", {
      groupId: route.params.groupId,
    });

    // console.log("conversation param id is: ", route.params.conversationId);
    // setNotificationConversationIdAction(route.params.conversationId);
    return () => {
      socket.off("newGroupMessage");

      socket.emit("leaveGroup", {
        groupId: route.params.groupId,
      });

      console.log("bye");
    };
  }, []);

  // const conversationId = route.params.conversationId;
  // messages = messages.filter((msg) => msg.conversation_id === conversationId);

  // const contact = route.params.contact;
  // const currentUserId = route.params.currentUserId;
  // const notification_token = route.params.notification_token;

  // console.log("token in send is");
  // console.log(expoPushToken);

  function onSend(newMessage = []) {
    console.log("new msg is: ", newMessage);
    console.log("group id in route is", route.params.groupId);

    socket.emit("groupMessage", {
      message: newMessage,
      to: route.params.groupId,
      userId: currentUserId,
    });
    // sendPushNotification({
    //   to: notification_token,
    //   sound: "default",
    //   title: name,
    //   body: newMessage[0].text,
    //   data: JSON.stringify({ conversationId: conversationId }),
    // });
    //ExponentPushToken[lcJiMgKNBF7UzclZK_vmhA]
    //ExponentPushToken[2YVMhZN4c9yDuaAC3ihPG1]
    // newMessage[0].conversation_id = route.params.conversationId;
    // socket.emit(
    //   "messages",
    //   {
    //     message: newMessage,
    //     to: contact.contactId,
    //   },
    //   function (confirmation) {
    //     // send data
    //     // know we got it once the server calls this callback
    //     // note -in this ex we dont need to send back any data
    //     // - could just have called fn() at server side
    //     console.log("callback called", confirmation);
    //     if (confirmation.msg_saved) {
    //       sendMessage(newMessage);
    //     }
    //   }
    // );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: currentUserId,
        avatar: "https://placeimg.com/140/140/any",
        name: "bcd",
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  messages: state.groupMessagesReducer.group_messages,
  // newMessage: state.messagesReducer.newMessage,
  // name: state.userProfileReducer.name,
  currentUserId: state.authReducer.userId,
});

const mapDispatchToProps = {
  // sendMessage,
  // setNotificationConversationIdAction,
  receiveMessagesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(groupMessageScreen);
