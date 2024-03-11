import { NavLink } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <NavLink to="/login">Have an account?</NavLink>
            </p>

            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
