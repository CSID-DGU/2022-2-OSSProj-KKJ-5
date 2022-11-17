import { Box, Grid, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { MessageInput } from "../components/chat/message-input";
import { useCreateRoom } from "../hooks/use-create-room";
import { CreateRoomDialog } from "../components/chat/create-room-dialog";
import zang from "../assets/zang.png";
import bobobo from "../assets/bobobo.png";
import face from "../assets/face.png";
import { RoomListBox } from "../components/chat/room-list-box";
import { FloatingButton } from "../components/chat/floating-button";
import defaultImg from "../assets/defaultImg.png";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IChatDetail, IRoomProps } from "../interface/chat";
import { MenuButton } from "../components/commons/menu-button";
import ChatEntity from "../entity/Chat";
import { CompatClient, Stomp } from "@stomp/stompjs";
import { useRefresh } from "../hooks/use-refresing";
import { useNavigate } from "react-router-dom";
import { useConnectChat } from "../hooks/use-connect-chat";
import { useSendMessage } from "../hooks/use-send-message";
import { ChatMessageList } from "../components/chat/chat-message-list";
import { useHandleInputMessage } from "../hooks/use-handle-message";
import { useHandleChat } from "../hooks/use-handle-chat";
import { connect } from "http2";
import { useHandleImage } from "../hooks/use-handle-image";
import axios from "axios";

const ROOM_SEQ = 1;
export const Chat = () => {
  const client = useRef<CompatClient>();
  const navigate = useNavigate();
  const [chatMessages, setChatMessages] = useState<IChatDetail[]>([
    {
      type: "ENTER",
      roomId: "sdf",
      sender: "scdf",
      message: "kim 입장",
    },
  ]);
  const [roomName, setRoomName] = useState("");
  const [chatName, setChatName] = useState("");
  const [open, setOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [mockRoomList, setMockRoomList] = useState<IRoomProps[]>([
    { name: "1번방", roomId: 1, image: face },
    { name: "2번방", roomId: 2, image: zang },
    { name: "3번방", roomId: 3, image: bobobo },
  ]);
  const [isChat, setIsChat] = useState(false);
  const {
    imgForm,
    fileImage,
    saveFileImage,
    deleteFileImage,
    createImageForm,
  } = useHandleImage();

  const { inputMessage, handleInputMessage, handleDeleteInputMessage } =
    useHandleInputMessage();

  const handleRoomName = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  console.log(axios.defaults.headers.common["Authorization"]);
  const { createRoomHandler, data, isLoading, isSuccess } = useCreateRoom({
    imgForm: imgForm,
  });
  const { refreshHandler } = useRefresh();

  const { sendHandler, connectHandler } = useHandleChat({
    client: client.current!,
    sender: "kim",
    name: "1번방",
    message: inputMessage,
    roomId: "1",
    setChatMessage: setChatMessage,
    setChatName: setChatName,
    setIsChat: setIsChat,
    deleteMessage: handleDeleteInputMessage,
  });

  useEffect(() => {
    if (chatMessage) {
      setChatMessages(chatMessages.concat(JSON.parse(chatMessage)));
    }
  }, [chatMessage]);

  useEffect(() => {
    refreshHandler();
  }, []);

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
          <MenuButton
            onClick={() => {
              navigate("/");
            }}
          >
            <HomeIcon fontSize={"inherit"} />
          </MenuButton>
          <MenuButton
            onClick={() => {
              navigate("/mypage");
            }}
          >
            <AccountCircleIcon fontSize={"inherit"} />
          </MenuButton>
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
                  handleIsChat={connectHandler}
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
      <Grid item lg={8} md={7} sm={5} xs={5} container>
        {/* todo sm xs */}
        {isChat ? (
          <Grid item container direction={"column"} spacing={1}>
            {/* message Grid */}
            <Grid item lg={11} md={11} sm={10} xs={10}>
              {chatName}
              <Box border={`1px solid black`} height={`95%`} bgcolor={"white"}>
                <ChatMessageList chatMessages={chatMessages} />
              </Box>
            </Grid>
            {/* input grid */}
            <Grid item lg={1} md={1} sm={1} xs={1}>
              <MessageInput
                message={inputMessage}
                handleMessage={handleInputMessage}
                handleSend={sendHandler}
                handleDelete={handleDeleteInputMessage}
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
        createRoomHandler={createRoomHandler}
        img={fileImage === "" ? defaultImg : fileImage}
        handleImg={saveFileImage}
      />
    </Grid>
  );
};
