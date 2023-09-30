// import { useNavigate } from "react-router-dom"
// import Button from 'react-bootstrap/Button';
// import React, { useState } from "react";
// import SignIn from "./modals/SignIn";
// import SignUp from "./modals/SignUp";
// import { useSelector, useDispatch } from 'react-redux'
// import { signOut } from './modals/SignInRedux'

// const Header = () => {

//     const navigate = useNavigate()

//     const [signInShow, setSignInShow] = useState(false);
//     const [signUpShow, setSignUpShow] = useState(false);

//     //리덕스 가지고 오기
//     const isUserSignIn = useSelector(state => state.completed.iscompleted)
//     //
//     const dispatch = useDispatch()

//     const logOut = () => {
//         dispatch(signOut())
//         alert("로그아웃 되었습니다.")
//     }

//     return (
//         <div style={{ background: 'orange', display: 'flex', alignItems: 'center' }}>
//             <h2 onClick={() => { navigate('/') }} style={{ marginRight: 'auto' }}>초록초록</h2>
//             <h7 onClick={() => { navigate('/shop') }}>쇼핑하기</h7>

//             {isUserSignIn ? //로그인 했으면 로그아웃 하게 해주기
//                 <>
//                     <Button variant="primary" onClick={() => navigate('/mypage')} style={{ margin: 3 }}>
//                         마이페이지
//                     </Button>
//                     <Button variant="primary" onClick={logOut}>로그아웃</Button>
//                 </>
//                 :      // 로그인, 회원가입 보여주지 말기
//                 <>

//                     <Button variant="primary" onClick={() => setSignInShow(true)} style={{ margin: 3 }}>
//                         로그인
//                     </Button>
//                     <Button variant="primary" onClick={() => setSignUpShow(true)} style={{ margin: 3 }}>
//                         회원가입
//                     </Button>
//                 </>
//             }

//             <SignIn
//                 show={signInShow}
//                 onHide={() => setSignInShow(false)}
//             />
//             <SignUp
//                 show={signUpShow}
//                 onHide={() => setSignUpShow(false)}
//             />
//         </div>
//     )
// }

// export default Header

import SignIn from "./user/SignIn";
import SignUp from "./user/SignUp";

import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <Link to="/">GREANGREAN</Link>
      <Link to="/shop">Shop</Link>
      <Link to="/faq">FAQ</Link>
      <Link to="/user/signin">로그인</Link>
      <Link to="/user/signup">회원가입</Link>
    </div>
  );
}

export default Header;
