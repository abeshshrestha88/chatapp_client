import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { View, Text, Clipboard } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

import {
  sendMessage,
  unsendMessagesAction,
} from "../../../redux/actions/messageAction";
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
  unsendMessagesAction,
}) => {
  const [messageList, setMessageList] = useState([]);
  useEffect(() => {
    setMessageList(messages);

    // setNotificationConversationIdAction(route.params.conversationId);
  }, [messages]);

  const conversationId = route.params.conversationId;

  //Check later
  // messages = messages.filter((msg) => msg.conversation_id === conversationId);

  const contact = route.params.contact;
  const currentUserId = route.params.currentUserId;

  const message_unsend = (msg_id, conversation_id) => {
    unsendMessagesAction(msg_id, conversation_id);
    const removeMessage = messageList.filter((msg) => msg._id !== msg_id);
    setMessageList(removeMessage);
  };
  const onLongPress = (ctx, currentMessage) => {
    if (currentUserId === currentMessage.user._id) {
      const options = ["Copy", "Unsend", "Delete", "Cancel"];
      const cancelButtonIndex = options.length - 1;
      ctx.actionSheet().showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        (buttonIndex) => {
          switch (buttonIndex) {
            case 0:
              Clipboard.setString(currentMessage.text);
              break;
            case 1:
              message_unsend(
                currentMessage._id,
                currentMessage.conversation_id
              );

              break;
            case 2:
              alert("delete");
              break;
            default:
              break;
          }
        }
      );
    } else {
      const options = ["Copy", "Delete", "Cancel"];
      const cancelButtonIndex = options.length - 1;
      ctx.actionSheet().showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        (buttonIndex) => {
          switch (buttonIndex) {
            case 0:
              Clipboard.setString(currentMessage.text);
              break;

            case 1:
              alert("delete");
              break;
            default:
              break;
          }
        }
      );
    }
  };
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
      messages={messageList}
      onSend={(messages) => onSend(messages)}
      renderUsernameOnMessage
      onLongPress={(ctx, message) => onLongPress(ctx, message)}
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
  unsendMessagesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(messageScreen);
