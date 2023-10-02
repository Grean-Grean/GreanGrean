import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import SignInData from "./SignInData";
import classes from "./SignIn.module.css";

function SignIn() {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPw, setSignInPw] = useState("");

  const navigate = useNavigate();

  function signInEmailHandler(event) {
    setSignInEmail(event.target.value);
  }

  function signInPwHandler(event) {
    setSignInPw(event.target.value);
  }

  function signIn() {
    navigate("/");
    console.log(signInEmail, signInPw);
  }
  return (
    <div className={classes.signin}>
      <h1 className={classes.form}>SIGN IN</h1>
      <SignInData />
      <p>
        <text>비밀번호 찾기 | </text>
        <Link to="/user/signup">회원가입</Link>
      </p>
    </div>
  );
}

export default SignIn;
