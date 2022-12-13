import { Box, Grid } from "@mui/material";
import { useUserState } from "../../context/user-context";
import { ChatButton } from "./chat-button";
import { HomeButton } from "./home-button";
import { MyPageButton } from "./mypage-button";
import { SigninButton } from "./signin-button";
import { SignoutButton } from "./signout-button";

interface IMenuBar {
  handler: () => void;
}
export const MenuBar = ({ handler }: IMenuBar) => {
  const user = useUserState();
  return (
    <Grid
      item
      lg={1}
      md={1}
      sm={1}
      xs={1}
      border={1}
      borderRadius={{
        lg: "30px 0 0 30px",
        md: "30px 0 0 30px",
        sm: "30px 30px 0 0",
        xs: "30px 30px 0 0",
      }}
      bgcolor={"#d3d3d3"}
    >
      <Box
        height={`100%`}
        width={`100%`}
        display={"flex"}
        flexDirection={{ lg: "column", md: "column", sm: "row", xs: "row" }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <HomeButton />
        <ChatButton />
        <SigninButton />
      </Box>
    </Grid>
  );
};
