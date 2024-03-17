import { axiosClient } from "@/lib/axiosClient";
import { useQuery } from "react-query";

export const getComments = async (slug: string): Promise<Article.GetCommentsResponse> => {
  return await axiosClient.get(`/articles/${slug}/comments`);
};

export const useGetComments = (slug: string) => {
  return useQuery({
    queryKey: ["comments", slug],
    queryFn: () => getComments(slug),
    enabled: !!slug
  });
};
