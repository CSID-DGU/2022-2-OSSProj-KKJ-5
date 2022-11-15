import { InjectedProps } from "@material-ui/core";
import { IChatDetail } from "../interface/chat";

export default class ChatEntity {
  detail = [
    {
      type: "TALK",
      roomId: "1",
      sender: "kim",
      message: "",
    },
  ];
  getDetail(props: IChatDetail) {
    console.log(props.type);
    this.detail.unshift(this.setDetail(props));
  }
  setDetail(props: IChatDetail) {
    return {
      type: props.type,
      roomId: props.roomId,
      sender: props.sender,
      message: props.message,
    };
  }
}
