import { Box, Grid } from "@mui/material";
import { Bounce } from "react-awesome-reveal";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UrlInput } from "../components/home/url-input";
import { useUserState } from "../context/user-context";
import { MenuBar } from "../components/commons/menu-bar";
import { MainTitle } from "../components/home/main-title";

export const Home = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const user = useUserState();
  const handleUrl = (e: ChangeEvent<HTMLInputElement>) =>
    setUrl(e.target.value);
  const handleDelete = () => {
    setUrl("");
  };

  const handleSummary = () => {
    navigate({
      pathname: "/result",
      search: `?url=${url}`,
    });
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
            <MainTitle text={"URL SUMMARY"} />
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
            onClick={handleSummary}
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
