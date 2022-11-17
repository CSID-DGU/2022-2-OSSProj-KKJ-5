import { useState } from "react";

export const useHandleImage = () => {
  const [imgForm, setImgForm] = useState(new FormData());
  const [fileImage, setFileImage] = useState("");

  const saveFileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setFileImage(URL.createObjectURL(event.target.files[0]));
  };

  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage("");
  };

  const createImageForm = () => {
    let formData = new FormData();
    formData.append("file", fileImage);
    formData.append("data", new Blob(["image"], { type: "application/json" }));

    setImgForm(formData);
  };

  return {
    imgForm,
    fileImage,
    saveFileImage,
    deleteFileImage,
    createImageForm,
  };
};
