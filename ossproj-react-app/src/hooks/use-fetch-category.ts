import { useMutation, useQuery } from "react-query";
import { getCategoryUrl } from "../services/url";

interface useFetchCategoryProps {
  category: string;
}
export const useFetchCategory = ({ category }: useFetchCategoryProps) => {
  const {
    mutate: getCategory,
    data,
    isLoading,
    isSuccess,
  } = useMutation([`category`, category], getCategoryUrl, {
    onSuccess: () => {
      console.log(data);
    },
  });

  const handleCategory = () => {
    getCategory(category);
  };
  return {
    categoryList: data,
    handleCategory,
  };
};
