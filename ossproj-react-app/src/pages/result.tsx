import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MenuBar } from "../components/commons/menu-bar";
import { useSummaryContent } from "../hooks/use-summary-url";

export const Result = () => {
  const { search } = useLocation();
  const query = search.split(/[=,&]/)[1];
  const { summaryHandler, data } = useSummaryContent({ url: query });

  useEffect(() => {
    summaryHandler();
  }, []);

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
        <Grid item lg={1} md={1} sm={1} xs={1}>
          {data?.url}
        </Grid>
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
            >
              {data?.image}
            </Box>
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
          lg={3}
          md={3}
          sm={4}
          xs={4}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box width={"90%"} height={"80%"} border={"1px solid black"}>
            {data?.content}
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};
