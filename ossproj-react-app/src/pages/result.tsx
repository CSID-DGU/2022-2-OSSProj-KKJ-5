import { Box, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MenuBar } from "../components/commons/menu-bar";
import { useSummaryContent } from "../hooks/use-summary-url";
import wordcloud from "../assets/wordcloud.png";
import network from "../assets/network.png";
export const Result = () => {
  const { search } = useLocation();
  const query = search.split("url=");
  const { summaryHandler, data } = useSummaryContent({ url: query[1] });
  console.log(query[1]);

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
      // bgcolor={"#e5e5e5"}
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
        <Grid
          item
          lg={1}
          md={1}
          sm={1}
          xs={1}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box
            width={"90%"}
            height={"50%"}
            //  border={"1px solid black"}
          >
            <a href={data?.url}>
              <Typography>{data?.url}</Typography>
            </a>
          </Box>
        </Grid>
        {/* image grid */}
        <Grid item lg={8} md={8} sm={7} xs={7} border={"1px solid black"}>
          <Box
            sx={{ overflowY: "scroll" }}
            width={"100%"}
            height={"50vh"}
            display={"flex"}
            flexDirection={{ lg: "row", md: "row", sm: "column", xs: "column" }}
            alignItems={"center"}
            justifyContent={"space-around"}
          >
            <Box
              width={{ lg: "40%", md: "40%", sm: "90%", xs: "90%" }}
              height={"90%"}
              // border={"1px solid black"}
            >
              <img src={wordcloud} width={"100%"} height={"100%"} />
            </Box>
            <Box
              width={{ lg: "40%", md: "40%", sm: "90%", xs: "90%" }}
              height={"90%"}
              // border={"1px solid black"}
            >
              <img src={network} width={"100%"} height={"100%"} />
            </Box>
          </Box>
        </Grid>
        {/* text grid */}
        <Grid
          item
          lg={3}
          md={3}
          sm={3}
          xs={3}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box
            width={"90%"}
            height={"80%"}
            //  border={"1px solid black"}
          >
            {data?.content}
            {/* <Typography>{"sadfsafasdfasdfasdfasdfasdfsfsfsd"}</Typography> */}
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};
