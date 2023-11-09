import React, { useState } from "react";
import axios from "axios";
import classes from "./SignUpData.module.css";

function SignUpData(props) {
  const [formData, setFormData] = useState({
    userName: "",
    userNickName: "",
    userEmail: "",
    userPassword: "",
    confirmPassword: "",
  });

  const [emailExistsStatus, setEmailExistsStatus] = useState("");
  const [nickNameExistsStatus, setNickNameExistsStatus] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "userEmail") {
      setEmailExistsStatus(false); // Reset emailExists state when email changes
    } else if (name === "userPassword" || name === "confirmPassword") {
      // Check if userPassword and confirmPassword match
      if (name === "userPassword" && formData.confirmPassword === value) {
        setPasswordMismatch(false);
      } else if (
        name === "confirmPassword" &&
        formData.userPassword === value
      ) {
        setPasswordMismatch(false);
      } else {
        setPasswordMismatch(true);
      }
    } else if (name === "userNickName") {
      setNickNameExistsStatus(false); // Reset nickNameExists state when nickname changes
    }
  };

  const handleNickNameCheck = () => {
    const { userNickName } = formData;

    // Send userNickName to the server for checking
    axios
      .post("http://172.30.1.23:8080/user/nickname", { userNickName })
      .then((response) => {
        // Handle the response from the server here
        if (response.data.status === 0) {
          // Nickname already exists
          console.log(response.data.message);
          setNickNameExistsStatus(response.data.message);
        } else if (response.data.status === 1) {
          // Nickname is available
          console.log(response.data.message);
          setNickNameExistsStatus(response.data.message);
          // You can perform additional actions here if needed
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  };

  const handleEmailCheck = () => {
    const { userEmail } = formData;

    // Send userNickName to the server for checking
    axios
      .post("http://172.30.1.23:8080/user/email", { userEmail })
      .then((response) => {
        // Handle the response from the server here
        if (response.data.status === 0) {
          // Nickname already exists
          console.log(response.data.message);
          setEmailExistsStatus(response.data.message);
        } else if (response.data.status === 1) {
          // Nickname is available
          console.log(response.data.message);
          setEmailExistsStatus(response.data.message);
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  };

  const handleSignUp = () => {
    // Perform validation here before making the axios request
    if (formData.userPassword !== formData.confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    // Send data to the server using axios POST request
    axios
      .post("http://172.30.1.23:8080/user/regist", formData)
      .then((response) => {
        // Handle the response from the server here
        console.log(response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  };

  const passwordCheckMessageColor = passwordMismatch
    ? classes.caution
    : classes.pass;
  const passwordCheckMessageText = passwordMismatch
    ? "비밀번호가 일치하지 않습니다."
    : "비밀번호가 일치합니다.";

  let passwordCheckMessage = (
    <p
      htmlFor="confirmPassword"
      className={`${classes.alert} ${passwordCheckMessageColor}`}
    >
      {passwordCheckMessageText}
    </p>
  );

  return (
    <div className={classes.inner}>
      <div className={classes.inner}>
        <h1 className={classes.sign_header}>SIGN UP</h1>
        <div>
          <label htmlFor="userName">이름</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="userNickName">닉네임</label>
          <input
            type="text"
            id="userNickName"
            name="userNickName"
            value={formData.userNickName}
            onChange={handleInputChange}
          />
          <button
            className={classes.check_button}
            onClick={handleNickNameCheck}
          >
            중복확인
          </button>
          <p className={`${classes.alert} ${classes.caution}`}>
            {nickNameExistsStatus}
          </p>
        </div>

        <div>
          <label htmlFor="userEmail">이메일</label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleInputChange}
          />
          <button className={classes.check_button} onClick={handleEmailCheck}>
            인증하기
          </button>
          <br />
          <p className={`${classes.alert} ${classes.caution}`}>
            {emailExistsStatus}
          </p>
        </div>

        <div>
          <label htmlFor="userPassword">비밀번호</label>
          <input
            type="password"
            id="userPassword"
            name="userPassword"
            placeholder="영어, 숫자, 특수문자를 포함한 8자리 이상"
            value={formData.userPassword}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          <br />
          {passwordCheckMessage}
        </div>

        <div>
          <label htmlFor="verificationCode">인증번호</label>
          <input
            type="text"
            id="verificationCode"
            name="verificationCode"
            value={formData.verificationCode}
            onChange={handleInputChange}
          />
          <button className={classes.check_button}>확인</button>
        </div>
        <button className={classes.sign_button} onClick={handleSignUp}>
          가입하기
        </button>
      </div>
    </div>
  );
}

export default SignUpData;
