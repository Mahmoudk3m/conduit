import { axiosClient } from "@/lib/axiosClient";
import { queryClient } from "@/lib/queryClient";
import { useMutation } from "react-query";

const unfavouriteArticle = async ({ slug }: { slug: string }): Promise<Article.GetArticleResponse> => {
  return await axiosClient.delete(`/articles/${slug}/favorite`);
};

export const useUnfavouriteArticle = (slug: string) => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },

    mutationFn: () => unfavouriteArticle({ slug })
  });
};
