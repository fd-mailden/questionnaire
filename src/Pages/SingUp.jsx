import React, { useState } from "react";
import LogInForm from "../components/LogInForm";
import { Title } from "../components/UI";
import LogInBottom from "../components/LogInBottom";
import { registerRequests } from "../api/authorizationRequests";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logInAction } from "../storToolkit/auth/authActions";
import {
  selectIsLoading,
  selectIsValid,
} from "../storToolkit/auth/authSelector";

function SingUp() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const isValid = useSelector(selectIsValid);
  const dispatch = useDispatch();
  const register = {
    buttonText: "Register",
    textTop: "Already have an account? ",
    linkTop: "Log in",
    isRegister: false,
    href: "logIn",
  };
  function registerUser(registerData) {
    dispatch(
      logInAction({
        url: "register",
        userData: registerData,
        enqueueSnackbar: enqueueSnackbar,
      })
    ).then(() => {
      navigate("/success");
    });
  }

  return (
    <div className="log-in">
      <Title>Create an account</Title>
      <LogInForm
        isValid={isValid}
        logUser={registerUser}
        isLoading={isLoading}
        info={register}
      />
      <LogInBottom
        isLoading={isLoading}
        logUser={registerUser}
        info={register}
      />
    </div>
  );
}

export default SingUp;
