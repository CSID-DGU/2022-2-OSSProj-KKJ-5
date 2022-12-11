import { Card, CardContent, Typography } from "@mui/material";
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";

interface IUrlCategoryBox {
  url: string;
  content: string;
}
export const UrlCategoryBox = ({ url, content }: IUrlCategoryBox) => {
  const navigate = useNavigate();
  return (
    <Fade>
      <Card
        sx={{
          width: "30vh",
          height: "23vh",
          margin: "10px",
          boxhadow: "0px 3px 12px #00000029",
          padding: "10px",
          // backgroundColor: "#e5e5e5",
          wordBreak: "break-all",
        }}
        onClick={() => {
          navigate({
            pathname: "/result",
            search: `?url=${url}`,
          });
        }}
      >
        <CardContent>
          <Typography fontSize={"20px"}>{url}</Typography>
          <Typography fontSize={"22px"}>
            {content.substring(0, 60) + "..."}
          </Typography>
        </CardContent>
      </Card>
    </Fade>
  );
};
