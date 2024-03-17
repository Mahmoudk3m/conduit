import { axiosClient } from "@/lib/axiosClient";
import { queryClient } from "@/lib/queryClient";
import { useMutation } from "react-query";

const deleteComment = async ({ slug, id }: { slug: string; id: number }): Promise<Article.CommentResponse> => {
  return await axiosClient.delete(`/articles/${slug}/comments/${id}`);
};

export const useDeleteComment = () => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    mutationFn: deleteComment
  });
};
