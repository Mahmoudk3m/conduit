import { axiosClient } from "@/lib/axiosClient";
import { queryClient } from "@/lib/queryClient";
import { useMutation } from "react-query";

const favouriteArticle = async ({ slug }: { slug: string }): Promise<Article.GetArticleResponse> => {
  return await axiosClient.post(`/articles/${slug}/favorite`);
};

export const useFavouriteArticle = (slug: string) => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
    mutationFn: () => favouriteArticle({ slug })
  });
};
