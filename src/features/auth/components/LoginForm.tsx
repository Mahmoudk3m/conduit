import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import loginSchema from "../schemas/login";
import { useUserLogin } from "../api/userLogin";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(loginSchema) });

  const { mutate } = useUserLogin();
  const onSubmit = (data: AuthTypes.LoginPayload) => {
    mutate(data);
  };
  return (
    <form onSubmit={handleSubmit((data) => onSubmit({ user: data }))}>
      <fieldset className="form-group">
        <input className="form-control form-control-lg" type="text" placeholder="Email" {...register("email")} />
        {errors.email && (
          <ul className="error-messages">
            <li>{errors.email?.message}</li>
          </ul>
        )}
      </fieldset>
      <fieldset className="form-group">
        <input
          className="form-control form-control-lg"
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <ul className="error-messages">
            <li>{errors.password?.message}</li>
          </ul>
        )}
      </fieldset>
      <button className="btn btn-lg btn-primary pull-xs-right" type="submit">
        Sign in
      </button>
    </form>
  );
}
