import { useState } from "react";
import classes from "./SignUp.module.css";

import SignUpData from "./SignUpData";
import SignUpButton from "./SignUpButton";
import { useNavigate } from "react-router-dom";

function SignUp() {

  return (
    <div className={classes.signup}>
      <h1 className={classes.form}>SIGN UP</h1>
      <SignUpData />
    </div>
  );
}

export default SignUp;
