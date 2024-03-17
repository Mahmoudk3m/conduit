import Cookies from "js-cookie";
import useUserStore from "@/stores/userStore";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const { setUser } = useUserStore();
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    navigate("/");
  };
  return (
    <button className="btn btn-outline-danger" onClick={logout}>
      Or click here to logout.
    </button>
  );
}
