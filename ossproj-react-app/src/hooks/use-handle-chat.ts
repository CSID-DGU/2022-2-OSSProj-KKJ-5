import { AirlineSeatLegroomExtraOutlined } from "@mui/icons-material";
import { CompatClient, Stomp } from "@stomp/stompjs";
import axios from "axios";
import { useState } from "react";
import SockJS from "sockjs-client";
import { IChatDetail } from "../interface/chat";

interface IHandleChatProps {
  client: CompatClient;
  sender: string;
  name: string;
  message: string;
  roomId: string;
  chatMessages: IChatDetail[];
  setChatMessageList: (message: IChatDetail[]) => void;
  setRoomId: (roomId: string) => void;
  setChatName: (name: string) => void;
  setIsChat: (isChat: boolean) => void;
  deleteMessage: () => void;
}
export const useHandleChat = ({
  client,
  sender,
  name,
  chatMessages,
  message,
  roomId,
  setChatMessageList,
  setRoomId,
  setChatName,
  setIsChat,
  deleteMessage,
}: IHandleChatProps) => {
  const token = axios.defaults.headers.common["Authorization"]?.toString();
  const sendHandler = () => {
    console.log("room Id:" + roomId);
    console.log(sender);
    console.log(message);
    console.log(client);
    client.send(
      "/pub/chat/message",
      {},
      JSON.stringify({
        type: "TALK",
        roomId: roomId,
        sender: sender,
        message: message,
      })
    );
    deleteMessage();
  };

  const connectHandler = (mockId: string, mockName: string) => {
    console.log(client);
    console.log(mockId);
    client.connect(
      {
        Authorization: token,
      },
      () => {
        client.subscribe(
          `/sub/chat/room/${mockId}`,
          (message) => {
            console.log(message.body);
            setChatMessageList(chatMessages.concat(JSON.parse(message.body)));
          },
          { Authorization: token ? token : "", simpDestination: mockId }
        );
      }
    );

    setChatName(mockName);
    setRoomId(mockId);
    setIsChat(true);
  };

  return { sendHandler, connectHandler };
};
