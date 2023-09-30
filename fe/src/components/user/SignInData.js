function SignInData(props) {
  return (
    <p>
      <input
        type="email"
        placeholder="이메일를 입력해주세요."
        onChange={props.onEmailChange}
      ></input>
      <br />
      <input
        type="password"
        placeholder="비밀번호를 입력해주세요"
        onChange={props.onPwChange}
      ></input>
      <br />
      <label htmlFor="body">이메일 또는 비밀번호가 일치하지 않습니다.</label>
    </p>
  );
}

export default SignInData;
