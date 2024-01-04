import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";

import classes from "./SignInData.module.css";

function SignInData(props) {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signInData, setSignInData] = useState({
    userEmail: "",
    userPassword: "",
  });
  const [showCaution, setShowCaution] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignInData({
      ...signInData,
      [name]: value,
    });
  };

  const handleSignUp = () => {
    // test code
    dispatch(
      setUser({
        userID: 1,
        userNickName: "jina",
      })
    );

    navigate("/");

    // axios
    //   .post(`/user/login`, signInData)
    //   .then((response) => {
    //     // Handle the response from the server here
    //     // console.log(response.data.userId);
    //     // console.log(response.data.userNickName);
    //     dispatch(
    //       setUser({
    //         userID: response.data.userId,
    //         userNickName: response.data.userNickName,
    //       })
    //     );
    //   })
    //   .catch((error) => {
    //     // Handle errors here
    //     console.error(error);
    //     setShowCaution(true);
    //   });
  };

  return (
    <div className={classes.inner}>
      <div className={classes.inner}>
        <h1 className={classes.sign_header}>SIGN IN</h1>
        <input
          className={classes.input}
          type="email"
          id="userEmail"
          name="userEmail"
          placeholder="Email"
          value={signInData.userEmail}
          onChange={handleInputChange}
        ></input>
        <div>
          <input
            type="password"
            id="userPassword"
            name="userPassword"
            placeholder="Password"
            value={signInData.userPassword}
            onChange={handleInputChange}
          ></input>
          {showCaution && (
            <p
              className={`${classes.caution} ${classes.vibration}`}
              htmlFor="body"
            >
              이메일 또는 비밀번호를 잘못 입력했습니다. 다시 작성해주세요.
            </p>
          )}
        </div>
        <button
          className={classes.sign_button}
          onClick={handleSignUp}
          type="button"
        >
          로그인
        </button>
        <div className={classes.login_more}>
          {/**비밀번호 찾기는 나중에 코드 추가 필요 */}
          <a>비밀번호 찾기</a>
          <p>|</p>
          <a href="/user/signup">회원가입</a>
        </div>
        <hr className={classes.bar} />
        <div className={classes.logo}>
          <div className={classes.logo_kakaotalk}></div>
          <div className={classes.logo_google}></div>
          <div className={classes.logo_naver}></div>
          <div className={classes.logo_else}></div>
        </div>
      </div>
    </div>
  );
}

export default SignInData;
