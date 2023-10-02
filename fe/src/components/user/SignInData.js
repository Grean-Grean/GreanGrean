import axios from "axios";
import React, { useState } from "react";

function SignInData(props) {
  const [signInData, setSignInData] = useState({
    userEmail: "",
    userPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignInData({
      ...signInData,
      [name]: value,
    });
  };

  const handleSignUp = () => {
    axios
      .post("http://172.30.1.23:8080/user/login", signInData)
      .then((response) => {
        // Handle the response from the server here
        console.log(response.data.userId);
        console.log(response.data.userNickName);
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  };

  return (
    <div>
      <input
        type="email"
        id="userEmail"
        name="userEmail"
        placeholder="이메일를 입력해주세요."
        value={signInData.userEmail}
        onChange={handleInputChange}
      ></input>
      <br />
      <input
        type="password"
        id="userPassword"
        name="userPassword"
        placeholder="비밀번호를 입력해주세요"
        value={signInData.userPassword}
        onChange={handleInputChange}
      ></input>
      <br />
      <p>
        <button onClick={handleSignUp}>로그인</button>
      </p>
      <p htmlFor="body">이메일 또는 비밀번호가 일치하지 않습니다.</p>
    </div>
  );
}

export default SignInData;
