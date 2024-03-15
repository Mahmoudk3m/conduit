import { axiosClient } from "@/lib/axiosClient";
import { queryClient } from "@/lib/queryClient";
import { useMutation } from "react-query";

const favouriteArticle = async ({
  slug,
  favourited
}: {
  slug: string;
  favourited?: boolean;
}): Promise<Article.GetArticleResponse> => {
  return await axiosClient[favourited ? "delete" : "post"](`/articles/${slug}/favorite`);
};

export const useFavouriteArticle = ({ slug, favourited }: { slug: string; favourited?: boolean }) => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
    mutationFn: () => favouriteArticle({ slug, favourited })
  });
};
