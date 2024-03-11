import { useNavigate } from "react-router-dom";
import { axiosClient } from "@/lib/axiosClient";
import { useMutation } from "react-query";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import useUserStore from "@/stores/userStore";

const userLogin = async (data: AuthTypes.LoginPayload): Promise<AuthTypes.AuthResponse> => {
  return await axiosClient.post("/users/login", data);
};

export const useUserLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  return useMutation({
    mutationKey: "userLogin",
    onSuccess: (data) => {
      Cookies.set("token", data.user.token);
      setUser(data.user);
      navigate("/");
    },
    onError: (error) => {
      console.error("Login error:", error);
      toast.error("Incorrect email or password. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light"
      });
    },
    mutationFn: userLogin
  });
};
