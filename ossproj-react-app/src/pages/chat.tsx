import { Box, Grid, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { MessageInput } from "../components/chat/message-input";
import { useCreateRoom } from "../hooks/use-create-room";
import { CreateRoomDialog } from "../components/chat/create-room-dialog";
import zang from "../assets/zang.png";
import bobobo from "../assets/bobobo.png";
import face from "../assets/face.png";
import { RoomBox } from "../components/chat/room-box";
import { FloatingButton } from "../components/chat/floating-button";
import defaultImg from "../assets/defaultImg.png";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IChatDetail, IRoomProps } from "../interface/chat";
import { MenuButton } from "../components/commons/menu-button";
import { CompatClient, Stomp } from "@stomp/stompjs";
import { useRefresh } from "../hooks/use-refresing";
import { useNavigate } from "react-router-dom";
import { ChatMessageList } from "../components/chat/chat-message-list";
import { useHandleInputMessage } from "../hooks/use-handle-message";
import { useHandleChat } from "../hooks/use-handle-chat";
import { useHandleImage } from "../hooks/use-handle-image";
import { useUserState } from "../context/user-context";
import { HomeButton } from "../components/commons/home-button";
import { MyPageButton } from "../components/commons/mypage-button";
import { RoomBoxList } from "../components/chat/room-box-list";
import { connect } from "http2";

const ROOM_SEQ = 1;
export const Chat = () => {
  const client = useRef<CompatClient>();
  const user = useUserState();
  const navigate = useNavigate();
  const [chatMessageList, setChatMessageList] = useState<IChatDetail[]>([
    {
      type: "ENTER",
      roomId: "sdf",
      sender: "scdf",
      message: "kim 입장",
    },
  ]);
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [chatName, setChatName] = useState("");
  const [open, setOpen] = useState(false);
  const [isChat, setIsChat] = useState(false);

  const handleDeleteRoomName = () => {
    setRoomName("");
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

  const {
    imgForm,
    fileImage,
    saveFileImage,
    deleteFileImage,
    createImageForm,
  } = useHandleImage();
  const { inputMessage, handleInputMessage, handleDeleteInputMessage } =
    useHandleInputMessage();
  const { createRoomHandler, data, isLoading, isSuccess } = useCreateRoom({
    name: roomName,
    image: "test image",
  });

  const { refreshHandler } = useRefresh();
  const { sendHandler, connectHandler } = useHandleChat({
    client: client.current!,
    sender: user.name,
    name: "1번방",
    message: inputMessage,
    roomId: roomId,
    chatMessages: chatMessageList,
    setChatMessageList: setChatMessageList,
    setRoomId: setRoomId,
    setChatName: setChatName,
    setIsChat: setIsChat,
    deleteMessage: handleDeleteInputMessage,
  });

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
      bgcolor={"#e8e8e8"}
      direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
    >
      {/* 메뉴 grid */}
      <Grid
        item
        lg={1}
        md={1}
        sm={1}
        xs={1}
        border={1}
        borderRadius={"30px 0 0 30px"}
        bgcolor={"#d3d3d3"}
      >
        <Box
          height={`100%`}
          width={`100%`}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
          <HomeButton />
          <MyPageButton />
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
        border={1}
      >
        <Grid
          item
          container
          direction={"column"}
          lg={10}
          spacing={2}
          padding={"0 30px"}
        >
          <Grid item>
            <h1>{"Chat"}</h1>
          </Grid>
          <Grid item display={"flex"} justifyContent={"center"}>
            <TextField
              sx={{ bgcolor: "white" }}
              fullWidth
              placeholder="채팅방 찾기"
            />
          </Grid>
          <RoomBoxList
            user={user}
            roomId={roomId}
            connectHandler={connectHandler}
          />
        </Grid>
        <Grid item lg={2}>
          <FloatingButton handleOpen={handleOpen} />
        </Grid>
      </Grid>
      {/* chatting room grid */}
      <Grid
        item
        lg={8}
        md={7}
        sm={5}
        xs={5}
        container
        border={1}
        borderRadius={"0 30px 30px 0"}
        bgcolor={"white"}
      >
        {/* todo sm xs */}
        {isChat ? (
          <Grid item container direction={"column"} spacing={1}>
            {/* message Grid */}
            <Grid item lg={11} md={11} sm={10} xs={10}>
              {chatName}
              <Box border={`1px solid black`} height={`95%`}>
                <ChatMessageList chatMessages={chatMessageList} />
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
          <Box width={"100%"} height={"100%"}>
            {"chatting Room"}
          </Box>
        )}
      </Grid>
      <CreateRoomDialog
        roomName={roomName}
        open={open}
        handleRoomName={handleRoomName}
        handleClose={handleClose}
        createRoomHandler={createRoomHandler}
        handleDeleteRoomName={handleDeleteRoomName}
        img={fileImage === "" ? defaultImg : fileImage}
        handleImg={saveFileImage}
      />
    </Grid>
  );
};
