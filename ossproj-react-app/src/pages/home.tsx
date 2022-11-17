import {
  Box,
  Grid,
  IconButton,
  InputBase,
  Paper,
  TextField,
} from "@mui/material";
import { type } from "os";
import { Fade, Bounce } from "react-awesome-reveal";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuButton } from "../components/commons/menu-button";
import { UrlInput } from "../components/home/url-input";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Typography } from "@material-ui/core";
import { UrlBox } from "../components/home/url-box";
import ChatIcon from "@mui/icons-material/Chat";
import { useUserState } from "../context/user-context";
import { ChatButton } from "../components/commons/chat-button";
import { MyPageButton } from "../components/commons/mypage-button";

export const Home = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const user = useUserState();
  const handleUrl = (e: ChangeEvent<HTMLInputElement>) =>
    setUrl(e.target.value);
  const handleDelete = () => {
    setUrl("");
  };

  return (
    <Grid
      container
      height={`100vh`}
      paddingTop={`50px`}
      paddingLeft={`100px`}
      paddingRight={`50px`}
      paddingBottom={`100px`}
      bgcolor={"#e5e5e5"}
      direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
    >
      {/* menu grid */}
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
          <ChatButton />

          <MyPageButton />
        </Box>
      </Grid>
      {/* main grid */}
      <Grid item lg={11} md={11} sm={11} xs={11} container direction={"column"}>
        {/* title grid */}
        <Grid lg={2} md={2} sm={3} xs={3} item textAlign={"center"}>
          <Bounce>
            <h1 style={{ fontSize: "130px" }}>{"URL SUMMARY"}</h1>
          </Bounce>
        </Grid>
        {/* input grid */}
        <Grid
          lg={2}
          md={2}
          sm={3}
          xs={3}
          item
          textAlign={"center"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <UrlInput
            url={url}
            handleUrl={handleUrl}
            handleDelete={handleDelete}
          />
        </Grid>
        <Grid item lg={5} md={5} sm={5} xs={5}>
          <Box sx={{ border: "1px solid black", height: "100%" }}>
            {"최근 내역"}
            <UrlBox
              name={"첫번째 url"}
              text={"오픈소스프로젝트"}
              url={"www.kkj.com"}
            />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};
