import { Box, Grid } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { MessageInput } from "../components/chat/message-input";
import { useCreateRoom } from "../hooks/use-create-room";
import { CreateRoomDialog } from "../components/chat/create-room-dialog";

import face from "../assets/face.png";
import { RoomListBox } from "../components/chat/room-list-box";
import { FloatingButton } from "../components/chat/floating-button";
import { MessageBox } from "../components/chat/message-box";
import { Stomp } from "@stomp/stompjs";
import { ConstructionOutlined } from "@mui/icons-material";
import { MessageSendButton } from "../components/chat/message-send-button";

const ROOM_SEQ = 1;

export const Chat = () => {
  // const client = useRef<StompJs.Client>();
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [roomName, setRoomName] = useState("");
  const [chatName, setChatName] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [mockRoomList, setMockRoomList] = useState([
    { roomName: "1번방", roomId: 1, img: face, user: "kim" },
    { roomName: "2번방", roomId: 2, img: face, user: "kim" },
    { roomName: "3번방", roomId: 3, img: face, user: "kim" },
  ]);
  const [isChat, setIsChat] = useState(false);

  const handleMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const handleDelete = () => {
    setMessage("");
  };
  const handleRoomName = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleIsChat = (id: string) => {
    setChatName(id);
    setIsChat(true);
  };
  const { createRoomHandler, isLoading, isSuccess } = useCreateRoom({
    roomName: roomName,
  });

  // const client = Stomp.over(() => {
  //   new WebSocket("ws://localhost:8080/ws-stomp");
  // });
  // console.log(client);
  // client.connect({}, () => {
  //   client.subscribe(`topic/${ROOM_SEQ}`, (response) => {
  //     console.log(response);
  //     console.log(JSON.parse(response.body));
  //   });
  // });
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
      {/* 메뉴 grid */}
      <Grid item lg={1} md={1} sm={1} xs={1}>
        <Box border={`1px solid black`} height={`100%`} width={`100%`}></Box>
      </Grid>
      {/* room list grid */}
      {/* todo reverse list */}
      <Grid
        item
        container
        direction={"column"}
        position={"relative"}
        lg={3}
        md={3}
        sm={2}
        xs={2}
      >
        <Grid item container direction={"column"} lg={10} spacing={2}>
          {mockRoomList.map((room) => {
            return (
              <Grid item>
                <RoomListBox
                  roomName={room.roomName}
                  roomId={room.roomId}
                  img={room.img}
                  user={room.user}
                  handleIsChat={handleIsChat}
                  // todo sub, pub
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid item lg={2}>
          <FloatingButton handleOpen={handleOpen} />
        </Grid>
      </Grid>
      {/* chatting room grid */}
      <Grid item lg={8} md={8} sm={5} xs={5} container>
        {/* todo sm xs */}
        {isChat ? (
          <Grid item container direction={"column"} spacing={1}>
            {/* message Grid */}
            <Grid item lg={11} md={11} sm={9} xs={8}>
              {chatName}
              <Box border={`1px solid black`} height={`95%`}>
                <Grid item>
                  <MessageBox message={"안녕"} user={"kim"} isUser={false} />
                </Grid>
                <Grid item display={"flex"} justifyContent={"flex-end"}>
                  <MessageBox message={"안녕"} user={"kim"} isUser={true} />
                </Grid>
              </Box>
            </Grid>
            {/* input grid */}
            <Grid item lg={1} md={1} sm={1} xs={1}>
              <MessageInput
                message={message}
                handleMessage={handleMessage}
                handleSend={() => {}}
                handleDelete={handleDelete}
              />
            </Grid>
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
      <CreateRoomDialog
        roomName={roomName}
        open={open}
        handleRoomName={handleRoomName}
        handleClose={handleClose}
        createRoomHandler={
          createRoomHandler
          // () => {
          //   setMockRoomList([
          //     ...mockRoomList,
          //     { roomName: "1번방", roomId: 1, img: face, user: "kim" },
          //   ]);
          // }
        }
      />
    </Grid>
  );
};
