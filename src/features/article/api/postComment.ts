import { axiosClient } from "@/lib/axiosClient";
import { queryClient } from "@/lib/queryClient";
import { useMutation } from "react-query";

const postComment = async ({ slug, body }: { slug: string; body: string }): Promise<Article.CommentResponse> => {
  return await axiosClient.post(`/articles/${slug}/comments`, {
    comment: { body }
  });
};

export const usePostComment = () => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    mutationFn: postComment
  });
};
