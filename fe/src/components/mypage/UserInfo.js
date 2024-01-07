import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../../store/userSlice";

import styles from "./UserInfo.module.css";

const UserInfo = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    userId: user.userID,
    userName: user.userName,
    userNickName: user.userNickName,
    // userEmail: user.userEmail,
    userPassword: user.userPassword,
  });
  // 수정모드
  const [isEditing, setIsEditing] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [nickNameExistsStatus, setNickNameExistsStatus] = useState("");
  // const [emailExistsStatus, setEmailExistsStatus] = useState("");
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");

  // 유효성 검사
  // 수정이기 때문에 기존 아이디/닉네임/비밀번호 사용가능 체크 -> 수정시 false 승인될 때만 true
  // const [isEmailVerified, setIsEmailVerified] = useState(true);
  const [isNickNameAvailable, setIsNickNameAvailable] = useState(true);
  const [showNickNameCheck, setShowNickNameCheck] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  // const [emailStatusColor, setEmailStatusColor] = useState("");
  const [nickNameStatusColor, setNickNameStatusColor] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
    console.log(`${name} : ${value}`);

    if (name === "userNickName") {
      console.log("닉네임 false");
      setIsNickNameAvailable(false);
      setShowNickNameCheck(true);
    }
  };

  const handleTurnEdit = () => {
    setIsEditing(!isEditing);
    setShowNickNameCheck(!showNickNameCheck);
  };

  const handleNickNameCheck = () => {
    const { userNickName } = userInfo;

    axios
      .post(`/user/nickname`, { userNickName })
      .then((response) => {
        if (response.data.status === 0) {
          // 사용 불가
          console.log(response.data.message);
          setNickNameExistsStatus(response.data.message);
          setIsNickNameAvailable(false);
          setNickNameStatusColor(styles.caution);
        } else if (response.data.status === 1) {
          // 사용 가능
          console.log(response.data.message);
          setNickNameExistsStatus(response.data.message);
          setIsNickNameAvailable(true);
          setNickNameStatusColor(styles.pass);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const handleEmailCheck = () => {
  //   const { userEmail } = userInfo;
  //   axios
  //     .post(`/user/email`, { userEmail })
  //     .then((response) => {
  //       if (response.data.status === 0) {
  //         console.log(response.data.message);
  //         setEmailExistsStatus(response.data.message);
  //         // 인증 결과에 따라 isEmailVerified 상태 설정
  //         setIsEmailVerified(false);
  //         setEmailStatusColor(styles.caution);
  //       } else if (response.data.status === 1) {
  //         // 사용 가능
  //         console.log(response.data.message);
  //         setEmailExistsStatus(response.data.message);
  //         setIsEmailVerified(true);
  //         setEmailStatusColor(styles.pass);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const userInfoUpdate = () => {
    if (isNickNameAvailable || userInfo.userNickName === user.userNickName) {
      if (isPasswordValid) {
        axios
          .put(`/user/modify`, userInfo)
          .then((response) => {
            console.log("모두 확인되었습니다");
            console.log(response);
            console.log(userInfo);
            dispatch(
              setUser({
                ...user,
                userNickName: userInfo.userNickName,
                userName: userInfo.userName,
                userPassword: userInfo.userPassword,
              })
            );
            handleTurnEdit();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } else {
      console.log("확인되지 않은 정보가 있습니다");
      alert("수정 정보를 다시 확인해 주세요.");
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
    if (window.confirm("확인을 누르면 회원 정보가 삭제됩니다.")) {
      axios
        .delete(`/members/${user.userID}`)
        .then(() => {
          localStorage.clear();
          alert("그동안 이용해주셔서 감사합니다.");
          navigate("/");
        })
        .catch((err) => alert(err.response.data.message));
    } else {
      return;
    }
  };

  return (
    <Sidebar>
      <div className={styles.user}>
        <h2 className={styles.title}>마이페이지 - 회원 정보</h2>
        <hr className={styles.bar} />
        <div className={styles.inner}>
          <div>
            <label htmlFor="userName">이름</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={userInfo.userName}
              onChange={handleInputChange}
              disabled={!isEditing}
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
              disabled={!isEditing}
            />
            {showNickNameCheck && ( // showNickNameCheck 값에 따라 중복확인 버튼 보이기
              <button
                className={styles.modify_button}
                onClick={handleNickNameCheck}
              >
                중복확인
              </button>
            )}
            <div className={`${styles.alert} ${nickNameStatusColor}`}>
              {nickNameExistsStatus}
            </div>
          </div>
          <div>
            <label htmlFor="userEmail">이메일</label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              value={user.userEmail}
              disabled
              // onChange={handleInputChange}
            />
            {/* <button className={styles.modify_button} onClick={handleEmailCheck}>
              인증하기
            </button>
            <div className={`${styles.alert} ${emailStatusColor}`}>
              {emailExistsStatus}
            </div> */}
          </div>

          <div className={styles.passwordContainer}>
            <label htmlFor="userPassword">비밀번호</label>
            <span>
              <input
                type={passwordVisible ? "text" : "password"}
                id="userPassword"
                name="userPassword"
                placeholder="영어, 숫자, 특수문자를 포함한 8자리 이상"
                value={userInfo.userPassword}
                disabled={!isEditing}
                onChange={(e) => {
                  handlePasswordChange(e);
                }}
              />
              <span onClick={togglePasswordVisibility}>
                {passwordVisible ? (
                  <AiFillEye className={styles.password_toggle} />
                ) : (
                  <AiFillEyeInvisible className={styles.password_toggle} />
                )}
              </span>
            </span>
            {/* 비밀번호 유효성 검증 메시지 */}
            {passwordValidationMessage && (
              <div className={`${styles.alert} ${styles.caution}`}>
                {passwordValidationMessage}
              </div>
            )}
          </div>
          <div>
            {isEditing ? (
              <div>
                <button
                  className={styles.modify_button}
                  onClick={userInfoUpdate}
                >
                  확인
                </button>
                <button
                  className={styles.modify_button}
                  onClick={handleTurnEdit}
                >
                  취소
                </button>
                <button
                  className={styles.withdrawal_button}
                  onClick={handleDeleteUserInfo}
                >
                  회원 탈퇴
                </button>
              </div>
            ) : (
              <button className={styles.modify_button} onClick={handleTurnEdit}>
                수정
              </button>
            )}
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default UserInfo;
