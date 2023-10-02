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

  const [emailExists, setEmailExists] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "userEmail") {
      setEmailExists(false); // Reset emailExists state when email changes
    } else if (name === "userPassword" || name === "confirmPassword") {
      setPasswordMismatch(false); // Reset passwordMismatch state when password changes
    }
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

  return (
    <>
      <p>
        <label htmlFor="userName">이름</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
        />
      </p>

      <p>
        <label htmlFor="userNickName">닉네임</label>
        <input
          type="text"
          id="userNickName"
          name="userNickName"
          value={formData.userNickName}
          onChange={handleInputChange}
        />
        <button>중복확인</button>
      </p>
      <p>
        <label htmlFor="userEmail">이메일</label>
        <input
          type="email"
          id="userEmail"
          name="userEmail"
          value={formData.userEmail}
          onChange={handleInputChange}
        />
        <button>인증하기</button>
        <br />
        {emailExists && (
          <label htmlFor="userEmail" className={classes.alert}>
            이미 등록된 이메일입니다.
          </label>
        )}
      </p>

      <p>
        <label htmlFor="userPassword">비밀번호</label>
        <input
          type="password"
          id="userPassword"
          name="userPassword"
          placeholder="영어, 숫자, 특수문자를 포함한 8자리 이상"
          value={formData.userPassword}
          onChange={handleInputChange}
        />
      </p>

      <p>
        <label htmlFor="confirmPassword">비밀번호 확인</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        <br />
        {passwordMismatch && (
          <label htmlFor="confirmPassword" className={classes.alert}>
            비밀번호가 일치하지 않습니다.
          </label>
        )}
      </p>

      <p>
        <label htmlFor="verificationCode">인증번호</label>
        <input
          type="text"
          id="verificationCode"
          name="verificationCode"
          value={formData.verificationCode}
          onChange={handleInputChange}
        />
        <button>확인</button>
      </p>
      <button onClick={handleSignUp}>가입하기</button>
    </>
  );
}

export default SignUpData;