import { Grid, IconButton, InputBase, Paper, TextField } from "@mui/material";
import { type } from "os";

import { ChangeEvent, useState } from "react";
import { UrlInput } from "../components/home/url-input";

export const Home = () => {
  const [url, setUrl] = useState("");

  const handleUrl = (e: ChangeEvent<HTMLInputElement>) =>
    setUrl(e.target.value);
  const handleDelete = () => {
    setUrl("");
  };
  return (
    <Grid container>
      <UrlInput url={url} handleUrl={handleUrl} handleDelete={handleDelete} />
    </Grid>
  );
};
