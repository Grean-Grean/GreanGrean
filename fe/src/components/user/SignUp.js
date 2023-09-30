import { useState } from "react";
import classes from "./SignUp.module.css";

import SignUpData from "./SignUpData";
import SignUpButton from "./SignUpButton";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [signUpName, setSignUpName] = useState("");
  const [signUpNickname, setSignUpNickname] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPw, setSignUpPW] = useState("");

  const navigate = useNavigate();

  function signUp() {
    navigate("/");
    console.log(signUpName, signUpNickname, signUpEmail, signUpPw);
  }

  function signUpEmailChangeHandler(event) {
    setSignUpEmail(event.target.value);
    console.log(event.target.value);
  }

  function signUpPwChangeHandler(event) {
    setSignUpPW(event.target.value);
    console.log(event.target.value);
  }

  function signUpNicknameChangeHandler(event) {
    setSignUpNickname(event.target.value);
    console.log(event.target.value);
  }

  function signUpNameChangeHandler(event) {
    setSignUpName(event.target.value);
    console.log(event.target.value);
  }

  return (
    <div className={classes.signup}>
      <h1 className={classes.form}>SIGN UP</h1>
      <SignUpData
        onEmailChange={signUpEmailChangeHandler}
        onPwChange={signUpPwChangeHandler}
        onNicknameChange={signUpNicknameChangeHandler}
        onNameChange={signUpNameChangeHandler}
      />
      <button onClick={signUp}>회원가입</button>
    </div>
  );
}

export default SignUp;
