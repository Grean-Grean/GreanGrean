import { Link } from "react-router-dom";

function SignUpButton() {
  // 회원가입 적은 데이터가 조건(중복, 인증)에 맞으면 가입 후 홈화면 이동
  // 아니면 틀린 부분 알림
  // BE 서버에 회원가입 데이터 전송

  return (
    <div>
      <Link to="/"></Link>
    </div>
  );
}

export default SignUpButton;
