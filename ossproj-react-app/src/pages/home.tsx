import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { Bounce } from "react-awesome-reveal";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UrlInput } from "../components/home/url-input";
import { useUserState } from "../context/user-context";
import { MenuBar } from "../components/commons/menu-bar";
import { MainTitle } from "../components/home/main-title";
import { useRefresh } from "../hooks/use-refresing";
import { useFetchCategory } from "../hooks/use-fetch-category";
import { CategoryList } from "../components/home/category-list";
import { padding } from "@mui/system";

export const Home = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const user = useUserState();
  const [category, setCategory] = useState("politics");
  const handleUrl = (e: ChangeEvent<HTMLInputElement>) =>
    setUrl(e.target.value);
  const handleDelete = () => {
    setUrl("");
  };
  const { refreshHandler } = useRefresh();

  const { categoryList, handleCategory } = useFetchCategory({
    category,
  });

  const handleSetCategory = (listItem: string) => {
    setCategory(listItem);
  };

  useEffect(() => {
    handleCategory();
  }, [category]);

  useEffect(() => {
    refreshHandler();
  }, []);

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
        <Grid
          item
          container
          lg={5}
          md={5}
          sm={5}
          xs={5}
          direction={"column"}
          textAlign={"center"}
        >
          <CategoryList handleCategory={handleSetCategory} />
          <Grid
            item
            lg={10}
            md={10}
            sm={10}
            xs={10}
            display={"flex"}
            alignItems={"center"}
          >
            <Card sx={{ width: "30vh", height: "25vh", margin: "10px" }}>
              <CardContent>
                <Typography fontSize={"20px"}>
                  {"url: https://mui.com/material-ui/react-card/"}
                </Typography>
                <Typography fontSize={"30px"}>
                  {"미국 나파밸리 와인 업계의 전설로 불리는 더그 ..."}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ width: "30vh", height: "25vh", margin: "10px" }}>
              <CardContent>
                <Typography fontSize={"20px"}>
                  {"url: https://mui.com/material-ui/react-card/"}
                </Typography>
                <Typography fontSize={"30px"}>
                  {"미국 나파밸리 와인 업계의 전설로 불리는 더그 ..."}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
