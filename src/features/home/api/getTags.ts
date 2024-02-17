import { axiosClient } from "@/lib/axiosClient";
import { useQuery } from "react-query";

const getTags = async (): Promise<Home.GetTagsResponse> => {
  return await axiosClient.get("/tags");
};

export const useGetTags = () => {
  return useQuery({ queryKey: "tags", queryFn: () => getTags() });
};
