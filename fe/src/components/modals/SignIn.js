import { Button, Modal, Form } from "react-bootstrap";
import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { signIn, signOut } from './SignInRedux'

const SignIn = (props) => {

    //user data 저장 state
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    //리덕스 가지고 오기
    const isUserSignIn = useSelector(state => state.completed.iscompleted)
    //dispatch -> redux 조작
    const dispatch = useDispatch()

    //입력시 user state에 저장
    const handleChangeState = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    //로그인 버튼 눌렀을때 할 동작 -> user state 서버 전달
    const clickLogIn = () => {
        //나중에 서버에 보내주기
        console.log(user)
        dispatch(signIn())
        props.onHide()
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    로그인
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            onChange={handleChangeState}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChangeState}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={clickLogIn}>로그인</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SignIn