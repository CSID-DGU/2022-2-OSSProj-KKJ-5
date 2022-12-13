import { Button, Grid } from "@mui/material";
import { ECategory } from "../../interface/url";

const categoryKoList = [" 정치", " 경제 ", "사회", " 문화", " 세계", "IT/과학"];
const categoryEngList = [
  "politics",
  "economy",
  "social",
  "culture",
  "global",
  "science",
];
interface ICategoryListProps {
  handleCategory: (listItem: string) => void;
  selected: string;
}
export const CategoryList = ({
  handleCategory,
  selected,
}: ICategoryListProps) => {
  return (
    <Grid item lg={2} md={2} sm={2} xs={2}>
      {categoryKoList.map((value: string, index: number) => {
        return (
          <Button
            onClick={() => {
              handleCategory(categoryEngList[index]);
            }}
            sx={{
              color: "black",
              fontSize: { lg: "25px", md: "25px", sm: "20px", xs: "20px" },
              fontFamily: "bitbit",
              textDecoration:
                selected === categoryEngList[index] ? "underline" : "",
            }}
          >
            {value}
          </Button>
        );
      })}
    </Grid>
  );
};
