import React from "react";

const AuthHelpComponent = React.memo(function AuthHelpComponent({
  setShowPassword,
  isShowPassword,
}) {
  return (
    <div className="form-authorization__helper">
      <div className="form-authorization__checkbox">
        <input
          className="form-authorization__input-check "
          type="checkbox"
          name="happy"
          value="yes"
        />
        <label className="form-authorization__label"> Remember me</label>
      </div>

      <button
        onClick={() => {
          setShowPassword(!isShowPassword);
        }}
        className="form-authorization__show"
        type="button"
      >
        Show password
      </button>
    </div>
  );
});

export default AuthHelpComponent;
