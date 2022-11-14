import { Box, Button, Grid, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { MessageInput } from "../components/chat/message-input";
import { useCreateRoom } from "../hooks/use-create-room";
import { CreateRoomDialog } from "../components/chat/create-room-dialog";
import zang from "../assets/zang.png";
import bobobo from "../assets/bobobo.png";
import face from "../assets/face.png";
import { RoomListBox } from "../components/chat/room-list-box";
import { FloatingButton } from "../components/chat/floating-button";
import { MessageBox } from "../components/chat/message-box";
import { Stomp } from "@stomp/stompjs";
import { ConstructionOutlined } from "@mui/icons-material";
import { MessageSendButton } from "../components/chat/message-send-button";
import { useFetchRooms } from "../hooks/use-fetch-rooms";
import defaultImg from "../assets/defaultImg.png";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IRoomProps } from "../interface/chat";
import { MenuButton } from "../components/commons/menu-button";
import SockJS from "sockjs-client";
import axios from "axios";

const ROOM_SEQ = 1;

export const Chat = () => {
  // const client = useRef<StompJs.Client>();
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [roomName, setRoomName] = useState("");
  const [chatName, setChatName] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [imgForm, setImgForm] = useState(new FormData());

  const [mockRoomList, setMockRoomList] = useState<IRoomProps[]>([
    { name: "1번방", roomId: 1, image: face },
    { name: "2번방", roomId: 2, image: zang },
    { name: "3번방", roomId: 3, image: bobobo },
  ]);
  const [isChat, setIsChat] = useState(false);

  const [fileImage, setFileImage] = useState("");

  const saveFileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setFileImage(URL.createObjectURL(event.target.files[0]));
  };
  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage("");
  };

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

  const { createRoomHandler, data, isLoading, isSuccess } = useCreateRoom({
    imgForm: imgForm,
  });

  const onCreate = () => {
    let formData = new FormData();

    formData.append("file", fileImage);

    let variables = [
      {
        title: roomName,
      },
    ];

    formData.append(
      "data",
      new Blob([JSON.stringify(variables)], { type: "application/json" })
    );

    setImgForm(formData);
  };

  // const { roomList, isLoadingRoom, updateRoomList } = useFetchRooms();
  // useEffect(() => {
  //   if (roomList) setMockRoomList(roomList);
  // }, [isLoadingRoom]);

  const client = Stomp.over(() => {
    let sock = new SockJS("http://localhost:8080/ws-stomp");
    sock.binaryType = "arraybuffer";
    return sock;
  });
  // console.log(client);
  console.log(axios.defaults.headers.common["Authorization"]);
  const connect = () => {
    client.connect(
      {
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDgwMSIsImlhdCI6MTU1MTY2NzA0NCwiZXhwIjoxNTUxNjY4ODQ0fQ.Ncqvem4RlCwITDgFvT3GPvTcQNsSeysR1SYkGi4PVSpqkxFHDQt4liJGfO0SYMLTOD90zHC0vX47wT0WROE6dQ",
        // axios.defaults.headers.common["Authorization"]
      },
      () => {
        client.subscribe(`sub/chat/room/1`, (response) => {
          console.log(response);
          console.log(JSON.parse(response.body));
          console.log(client);
        });
      }
    );
  };

  const sendMessage = () => {
    client.send(
      "/pub/chat/message",
      {},
      JSON.stringify({
        type: "ENTER",
        roomId: "1",
        sender: "김재한",
        message: "fsda",
      })
    );
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
      bgcolor={"#e5e5e5"}
      direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
    >
      {/* 메뉴 grid */}
      <Grid item lg={1} md={1} sm={1} xs={1}>
        <Box
          border={`1px solid black`}
          height={`100%`}
          width={`100%`}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
          <MenuButton onClick={() => {}}>
            <HomeIcon fontSize={"inherit"} />
          </MenuButton>
          <MenuButton onClick={() => {}}>
            <AccountCircleIcon fontSize={"inherit"} />
          </MenuButton>
          <Button onClick={connect}>연결</Button>
          <Button onClick={sendMessage}>보내기</Button>
        </Box>
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
          <Grid item>
            <TextField
              sx={{ bgcolor: "white" }}
              fullWidth
              placeholder="채팅방 찾기"
            />
          </Grid>
          {mockRoomList.map((room) => {
            return (
              <Grid item key={room.roomId}>
                <RoomListBox
                  roomName={room.name}
                  roomId={room.roomId}
                  img={room.image}
                  user={""}
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
              <Box border={`1px solid black`} height={`95%`} bgcolor={"white"}>
                <Grid item display={"flex"} justifyContent={"flex-start"}>
                  <MessageBox message={"안녕"} user={"김재한"} isUser={false} />
                </Grid>
                <Grid item display={"flex"} justifyContent={"flex-end"}>
                  <MessageBox message={"안녕"} user={"kim"} isUser={true} />
                </Grid>
                <Grid item display={"flex"} justifyContent={"flex-end"}>
                  <MessageBox
                    message={"오픈소스 프로젝트 팀 방입니다"}
                    user={"kim"}
                    isUser={true}
                  />
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
        img={fileImage === "" ? defaultImg : fileImage}
        handleImg={saveFileImage}
      />
    </Grid>
  );
};
