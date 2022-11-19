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
    client.send(
      "/pub/chat/message",
      {
        Authorization: token,
      },
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
    console.log(mockId);
    client = Stomp.over(() => {
      const sock = new SockJS("http://localhost:8080/ws-stomp");
      return sock;
    });
    client.connect(
      {
        Authorization: token,
      },
      () => {
        client.subscribe(
          `/sub/chat/room/${mockId}`,
          (message) => {
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
