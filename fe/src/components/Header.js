import styles from "./Header.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser, selectUser } from "../store/userSlice";
import { Link } from "react-router-dom"; // Link 추가

function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    alert("로그아웃 되었습니다.");
  };

  return (
    <header className={styles.main_header}>
      <div>
        <Link to="/" className={styles.header_logo}>
          GREENGREEN
        </Link>
      </div>

      <nav className={styles.header_nav}>
        <ul>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
          {user.isLoggedIn ? (
            <>
              <li>
                <Link to="/mypage/orders">마이페이지</Link>
              </li>
              <li>
                <a href="/" onClick={handleLogout}>
                  로그아웃
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/user/signin">로그인</Link>
              </li>
              <li>
                <Link to="/user/signup">회원가입</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
