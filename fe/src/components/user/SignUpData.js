import classes from "./SignUpData.module.css";

// 이메일, 닉네임 중복확인, 비밀번호 조건 확인

function SignUpData(props) {
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
    </>
  );
}

export default SignUpData;
