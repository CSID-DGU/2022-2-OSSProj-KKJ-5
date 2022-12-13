import { Box, Grid } from "@mui/material";
import { MenuBar } from "../components/commons/menu-bar";

export const Mypage = () => {
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

      {/* result Grid */}
      <Grid
        item
        lg={11}
        md={10}
        sm={10}
        xs={10}
        container
        direction={"column"}
        border={"1px solid black"}
      ></Grid>
    </Grid>
  );
};
