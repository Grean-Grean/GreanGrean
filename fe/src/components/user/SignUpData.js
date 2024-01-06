import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import classes from "./SignUpData.module.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function SignUpData(props) {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    userNickName: "",
    userEmail: "",
    userPassword: "",
    confirmPassword: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [emailStatusColor, setEmailStatusColor] = useState("");
  const [nickNameStatusColor, setNickNameStatusColor] = useState("");

  const [emailExistsStatus, setEmailExistsStatus] = useState("");
  const [nickNameExistsStatus, setNickNameExistsStatus] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isNickNameAvailable, setIsNickNameAvailable] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "userEmail") {
      setEmailExistsStatus(false);
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

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFormData((prevUserInfo) => ({
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

  const handleNickNameCheck = () => {
    const { userNickName } = formData;

    axios
      .post(`/user/nickname`, { userNickName })
      .then((response) => {
        if (response.data.status === 0) {
          // Nickname already exists
          console.log(response.data.message);
          setIsNickNameAvailable(false);
          setNickNameStatusColor(classes.caution);
          setNickNameExistsStatus(response.data.message);
        } else if (response.data.status === 1) {
          // Nickname is available
          console.log(response.data.message);
          setIsNickNameAvailable(true);
          setNickNameStatusColor(classes.pass);
          setNickNameExistsStatus(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEmailCheck = () => {
    const { userEmail } = formData;
    axios
      .post(`/user/email`, { userEmail })
      .then((response) => {
        // Handle the response from the server here
        if (response.data.status === 0) {
          // Nickname already exists
          console.log(response.data.message);
          setIsEmailVerified(false);
          setEmailStatusColor(classes.caution);
          setEmailExistsStatus(response.data.message);
        } else if (response.data.status === 1) {
          // Nickname is available
          console.log(response.data.message);
          setIsEmailVerified(true);
          setEmailStatusColor(classes.pass);
          setEmailExistsStatus(response.data.message);
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  };

  const handleSignUp = () => {
    if (
      isEmailVerified &&
      isNickNameAvailable &&
      isPasswordValid &&
      !passwordMismatch
    ) {
      console.log("회원가입이 완료되었습니다.");
      // Send data to the server using axios POST request
      console.log(formData);
      axios
        .post(`/user/regist`, formData)
        .then((response) => {
          // Handle the response from the server here
          console.log(response.data);
        })
        .catch((error) => {
          // Handle errors here
          console.error(error);
        });

      navigate("/");
    } else {
      console.log("확인되지 않은 정보가 있습니다.");
      console.log("이메일 확인", isEmailVerified);
      console.log("닉네임 확인", isNickNameAvailable);
      console.log("비밀번호 유효 확인", isPasswordValid);
      console.log("확인 비밀번호 확인", !passwordMismatch);
    }

    // Perform validation here before making the axios request
    if (formData.userPassword !== formData.confirmPassword) {
      setPasswordMismatch(true);
      return;
    }
  };

  const passwordCheckMessageText = passwordMismatch
    ? "비밀번호가 일치하지 않습니다."
    : "";

  let passwordCheckMessage = null;

  if (
    formData.confirmPassword !== "" &&
    formData.userPassword !== "" &&
    passwordMismatch
  ) {
    passwordCheckMessage = (
      <div
        htmlFor="confirmPassword"
        className={`${classes.alert} ${classes.caution}`}
      >
        {passwordCheckMessageText}
      </div>
    );
  }

  return (
    <div className={classes.inner}>
      <h1 className={classes.sign_header}>SIGN UP</h1>
      <div>
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
          <span>
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
            <div className={`${classes.alert} ${nickNameStatusColor}`}>
              {nickNameExistsStatus}
            </div>
          </span>
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
          <div className={`${classes.alert} ${emailStatusColor}`}>
            {emailExistsStatus}
          </div>
        </div>

        <div>
          <label htmlFor="userPassword">비밀번호</label>
          <input
            type={passwordVisible ? "text" : "password"}
            id="userPassword"
            name="userPassword"
            placeholder="영어, 숫자, 특수문자를 포함한 8자리 이상"
            value={formData.userPassword}
            onChange={(e) => {
              handleInputChange(e);
              handlePasswordChange(e);
            }}
          />
          <span onClick={togglePasswordVisibility}>
            {passwordVisible ? (
              <AiFillEye className={classes.password_toggle} />
            ) : (
              <AiFillEyeInvisible className={classes.password_toggle} />
            )}
          </span>
          {/* 비밀번호 유효성 검증 메시지 */}
          {passwordValidationMessage && (
            <div className={`${classes.alert} ${classes.caution}`}>
              {passwordValidationMessage}
            </div>
          )}
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
          {passwordCheckMessage}
        </div>

        {/* <div>
          <label htmlFor="verificationCode">인증번호</label>
          <input
            type="text"
            id="verificationCode"
            name="verificationCode"
            value={formData.verificationCode}
            onChange={handleInputChange}
          />
          <button className={classes.check_button}>확인</button>
        </div> */}
      </div>
      <button className={classes.sign_button} onClick={handleSignUp}>
        가입하기
      </button>
    </div>
  );
}

export default SignUpData;
