import React from "react";
import { Link } from "react-router-dom";

function LogInBottom({ ...props }) {
  const { info } = props;
  return (
    <div>
      <Link className="link-navigation" to="/test">
        {info.isRegister ? <p>Forgot password?</p> : null}
      </Link>
      <div className="login-bottom">
        <p>{info.textTop}</p>
        <Link to={`/${info.href}`}>{info.linkTop}</Link>
      </div>
      <div className="login-bottom">
        <p>Need help or have a question, </p>
        <Link to="/"> _get in touch</Link>
      </div>
    </div>
  );
}

export default LogInBottom;
