export interface IUrlResponse {
  url: string;
  content: string;
  wordCloudPath: string;
  networkGraphPath: string;
}

export interface IUrlProps {
  url: string;
}

export interface ICategoryUrlResponse {
  url: string;
  content: string;
  category: string;
}

export enum ECategory {
  "정치" = "politics",
  "경제" = "economy",
  "사회" = "social",
  "문화" = "culture",
  "세계" = "global",
  "IT/과학" = "science",
}
