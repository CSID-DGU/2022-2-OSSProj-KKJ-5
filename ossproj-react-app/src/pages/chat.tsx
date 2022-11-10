import { Directions } from "@mui/icons-material";
import { Box, Container, Grid } from "@mui/material";
import * as StompJs from "@stomp/stompjs";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { MessageInput } from "../components/chat/message-input";

const ROOM_SEQ = 1;

export const Chat = () => {
  const client = useRef<StompJs.Client>();
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const handleMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const handleDelete = () => {
    setMessage("");
  };
  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: "ws://localhost:8080/ws-stomp", // 웹소켓 서버로 직접 접속
      //   webSocketFactory: () => new SockJS("/ws-stomp"), // proxy를 통한 접속
      connectHeaders: {
        "auth-token": "spring-chat-auth-token",
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        subscribe();
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });

    client.current.activate();
  };
  const disconnect = () => {
    if (client.current?.deactivate) {
      client.current.deactivate();
    }
  };

  const subscribe = () => {
    client.current!.subscribe(`/sub/chat/${ROOM_SEQ}`, ({ body }) => {
      setChatMessages([...chatMessages, JSON.parse(body)]);
    });
  };

  const publish = () => {
    if (!client.current!.connected) {
      return;
    }

    client.current!.publish({
      destination: "/pub/chat",
      body: JSON.stringify({ roomSeq: ROOM_SEQ, message }),
    });

    setMessage("");
  };

  return (
    <Grid
      container
      height={`100vh`}
      paddingTop={`50px`}
      paddingLeft={`100px`}
      paddingRight={`50px`}
      paddingBottom={`100px`}
      spacing={2}
      direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
    >
      {/* {chatMessages && chatMessages.length > 0 && (
        <ul>
        {chatMessages.map((_chatMessage, index) => (
          <li key={index}>{_chatMessage}</li>
          ))}
          </ul>
          )}
        <div> */}
      {/* 메뉴 grid */}
      <Grid item lg={1} md={1} sm={1} xs={1}>
        <Box border={`1px solid black`} height={`100%`} width={`100%`}></Box>
      </Grid>
      {/* room list grid */}
      <Grid item lg={3} md={3} sm={2} xs={2}>
        <Box border={`1px solid black`} height={`100%`} width={`100%`}></Box>
      </Grid>
      {/* chatting room grid */}
      <Grid item lg={8} md={8} sm={9} xs={9} container>
        <Grid item container direction={"column"} spacing={1}>
          {/* message Grid */}
          <Grid item lg={11} md={11} sm={9} xs={8}>
            <Box border={`1px solid black`} height={`100%`}></Box>
          </Grid>
          {/* input grid */}
          <Grid item lg={1} md={1} sm={1} xs={1}>
            <MessageInput
              message={message}
              handleMessage={handleMessage}
              handleSend={publish}
              handleDelete={handleDelete}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
