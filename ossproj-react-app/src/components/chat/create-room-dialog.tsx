import { DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { Box, Button, Dialog, DialogActions, IconButton } from "@mui/material";
import { ChangeEvent } from "react";
import CloseIcon from "@mui/icons-material/Close";
interface ICraeteRoomDialog {
  roomName: string;
  img: string;
  open: boolean;
  handleRoomName: (e: ChangeEvent<HTMLInputElement>) => void;
  handleImg: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClose: () => void;
  createRoomHandler: () => void;
}
export const CreateRoomDialog = ({
  roomName,
  img,
  open,
  handleRoomName,
  handleImg,
  handleClose,
  createRoomHandler,
}: ICraeteRoomDialog) => {
  return (
    <>
      <Dialog open={open}>
        <DialogTitle>
          {"create Room"}
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField value={roomName} onChange={handleRoomName} />
          <Button variant="contained" component="label">
            Upload
            <input hidden accept="image/*" type="file" onChange={handleImg} />
          </Button>
          <Box
            borderRadius={`70%`}
            width={"300px"}
            height={`300px`}
            overflow={"hidden"}
          >
            <img
              width={`100%`}
              height={`100%`}
              object-fit={"cover"}
              alt="sample"
              src={img}
              style={{ margin: "auto" }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={createRoomHandler}>{"create"}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
