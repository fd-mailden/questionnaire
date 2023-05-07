import React, { useState } from "react";
import LogInForm from "../components/LogInForm";
import { Title } from "../components/UI";
import LogInBottom from "../components/LogInBottom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { logInAction } from "../storToolkit/auth/authActions";
import {
  selectIsLoading,
  selectIsValid,
} from "../storToolkit/auth/authSelector";

function LogIn() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate(0);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const isValid = useSelector(selectIsValid);
  const login = {
    buttonText: "Login",
    textTop: "Don’t have an account? ",
    linkTop: "Sign up",
    isRegister: true,
    href: "singUp",
  };
  function loginUser(userData) {
    dispatch(
      logInAction({
        url: "login",
        userData: userData,
        enqueueSnackbar: enqueueSnackbar,
      })
    ).then(() => {
      navigate("/");
    });
  }

  return (
    <div className="log-in">
      <Title>Log In</Title>
      <LogInForm
        isValid={isValid}
        logUser={loginUser}
        isLoading={isLoading}
        info={login}
      />
      <LogInBottom logUser={loginUser} navigate={navigate} info={login} />
    </div>
  );
}

export default LogIn;
