import React, { useState , useCallback} from "react";
import { Loading, Button, Input } from "./UI";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "../helpers/yup";
import AuthHelpComponent from "./AuthHelpComponent";

function LogInForm({ ...props }) {
  const { logUser, isValid, isLoading, info } = props;
  const [isShowPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => logUser(data);
  const onShowPassword = useCallback(
    () => setShowPassword(!isShowPassword),
    [isShowPassword]
  );

  return (
    <form className="form-authorization" onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="email"
        {...register("email")}
        type="email"
        isValidInput={errors.email || isValid}
        placeholder="Enter your email"
      />
      <Input
        id="password"
        {...register("password")}
        isValidInput={errors.password || isValid}
        placeholder="Enter your password"
        type={isShowPassword ? "text" : "password"}
      />
      <AuthHelpComponent
        isShowPassword={isShowPassword}
        setShowPassword={onShowPassword}
      />

      {isLoading ? (
        <Loading width="45" height="45" color="#FF5A5E" />
      ) : (
        <Button type="submit">{info.buttonText}</Button>
      )}
    </form>
  );
}

export default LogInForm;
