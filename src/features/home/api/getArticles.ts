import { axiosClient } from "@/lib/axiosClient";
import { useQuery } from "react-query";

const getArticles = async ({ params }: Home.GetArticlesParams): Promise<Home.GetArticlesResponse> => {
  return await axiosClient.get("/Articles", {
    params
  });
};

export const useGetArticles = (params: Home.GetArticlesParams) => {
  return useQuery({ queryKey: ["Articles", params], queryFn: () => getArticles(params) });
};
