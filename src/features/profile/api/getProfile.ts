import { axiosClient } from "@/lib/axiosClient";
import { useQuery } from "react-query";

const getProfile = async (username: string | undefined): Promise<Profile.GetProfileResponse> => {
  return await axiosClient.get(`/profiles/${username}`);
};

export const useGetProfile = (username: string | undefined) => {
  return useQuery({ queryKey: ["Profile", username], queryFn: () => getProfile(username), enabled: !!username });
};
