import { axiosClient } from "@/lib/axiosClient";
import useUserStore from "@/stores/userStore";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const updateArticle = async (data: {
  slug?: string;
  req: "put" | "post" | "delete";
  article?: ArticleTypes.ArticleRequest;
}): Promise<ArticleTypes.ArticleResponse> => {
  return await axiosClient[data.req](`/articles/${data.slug !== undefined ? data.slug : ""}`, {
    article: data.article
  });
};

export const useUpdateArticle = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  return useMutation({
    onSuccess: (data, req) => {
      console.log(req.req);
      if (req.req === "delete") {
        navigate(`/profile/${user?.username}`);
      } else {
        navigate(`/article/${data.article.slug}`);
      }
    },
    mutationFn: updateArticle
  });
};
