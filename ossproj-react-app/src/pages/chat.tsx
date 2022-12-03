import { Box, Grid, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { MessageInput } from "../components/chat/message-input";
import { useCreateRoom } from "../hooks/use-create-room";
import { CreateRoomDialog } from "../components/chat/create-room-dialog";
import { FloatingButton } from "../components/chat/floating-button";
import defaultImg from "../assets/defaultImg.png";
import { IChatDetail } from "../interface/chat";
import { CompatClient, Stomp } from "@stomp/stompjs";
import { useRefresh } from "../hooks/use-refresing";
import { ChatMessageList } from "../components/chat/chat-message-list";
import { useHandleInputMessage } from "../hooks/use-handle-message";
import { useHandleImage } from "../hooks/use-handle-image";
import { useUserState } from "../context/user-context";
import { RoomBoxList } from "../components/chat/room-box-list";
import { SearchButton } from "../components/chat/search-button";
import SockJS from "sockjs-client";
import axios from "axios";
import { MenuBar } from "../components/commons/menu-bar";
import { useScrollChat } from "../hooks/use-scroll-chat";
import { useScrollList } from "../hooks/use-scroll-list";
import { SubTitle } from "../components/chat/sub-title";
import { ChatArea } from "../components/chat/chat-area";
import { DefaultChatArea } from "../components/chat/default-chat-area";

export const Chat = () => {
  const client = useRef<CompatClient>();
  const token = axios.defaults.headers.common["Authorization"]?.toString();
  const user = useUserState();
  const [chatMessageList, setChatMessageList] = useState<IChatDetail[]>([]);
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

  const { imageUrl, saveFileImage, deleteFileImage } = useHandleImage();
  const { inputMessage, handleInputMessage, handleDeleteInputMessage } =
    useHandleInputMessage();
  const { createRoomHandler, data, isLoading, isSuccess } = useCreateRoom({
    name: roomName,
    imageUrl: imageUrl,
    // pictureFile: fileImage!,
  });

  const { refreshHandler } = useRefresh();
  const { chatRef, scrollToChatBottom } = useScrollChat();
  const { listRef, scrollToListBottom } = useScrollList();

  useEffect(() => {
    scrollToChatBottom();
  }, [chatMessageList]);
  useEffect(() => {
    scrollToListBottom();
  }, [user]);

  useEffect(() => {
    if (chatMessage) {
      setChatMessageList([...chatMessageList, chatMessage]);
    }
  }, [chatMessage]);

  useEffect(() => {
    refreshHandler();
  }, []);

  const sendHandler = () => {
    console.log("room Id:" + roomId);
    client.current!.send(
      "/pub/chat/message",
      {},
      JSON.stringify({
        type: "TALK",
        roomId: roomId,
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
    client.current.connect(
      {
        Authorization: token,
      },
      // () => {
      (messageList: IChatDetail[]) => {
        setChatMessageList(messageList);
        client.current!.subscribe(
          `/sub/chat/room/${mockId}`,
          (message) => {
            setChatMessage(JSON.parse(message.body));
          },
          { Authorization: token ? token : "", simpDestination: mockId }
        );
      }
    );

    setChatName(mockName);
    setRoomId(mockId);
    setIsChat(true);
  };

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
      <Grid
        item
        container
        direction={"column"}
        position={"relative"}
        lg={3}
        md={3}
        sm={3}
        xs={3}
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
            <SubTitle text={"Chat"} />
            <RoomBoxList
              user={user}
              roomId={roomId}
              connectHandler={connectHandler}
              ref={listRef}
            />
          </Box>
        </Grid>
        <Grid item lg={2}>
          <FloatingButton handleOpen={handleOpen} />
          <SearchButton />
        </Grid>
      </Grid>
      {/* chatting room grid */}
      <Grid
        item
        lg={8}
        md={7}
        sm={8}
        xs={8}
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
            <ChatArea
              chatName={chatName}
              chatMessages={chatMessageList}
              ref={chatRef}
            />
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
          <DefaultChatArea />
        )}
      </Grid>
      <CreateRoomDialog
        roomName={roomName}
        open={open}
        handleRoomName={handleRoomName}
        handleClose={handleClose}
        createRoomHandler={createRoomHandler}
        handleDeleteRoomName={handleDeleteRoomName}
        img={!imageUrl ? defaultImg : imageUrl}
        handleImg={saveFileImage}
        deleteImg={deleteFileImage}
      />
    </Grid>
  );
};
