import { axiosClient } from "@/lib/axiosClient";
import { useQuery } from "react-query";

const getArticles = async ({
  params,
  endpoint
}: {
  params: Home.GetArticlesParams;
  endpoint?: boolean;
}): Promise<Home.GetArticlesResponse> => {
  return await axiosClient.get(`/articles${endpoint ? `/feed` : ""}`, {
    params
  });
};

export const useGetArticles = (params: Home.GetArticlesParams, endpoint?: boolean) => {
  return useQuery({
    queryKey: ["articles", params, endpoint],
    queryFn: () => getArticles({ params, endpoint }),
    enabled: !!params
  });
};
