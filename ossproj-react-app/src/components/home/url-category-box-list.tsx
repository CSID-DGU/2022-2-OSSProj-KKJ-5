import { ICategoryUrlResponse } from "../../interface/url";
import { UrlCategoryBox } from "./url-category-box";

interface IUrlCategoryBoxList {
  urlCategoryList: ICategoryUrlResponse[];
}
export const UrlCategoryBoxList = ({
  urlCategoryList,
}: IUrlCategoryBoxList) => {
  return (
    <>
      {urlCategoryList.map((props) => {
        return <UrlCategoryBox url={props.url} content={props.content} />;
      })}
    </>
  );
};
