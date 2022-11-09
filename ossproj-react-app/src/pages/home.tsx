import { Grid, IconButton, InputBase, Paper, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { ChangeEvent, useState } from "react";

export const Home = () => {
  const [url, setUrl] = useState("");

  const handleUrl = (e: ChangeEvent<HTMLInputElement>) =>
    setUrl(e.target.value);

  return (
    <Grid container>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={"url"}
          inputProps={{ "aria-label": "search google maps" }}
          value={url}
          onChange={handleUrl}
        />
        <IconButton>
          <CloseIcon />
        </IconButton>
      </Paper>
      {url}

      <IconButton>
        <SearchIcon />
      </IconButton>
    </Grid>
  );
};
