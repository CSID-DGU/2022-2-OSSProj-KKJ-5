import axios from "axios";
import { IUrlProps, IUrlResponse } from "../interface/url";

export const summaryContent = ({ url }: IUrlProps) => {
  const apiUrl = `/url`;
  return axios.post<IUrlResponse>(apiUrl, { url }).then((res) => {
    return res.data;
  });
};
