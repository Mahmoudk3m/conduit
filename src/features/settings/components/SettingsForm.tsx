import { yupResolver } from "@hookform/resolvers/yup";
import { settingsSchema } from "../schemas/settings";
import { useForm } from "react-hook-form";
import useUserStore from "@/stores/userStore";
import { useState } from "react";
import { useUpdateUser } from "../api/updateUser";

export default function SettingsForm() {
  const { register, handleSubmit } = useForm({ resolver: yupResolver(settingsSchema) });

  const { user } = useUserStore();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate } = useUpdateUser();

  const onSubmit = (data: SettingsTypes.User) => {
    if (data.password) {
      if (data.password.length < 8) {
        setErrorMessage("Password must be at least 8 characters long");
        return;
      }
    }

    if (!Object.values(data).some((value) => value)) {
      setErrorMessage("At least one field should be present");
      return;
    }

    mutate({ user: data });
  };

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      {errorMessage && (
        <ul className="error-messages">
          <li>{errorMessage}</li>
        </ul>
      )}
      <fieldset>
        <fieldset className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="URL of profile picture"
            defaultValue={user?.image}
            {...register("image")}
          />
        </fieldset>
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Your Name"
            defaultValue={user?.username}
            {...register("username")}
          />
        </fieldset>
        <fieldset className="form-group">
          <textarea
            className="form-control form-control-lg"
            rows={8}
            placeholder="Short bio about you"
            {...register("bio")}
          ></textarea>
        </fieldset>
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Email"
            defaultValue={user?.email}
            {...register("email")}
          />
        </fieldset>
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="password"
            placeholder="New Password"
            {...register("password")}
          />
        </fieldset>
        <button className="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
      </fieldset>
    </form>
  );
}
