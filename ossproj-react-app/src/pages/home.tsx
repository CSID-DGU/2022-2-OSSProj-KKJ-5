import {
  Box,
  Grid,
  IconButton,
  InputBase,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { type } from "os";
import { Fade, Bounce } from "react-awesome-reveal";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuButton } from "../components/commons/menu-button";
import { UrlInput } from "../components/home/url-input";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { UrlBox } from "../components/home/url-box";
import ChatIcon from "@mui/icons-material/Chat";
import { useUserState } from "../context/user-context";
import { ChatButton } from "../components/commons/chat-button";
import { MyPageButton } from "../components/commons/mypage-button";
import { HomeButton } from "../components/commons/home-button";
import { MenuBar } from "../components/commons/menu-bar";

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
      <MenuBar />
      {/* main grid */}
      <Grid
        item
        lg={11}
        md={10}
        sm={11}
        xs={11}
        container
        direction={"column"}
        border={"1px solid black"}
        borderRadius={"0 30px 30px 0"}
      >
        {/* title grid */}
        <Grid
          lg={4}
          md={4}
          sm={4}
          xs={4}
          item
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Bounce>
            <Typography
              fontFamily={"bitbit"}
              fontSize={{ lg: "140px", md: "90px", sm: "65px", xs: "50px" }}
              variant={"h1"}
            >
              {"URL SUMMARY"}
            </Typography>
            {/* <h1 style={{ fontSize: "130px" }}>{"URL SUMMARY"}</h1> */}
          </Bounce>
        </Grid>
        {/* input grid */}
        <Grid
          lg={3}
          md={3}
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
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};
