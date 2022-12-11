import { Card, CardContent, Typography } from "@mui/material";

interface IUrlCategoryBox {
  url: string;
  content: string;
}
export const UrlCategoryBox = ({ url, content }: IUrlCategoryBox) => {
  return (
    <Card sx={{ width: "30vh", height: "25vh", margin: "10px" }}>
      <CardContent>
        <Typography fontSize={"20px"}>{`url : ${url}`}</Typography>
        <Typography fontSize={"30px"}>{content}</Typography>
      </CardContent>
    </Card>
  );
};
