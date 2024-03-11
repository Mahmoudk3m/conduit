import LoginForm from "../components/LoginForm";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("token")) {
      navigate("/");
    }
  }, []);
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <NavLink to="/register">Need an account?</NavLink>
            </p>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
