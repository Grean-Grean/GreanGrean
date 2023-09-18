import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import React from "react";
import SignIn from "./modals/SignIn";
import SignUp from "./modals/SignUp";

const Header = () => {

    const navigate = useNavigate()

    const [signInShow, setSignInShow] = React.useState(false);
    const [signUpShow, setSignUpShow] = React.useState(false);


    return (
        <div style={{ background: 'orange', display: 'flex', alignItems: 'center' }}>
            <h2 onClick={() => { navigate('/') }} style={{ marginRight: 'auto' }}>초록초록</h2>
            <Button variant="primary" onClick={() => setSignInShow(true)} style={{ margin: 3 }}>
                로그인
            </Button>
            <Button variant="primary" onClick={() => setSignUpShow(true)} style={{ margin: 3 }}>
                회원가입
            </Button>

            <SignIn
                show={signInShow}
                onHide={() => setSignInShow(false)}
            />
            <SignUp
                show={signUpShow}
                onHide={() => setSignUpShow(false)}
            />
        </div>
    )
}

export default Header