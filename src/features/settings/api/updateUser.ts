import { axiosClient } from "@/lib/axiosClient";
import useUserStore from "@/stores/userStore";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const updateUser = async (data: { user: SettingsTypes.User }): Promise<SettingsTypes.UpdateResponseType> => {
  return await axiosClient.put("/user", { user: data.user });
};

export const useUpdateUser = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  return useMutation({
    onSuccess: async (data) => {
      setUser(data.user);
      navigate(`/profile/${data.user.username}`);
    },
    mutationFn: updateUser
  });
};
