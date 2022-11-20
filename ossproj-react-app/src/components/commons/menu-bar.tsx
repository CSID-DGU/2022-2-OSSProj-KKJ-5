import { Box, Grid } from "@mui/material";
import { ChatButton } from "./chat-button";
import { HomeButton } from "./home-button";
import { MyPageButton } from "./mypage-button";

export const MenuBar = () => {
  return (
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
        justifyContent={"center"}
        alignItems={"center"}
      >
        <HomeButton />
        <ChatButton />
        <MyPageButton />
      </Box>
    </Grid>
  );
};
