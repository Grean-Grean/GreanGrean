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

import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.main_header}>
      <div>
        <a className={styles.header_logo} href="/">
          GREENGREEN
        </a>
      </div>

      <nav className={styles.header_nav}>
        <ul>
          <li>
            <a href="/shop">Shop</a>
          </li>
          <li>
            <a href="/faq">FAQ</a>
          </li>
          <li>
            <a href="/user/signin">로그인</a>
          </li>
          <li>
            <a href="/user/signup">회원가입</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
