import { Box, Grid } from "@mui/material";
import { MenuBar } from "../components/commons/menu-bar";

export const Result = () => {
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
      {/* result Grid */}
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
        {/* image grid */}
        <Grid item lg={8} md={8} sm={8} xs={8} border={"1px solid black"}>
          <Box
            sx={{ overflowY: "scroll" }}
            width={"100%"}
            height={"55vh"}
            display={"flex"}
            flexDirection={{ lg: "row", md: "row", sm: "column", xs: "column" }}
            alignItems={"center"}
            justifyContent={"space-around"}
          >
            <Box
              width={{ lg: "40%", md: "40%", sm: "90%", xs: "90%" }}
              height={"90%"}
              border={"1px solid black"}
            ></Box>
            <Box
              width={{ lg: "40%", md: "40%", sm: "90%", xs: "90%" }}
              height={"90%"}
              border={"1px solid black"}
            ></Box>
          </Box>
        </Grid>
        {/* text grid */}
        <Grid
          item
          lg={4}
          md={4}
          sm={4}
          xs={4}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box width={"90%"} height={"80%"} border={"1px solid black"}>
            {
              "asdfjklfasksadkdfsakla;jsfdkljfdsk;jflddfsakjfdsajkljafdlkfdkljafddjakl;"
            }
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};
