import { axiosClient } from "@/lib/axiosClient";
import { useMutation } from "react-query";

const followUser = async ({
  username,
  followed
}: {
  username: string;
  followed?: boolean;
}): Promise<Article.GetArticleResponse> => {
  return await axiosClient[followed ? "delete" : "post"](`/profiles/${username}/follow`);
};

export const useFollowUser = ({ username, followed }: { username: string; followed?: boolean }) => {
  return useMutation({
    mutationFn: () => followUser({ username, followed })
  });
};
