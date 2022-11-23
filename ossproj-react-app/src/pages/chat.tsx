import { Box, Grid, TextField, Typography } from "@mui/material";
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
import { DevideButton } from "../components/chat/divide-button";
import { SearchButton } from "../components/chat/search-button";
import { SignInButton } from "../components/commons/sign-in-button";
import SockJS from "sockjs-client";
import axios from "axios";
import { ChatButton } from "../components/commons/chat-button";
import { MenuBar } from "../components/commons/menu-bar";

const ROOM_SEQ = 1;
export const Chat = () => {
  const client = useRef<CompatClient>();
  const token = axios.defaults.headers.common["Authorization"]?.toString();
  const user = useUserState();
  const navigate = useNavigate();
  const [chatMessageList, setChatMessageList] = useState<IChatDetail[]>([
    {
      type: "ENTER",
      roomId: "sdf",
      sender: "scdf",
      message: "",
    },
  ]);
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [chatName, setChatName] = useState("");
  const [open, setOpen] = useState(false);
  const [isChat, setIsChat] = useState(false);
  const [chatMessage, setChatMessage] = useState<IChatDetail>();
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
    imgForm: imgForm,
  });

  const { refreshHandler } = useRefresh();

  const messageEndRef = useRef<HTMLDivElement>(null);
  const scrollTomBottom = () => {
    if (window.innerWidth <= 375) {
      return;
    }
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const roomListEndRef = useRef<HTMLDivElement>(null);
  const scrollToListmBottom = () => {
    if (window.innerWidth <= 375) {
      return;
    }
    roomListEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollTomBottom();
  }, [chatMessageList]);
  useEffect(() => {
    scrollToListmBottom();
  }, [user]);

  const sendHandler = () => {
    console.log("room Id:" + roomId);
    client.current!.send(
      "/pub/chat/message",
      {},
      JSON.stringify({
        type: "TALK",
        roomId: 123,
        sender: user.name,
        message: inputMessage,
      })
    );
    handleDeleteInputMessage();
  };

  const connectHandler = (mockId: string, mockName: string) => {
    client.current = Stomp.over(() => {
      const sock = new SockJS("http://localhost:8080/ws-stomp");
      return sock;
    });
    console.log(client);
    console.log(mockId);
    console.log(chatMessageList);
    client.current.connect(
      {
        Authorization: token,
      },
      () => {
        client.current!.subscribe(
          // `/sub/chat/room/${mockId}`,
          `/sub/chat/room/123`,
          (message) => {
            setChatMessage(JSON.parse(message.body));
            // setChatMessageList([...chatMessageList, JSON.parse(message.body)]);
          },
          { Authorization: token ? token : "", simpDestination: mockId }
        );
      }
    );

    setChatName(mockName);
    setRoomId(mockId);
    setIsChat(true);
  };
  useEffect(() => {
    if (chatMessage) {
      setChatMessageList([...chatMessageList, chatMessage]);
    }
  }, [chatMessage]);
  useEffect(() => {
    refreshHandler();
  }, []);
  useEffect(() => {
    createImageForm();
    console.log(imgForm);
  }, [fileImage]);

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
      <MenuBar />
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
          <Box height={"100%"}>
            <Typography variant={"h3"} fontFamily={"bitbit"}>
              {"Chat"}
            </Typography>
            <RoomBoxList
              user={user}
              roomId={roomId}
              connectHandler={connectHandler}
              ref={roomListEndRef}
            />
          </Box>
        </Grid>
        <Grid item lg={2}>
          <FloatingButton handleOpen={handleOpen} />
          {/* <DevideButton /> */}
          <SearchButton />
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
        borderRadius={{
          lg: "0 30px 30px 0",
          md: "0 30px 30px 0",
          sm: "0 0 30px 30px",
          xs: "0 0 30px 30px",
        }}
        bgcolor={"white"}
      >
        {/* todo sm xs */}
        {isChat ? (
          <Grid item container direction={"column"} spacing={1}>
            {/* message Grid */}
            <Grid item lg={11} md={11} sm={10} xs={10}>
              {chatName}
              <Box
                border={`1px solid black`}
                height={`75vh`}
                sx={{ overflowY: "scroll" }}
              >
                <ChatMessageList chatMessages={chatMessageList} />
                <div ref={messageEndRef}></div>
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
