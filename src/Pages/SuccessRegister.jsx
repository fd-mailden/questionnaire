import React from "react";
import { Title } from "../components/UI";

function SuccessRegister() {
  return (
    <div className="success">
      <Title>Success</Title>
      <p className="success__text">
        We have sent you an activation code, please check your email.
      </p>
    </div>
  );
}

export default SuccessRegister;
