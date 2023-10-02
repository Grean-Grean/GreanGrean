import React, { useState } from "react";
import axios from "axios";
import classes from "./SignUpData.module.css";

function SignUpData(props) {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailExists(false); // Reset emailExists state when email changes
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMismatch(false); // Reset passwordMismatch state when password changes
  };

  const handleConfirmationPasswordChange = (e) => {
    setConfirmationPassword(e.target.value);
    setPasswordMismatch(false); // Reset passwordMismatch state when confirmation password changes
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSignUp = () => {
    // Perform validation here before making the axios request
    if (password !== confirmationPassword) {
      setPasswordMismatch(true);
      return;
    }

    axios.defaults.baseURL="http://localhost:8080/user/regist"

    // Send data to the server using axios POST request
    axios
      .post("/", {
        name: name,
        nickname: nickname,
        email: email,
        password: password,
        verificationCode: verificationCode,
        headers: {
          'Access-Control-Allow-Origin': '*', // 실제 운영 환경에서는 '*' 대신 신뢰할 수 있는 도메인을 지정해야 합니다.
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        },
      })
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
        <label htmlFor="name">이름</label>
        <input type="text" id="name" onChange={props.onNameChange}></input>
      </p>

      <p>
        <label htmlFor="body">닉네임</label>
        <input type="text" onChange={props.onNicknameChange}></input>
        <button>중복확인</button>
      </p>
      <p>
        <label htmlFor="body">이메일</label>
        <input type="email" onChange={props.onEmailChange}></input>
        <button>인증하기</button>
        <br />
        <label htmlFor="body" className={classes.alert}>
          이미 등록된 이메일입니다.
        </label>
      </p>

      <p>
        <label htmlFor="body">비밀번호</label>
        <input
          type="password"
          placeholder="영어, 숫자, 특수문자를 포함한 8자리 이상"
          onChange={props.onPwChange}
        ></input>
      </p>

      <p>
        <label htmlFor="body">비밀번호 확인</label>
        <input type="password"></input>
        <br />
        <label htmlFor="body" className={classes.alert}>
          비밀번호가 일치하지 않습니다.
        </label>
      </p>

      <p>
        <label htmlFor="body">인증번호</label>
        <input type="text"></input>
        <button>확인</button>
      </p>
      <button onClick={handleSignUp}>가입하기</button>
    </>
  );
}

export default SignUpData;
