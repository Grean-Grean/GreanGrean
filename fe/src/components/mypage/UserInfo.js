import React from "react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import styles from "./UserInfo.module.css";

const UserInfo = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  console.log(axios.defaults.baseURL);

  const [userInfo, setUserInfo] = useState({
    userId: "",
    userName: "",
    userNickName: "",
    userEmail: "",
    userPassword: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [nickNameExistsStatus, setNickNameExistsStatus] = useState("");
  const [emailExistsStatus, setEmailExistsStatus] = useState("");
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");

  // 각각의 상태 변수 추가
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isNickNameAvailable, setIsNickNameAvailable] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

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

    axios
      .post(`/user/nickname`, { userNickName })
      .then((response) => {
        if (response.data.status === 0) {
          console.log(response.data.message);
          setNickNameExistsStatus(response.data.message);
          // 중복확인 결과에 따라 isNickNameAvailable 상태 설정
          setIsNickNameAvailable(false);
        } else if (response.data.status === 1) {
          // 사용 가능
          console.log(response.data.message);
          setNickNameExistsStatus(response.data.message);
          setIsNickNameAvailable(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEmailCheck = () => {
    const { userEmail } = userInfo;
    axios
      .post(`/user/email`, { userEmail })
      .then((response) => {
        if (response.data.status === 0) {
          console.log(response.data.message);
          setEmailExistsStatus(response.data.message);
          // 인증 결과에 따라 isEmailVerified 상태 설정
          setIsEmailVerified(false);
        } else if (response.data.status === 1) {
          // 사용 가능
          console.log(response.data.message);
          setEmailExistsStatus(response.data.message);
          setIsEmailVerified(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const userInfoUpdate = () => {
    // 모든 확인이 통과했을 때만 실행
    if (isEmailVerified && isNickNameAvailable && isPasswordValid) {
      console.log("모두 확인되었습니다");
    } else {
      console.log("확인되지 않은 정보가 있습니다");
      console.log(isEmailVerified);
      console.log(isNickNameAvailable);
      console.log(isPasswordValid);
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      userPassword: newPassword,
    }));

    // 비밀번호 정규식
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;

    // 정규식 테스트
    if (!passwordRegex.test(newPassword)) {
      setPasswordValidationMessage(
        "비밀번호는 최소 8자에서 16자까지, 영문자, 숫자 및 특수 문자를 포함해야 합니다."
      );
      setIsPasswordValid(false);
    } else {
      setPasswordValidationMessage("");
      setIsPasswordValid(true);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleDeleteUserInfo = (e) => {
    e.preventDefault();
    if (window.confirm("확인을 누르면 회원 정보가 삭제됩니다.")) {
      // axios
      //   .delete(
      //     `${process.env.REACT_APP_PROXY_URL}/members/${parsed.memberId}`,
      //     {
      //       headers: {
      //         Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
      //       },
      //     }
      //   )
      //   .then(() => {
      //     localStorage.clear();
      //     alert('그동안 이용해주셔서 감사합니다.');
      //     navigate('/');
      //   })
      //   .catch((err) => alert(err.response.data.message));
    } else {
      return;
    }
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

        <div className={styles.passwordContainer}>
          <label htmlFor="userPassword">비밀번호</label>
          <input
            type={passwordVisible ? "text" : "password"}
            id="userPassword"
            name="userPassword"
            placeholder="영어, 숫자, 특수문자를 포함한 8자리 이상"
            value={userInfo.userPassword}
            onChange={(e) => {
              handlePasswordChange(e);
            }}
          />
          <span onClick={togglePasswordVisibility}>
            {passwordVisible ? (
              <AiFillEye className="text-xl text-gray-700 cursor-pointer" />
            ) : (
              <AiFillEyeInvisible className="text-xl text-gray-700 cursor-pointer" />
            )}
          </span>
        </div>
        {/* 비밀번호 유효성 검증 메시지 */}
        {passwordValidationMessage && (
          <div style={{ color: "red" }}>{passwordValidationMessage}</div>
        )}
        <div>
          <button onClick={userInfoUpdate}>수정</button>
          <button onClick={handleDeleteUserInfo}>회원 탈퇴</button>
        </div>
      </div>
    </Sidebar>
  );
};

export default UserInfo;
