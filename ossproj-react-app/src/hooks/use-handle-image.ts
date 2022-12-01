import { useState } from "react";
import defaultImg from "../assets/defaultImg.png";

export const useHandleImage = () => {
  const [imageUrl, setImageUrl] = useState("");

  const saveFileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setImageUrl(URL.createObjectURL(event.target.files[0]));
    const target = event.currentTarget;
    const files = (target.files as FileList)[0];
    if (files === undefined) {
      return;
    }
  };

  const deleteFileImage = () => {
    setImageUrl("");
  };

  return {
    imageUrl,
    saveFileImage,
    deleteFileImage,
  };
};
