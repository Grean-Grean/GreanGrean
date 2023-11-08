import { useState } from "react";
import classes from "./LoginPage.module.css";

import SignUpData from "./SignUpData";
import SignUpButton from "./SignUpButton";
import { useNavigate } from "react-router-dom";

function SignUp() {
  return (
    <body className={classes.body}>
      <div className={classes.card_background}>
        <div className={classes.inner_card}>
          <a className={classes.main_banner} href="/">
            GREENGREEN
          </a>
        </div>
        <SignUpData />
      </div>
    </body>
  );
}

export default SignUp;
