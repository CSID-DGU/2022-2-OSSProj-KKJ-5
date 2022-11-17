import {
  Box,
  Grid,
  IconButton,
  InputBase,
  Paper,
  TextField,
} from "@mui/material";
import { type } from "os";

import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuButton } from "../components/commons/menu-button";
import { UrlInput } from "../components/home/url-input";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Typography } from "@material-ui/core";

export const Home = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");

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
      spacing={2}
      bgcolor={"#e5e5e5"}
      direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
    >
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
      <Grid item lg={11} md={11} sm={11} xs={11} container direction={"column"}>
        <Grid lg={4} md={4} sm={3} xs={3} item textAlign={"center"}>
          {/* <Typography variant={"h1"}>{"url summary"}</Typography> */}

          <h1 style={{ fontSize: "150px" }}>{"URL SUMMARY"}</h1>
        </Grid>
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
      </Grid>
    </Grid>
  );
};
