import axios from "axios";
import {
  ICategoryUrlResponse,
  IUrlProps,
  IUrlResponse,
} from "../interface/url";

export const summaryContent = ({ url }: IUrlProps) => {
  const apiUrl = `/url`;
  return axios.post<IUrlResponse>(apiUrl, { url }).then((res) => {
    return res.data;
  });
};

export const getCategoryUrl = (category: string) => {
  const url = `/url`;
  const params = { category: category };
  return axios.get<ICategoryUrlResponse[]>(url, { params }).then((res) => {
    return res.data;
  });
};
