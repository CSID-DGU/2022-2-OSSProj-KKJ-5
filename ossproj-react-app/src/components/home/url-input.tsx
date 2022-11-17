import { Button, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { ChangeEvent } from "react";

interface IUrlInputProps {
  url: string;
  handleUrl: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDelete: () => void;
}

export const UrlInput = ({ url, handleUrl, handleDelete }: IUrlInputProps) => {
  return (
    <>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "70%",
          height: "40%",
          borderRadius: "50px",
        }}
      >
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            fontFamily: "bitbit",
            height: "100%",
            fontSize: "30px",
          }}
          placeholder={"url"}
          inputProps={{ "aria-label": "search google maps" }}
          value={url}
          onChange={handleUrl}
        />
        <IconButton onClick={handleDelete}>
          <CloseIcon />
        </IconButton>
      </Paper>
      <Button
        sx={{
          fontFamily: "bitbit",
          width: "200px",
          fontSize: "30px",
          color: "black",
        }}
      >
        {"Start!"}
      </Button>
    </>
  );
};
