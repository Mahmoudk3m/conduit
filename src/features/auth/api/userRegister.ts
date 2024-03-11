import { useNavigate } from "react-router-dom";
import { axiosClient } from "@/lib/axiosClient";
import { useMutation } from "react-query";
import Cookies from "js-cookie";
import useUserStore from "@/stores/userStore";

const userRegister = async (data: AuthTypes.RegisterPayload): Promise<AuthTypes.AuthResponse> => {
  return await axiosClient.post("/users", data);
};

export const useUserRegister = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  return useMutation({
    mutationKey: "userRegister",
    onSuccess: (data) => {
      Cookies.set("token", data.user.token);
      setUser(data.user);
      navigate("/");
    },
    onError: (error) => {
      console.error("Register error:", error);
    },
    mutationFn: userRegister
  });
};
