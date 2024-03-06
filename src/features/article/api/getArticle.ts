import { axiosClient } from "@/lib/axiosClient";
import { useQuery } from "react-query";

const getArticle = async (slug: string | undefined): Promise<Article.GetArticleResponse> => {
  return await axiosClient.get(`/articles/${slug}`);
};

export const useGetArticle = (slug: string | undefined) => {
  return useQuery({ queryKey: ["article", slug], queryFn: () => getArticle(slug), enabled: !!slug });
};
