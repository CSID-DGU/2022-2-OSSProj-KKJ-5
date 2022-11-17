import { CompatClient, Stomp } from "@stomp/stompjs";
import axios from "axios";
import SockJS from "sockjs-client";

interface IHandleChatProps {
  client: CompatClient;
  sender: string;
  name: string;
  message: string;
  roomId: string;
  setChatMessage: (message: string) => void;
  setChatName: (name: string) => void;
  setIsChat: (isChat: boolean) => void;
  deleteMessage: () => void;
}
export const useHandleChat = ({
  client,
  sender,
  name,
  message,
  roomId,
  setChatMessage,
  setChatName,
  setIsChat,
  deleteMessage,
}: IHandleChatProps) => {
  const sendHandler = () => {
    client.send(
      "/pub/chat/message",
      {
        Authorization: axios.defaults.headers.common["Authorization"],
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

  const connectHandler = () => {
    client = Stomp.over(() => {
      const sock = new SockJS("http://localhost:8080/ws-stomp");
      return sock;
    });
    client.connect(
      {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
      () => {
        client.subscribe(
          `/sub/chat/room/1`,

          (message) => {
            setChatMessage(message.body);
          },
          { sender: sender }
        );
      }
    );

    setChatName(name);
    setIsChat(true);
  };

  return { sendHandler, connectHandler };
};
