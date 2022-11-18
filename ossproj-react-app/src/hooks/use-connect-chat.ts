import { CompatClient, Stomp } from "@stomp/stompjs";
import axios from "axios";
import SockJS from "sockjs-client";

interface IConncetChat {
  sender: string;
  client: CompatClient;
  name: string;
  setMessage: (message: string) => void;
  setChatName: (name: string) => void;
  setIsChat: (isChat: boolean) => void;
}
export const useConnectChat = ({
  sender,
  client,
  name,
  setMessage,
  setChatName,
  setIsChat,
}: IConncetChat) => {
  const token = axios.defaults.headers.common["Authorization"]?.toString();
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
        `/sub/chat/room/1`,

        (message) => {
          setMessage(message.body);
        },
        { Authorization: token ? token : "" }
      );
    }
  );

  setChatName(name);
  setIsChat(true);
};
