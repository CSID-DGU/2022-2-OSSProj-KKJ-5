import { Box, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MenuBar } from "../components/commons/menu-bar";
import { useSummaryContent } from "../hooks/use-summary-url";
import wordCloud from "../assets/wordcloud.png";
import cors from "/Users/kimjaehan/cors.png";
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
        sm={10}
        xs={10}
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
        <Grid
          item
          lg={8}
          md={8}
          sm={8}
          xs={8}
          border={"1px solid black"}
          sx={{ overflowY: "scroll" }}
        >
          <Box
            // sx={{ overflowY: "scroll" }}
            width={"100%"}
            height={"600px"}
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
              <img
                src={data?.wordCloudPath
                }
                width={"100%"}
                height={"100%"}
                alt={"src error"}
              />
            </Box>
            <Box
              width={{ lg: "40%", md: "40%", sm: "90%", xs: "90%" }}
              height={"90%"}
              // border={"1px solid black"}
            >
              <img
                src={
                  data?.networkGraphPath
                  // network
                }
                width={"100%"}
                height={"100%"}
                alt={"src error"}
              />
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
            height={"150px"}
            //  border={"1px solid black"}
            sx={{ overflowY: "scroll" }}
          >
            <Typography variant="body1" fontSize={"20px"}>
              {/* {
                "이날 손흥민은 후반 추가시간 상대 선수 다수를 끌고 돌파한 뒤 수비수 다리 사이로 슬쩍 패스해 황희찬의 역전골을 돕는 등 활약했다. 투혼도 빛났다. 손흥민은 경기 중 헤딩을 서슴지 않았고, 경기 막판에는 마스크를 손에 쥔 채로 질주했다. 부상 부위가 악화될 수 있는, 위험을 감수한 행동이었다.손흥민은 취재진을 만나 사실 (마스크를) 벗으면 안 된다며 이제 수술한 지 한 달 정도 된 것 같은데, 뼈가 붙는 데는 최소 석 달은 걸려 이제 실처럼 살짝 붙었다고 할 수 있는 상황이다. (하지만) 저는 이렇게 해야 하는 위치고, 제가 좋아서, 제가 해야 할 일이라고 생각해서 한 것이라고 말했다.그는 이어 이제 완전히 (마스크를) 벗고 경기를 해도 되는 건 아니다며 아직도 엄청난 리스크를 갖고 하는 거다. 좋아진 상태라고 생각하진 않지만, 조금이라도 가능성이 있다면 어떻게든 해야 하는 게 맞는 것 같다”고 덧붙였다."
              } */}
              {data?.content}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};
