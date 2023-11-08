import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import SignInData from "./SignInData";
import classes from "./LoginPage.module.css";

function SignIn() {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPw, setSignInPw] = useState("");

  const navigate = useNavigate();

  // function signInEmailHandler(event) {
  //   setSignInEmail(event.target.value);
  // }

  // function signInPwHandler(event) {
  //   setSignInPw(event.target.value);
  // }

  // function signIn() {
  //   navigate("/");
  //   console.log(signInEmail, signInPw);
  // }

  return (
    <body className={classes.body}>
      <div className={classes.card_background}>
        <div className={classes.inner_card}>
          <a className={classes.main_banner} href="/">
            GREENGREEN
          </a>
        </div>
        <SignInData />
      </div>
    </body>
  );
}

export default SignIn;
