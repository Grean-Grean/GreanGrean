import React from "react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

import styles from "./UserInfo.module.css";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userName: "",
    userNickName: "",
    userEmail: "",
    userPassword: "",
  });

  const [nickNameExistsStatus, setNickNameExistsStatus] = useState("");
  const [emailExistsStatus, setEmailExistsStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });

    console.log(value);
  };

  const handleNickNameCheck = () => {
    const { userNickName } = userInfo;

    // Send userNickName to the server for checking
    axios
      .post("http://172.30.1.23:8080/user/nickname", { userNickName })
      .then((response) => {
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
    const { userEmail } = userInfo;

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

  return (
    <Sidebar>
      <div>
        <h2>마이페이지 - 회원정보</h2>
        <div>
          <label htmlFor="userName">이름</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={userInfo.userName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="userNickName">닉네임</label>
          <input
            type="text"
            id="userNickName"
            name="userNickName"
            value={userInfo.userNickName}
            onChange={handleInputChange}
          />
          <button className={styles.check_button} onClick={handleNickNameCheck}>
            중복확인
          </button>
          <p className={`${styles.alert} ${styles.caution}`}>
            {nickNameExistsStatus}
          </p>
        </div>
        <div>
          <label htmlFor="userEmail">이메일</label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            value={userInfo.userEmail}
            onChange={handleInputChange}
          />
          <button className={styles.check_button} onClick={handleEmailCheck}>
            인증하기
          </button>
          <br />
          <p className={`${styles.alert} ${styles.caution}`}>
            {emailExistsStatus}
          </p>
        </div>
      </div>
    </Sidebar>
  );
};

export default UserInfo;
