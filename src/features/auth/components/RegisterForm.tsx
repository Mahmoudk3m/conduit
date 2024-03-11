import { useForm } from "react-hook-form";
import registerSchema from "../schemas/register";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserRegister } from "../api/userRegister";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export default function RegisterForm() {
  const [emailError, setEmailError] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(registerSchema) });

  const { mutate, error: responseError } = useUserRegister();
  const onSubmit = (data: AuthTypes.RegisterPayload) => {
    mutate(data);
  };

  useEffect(() => {
    setEmailError(((responseError as AxiosError)?.response?.data as { errors: { email: [] } })?.errors.email);
  }, [responseError]);

  return (
    <form onSubmit={handleSubmit((data) => onSubmit({ user: data }))}>
      <fieldset className="form-group">
        <input className="form-control form-control-lg" type="text" placeholder="Username" {...register("username")} />
        {errors.username && (
          <ul className="error-messages">
            <li>{errors.username?.message}</li>
          </ul>
        )}
      </fieldset>
      <fieldset className="form-group">
        <input className="form-control form-control-lg" type="text" placeholder="Email" {...register("email")} />
        {(errors.email || emailError?.length > 0) && (
          <ul className="error-messages">
            {errors.email && <li>{errors.email?.message}</li>}
            {emailError?.length > 0 && <li>email {emailError[0]}</li>}
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
        Sign up
      </button>
    </form>
  );
}
